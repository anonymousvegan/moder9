import {spawn} from "child_process"
import fs from "fs"
import os from "os"
import config from "./config";
import { keyMap, convertKeyCodeToKey, convertKeyToPhoneLayout } from "./convertor";
import { configDotenv } from "dotenv";
import Trie from "./trie-class"

configDotenv();

const pythonProgramName = process.platform === "win32" ? "C:\\Python311\\python.exe" : "python3";

let trie;

let timeout = null;
let currentLetter = "";
let currentKey = "";

let allWords = []
let history = []
let availableWords = [];

let ctrlPressed = false;
let pasteInProgress = false;
let currentLetterIndex = 0;
let currentLetterLength = 0;

function handleErrorAndClose(process){
    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {

        // Do not log if everything is OK
        if(code == 0) return

        log(`Child process exited with code ${code}`);
    });
}

function handleKeylogger(data){

    if(pasteInProgress) return;

    data = data.toString();

    if(!data) return;

    try{

        const events = data.split(os.EOL)
        const filteredEvents  = events.filter(e  => e.length !== 0)

        filteredEvents.forEach(event => {

            const [eventName, keycode ] = JSON.parse(event);
            const key = convertKeyCodeToKey(keycode);

            if(key === "unknown") return;

            if(eventName === "press") handleKeyPress(key);
            if(eventName === "release") handleKeyRelease(key);
        })
    }
    catch(e){
        console.error("Problem with json", e);
        fs.writeFileSync("error.txt", data)
    }
}

function convertKey(key){
    if(key.length !== 1) key = convertKeyCodeToKey(key);
    if(config.phoneLayout) key = convertKeyToPhoneLayout(key)

    return key;
}

function handleKeyPress(key){
    key = convertKey(key);

    if(key.includes("ctrl")) {
        ctrlPressed = true;
        return;
    }

    if(config.disableDict){
        typeKey(key)
    }
    else{
        checkDict(key)
    }

}

async function typeKey(key){

    if(!"123456789".includes(key)){
        return
    }

    // When user press new key it is signal to paste old letter
    if(currentKey !== key && currentLetter) {
        if(timeout) clearTimeout(timeout)

        await sendPasteSignal(currentLetter, currentLetterLength + 1),
        await sendPasteSignal(key, 1, true),

        currentLetterIndex = 0;
        currentLetterLength = 0;
    }

    currentKey = key;
    currentLetter = keyMap[currentKey][currentLetterIndex];

    if(timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
        sendPasteSignal(currentLetter, currentLetterLength);
        currentLetterIndex = 0;
        currentLetterLength = 0
        currentKey = "";
        currentLetter = ""
    }, config.repeatingDelay);

    currentLetterIndex = (currentLetterIndex + 1) % keyMap[currentKey].length;
    currentLetterLength++;

}

function checkDict(key){

    if(key.includes("backspace")){

        if(ctrlPressed) return restart()

        history.pop()
        checkWords(history.join(""));
        return;

    }

    if(key.includes("space")){
        return restart()
    }

    const index = ["1", "/", "*", "-", "+"].findIndex(k => k === key);
    if(index !== -1) return sendPasteSignal(availableWords[index].wordString + " ", history.length + 1);

    if("23456789".includes(key)){
        history.push(key)
    }

    checkWords(history.join(""))

}

function sendPasteSignal(word, length, skipDeleting = false){
    return new Promise(res => {

        if(length === 0){
            length = keyMap[currentKey].length;
        }

        if(!length) length = word.length;


        pasteInProgress = true;
        const pasteProcess = spawn(pythonProgramName, ["paste.py", word, config.pasteInsteadOfTyping, length, skipDeleting]);

        handleErrorAndClose(pasteProcess)

        pasteProcess.stdout.on("data", (data) => {
            data = data.toString();
            if(data.includes("pasted")) pasteInProgress = false;
            res();
        });

        restart();
    })
}

function handleKeyRelease(key){
    key = convertKey(key);
    if(key.includes("ctrl")) ctrlPressed = false
}


async function waitForJSONFile(wordsJsonProcess){
    await new Promise((res,rej) => {
        wordsJsonProcess.stdout.on("data", (data) => {
            data = data.toString();
            if(data.includes("ready")) res();
            else rej()
        })
    })
}

function restart(){
    availableWords = []
    history = [];
    pasteInProgress = false;
    currentLetterIndex = 0;
    currentLetterLength = 0;
    currentLetter = "";
    currentKey = "";
    timeout = null;
}

function checkWords(keys){
    availableWords = trie.startsWithT9(keys).slice(0, 5);
    console.log(availableWords.map(w => w.wordString));
}

function log(...args){
    if(config.logs) {
        console.log(...args)
    }
}

async function prepareDictResources(){

    if(!config.useExistingJSON){
        const wordsJsonProcess = spawn(pythonProgramName, ["createDict.py"]);
        handleErrorAndClose(wordsJsonProcess)

        try{
            await waitForJSONFile(wordsJsonProcess);
            log("DICT IS CREATED");
        }
        catch(error){
            log("error loading JSON file", error);
            throw error;
        }
    }

    log("READING DICT");

    const jsonWords = fs.readFileSync("dict.json");
    allWords = JSON.parse(jsonWords).words;

    trie = new Trie(allWords)
}

async function main(){

    log("HELLO! PREPARING RESOURCES");

    if(!config.disableDict){
        await prepareDictResources();
    }

    else{
        log("NOT USING DICT")
    }

    log("STARTING KEYLOGGER");

    const keyloggerProcess = spawn(pythonProgramName, ['keylogger.py']);
    handleErrorAndClose(keyloggerProcess);
    keyloggerProcess.stdout.on('data', handleKeylogger);

    log("KEYLOGGER STARTED");
    // Show first time top used words
    !config.disableDict && checkWords("")
}

main()
