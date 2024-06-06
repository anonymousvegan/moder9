import fs from "fs"

class TrieNode {
    constructor() {
        this.children = {};
        this.endOfWord = false;
        this.value = [];
    }
}

function getKeyForChar(char){
    if(["a", "b", "c", "č", "ć"].includes(char.toLowerCase())) return "2";
    if(["d", "e", "f", "đ"].includes(char.toLowerCase())) return "3";
    if(["g", "h", "i"].includes(char.toLowerCase())) return "4";

    if(["j", "k", "l"].includes(char.toLowerCase())) return "5";
    if(["m", "n", "o"].includes(char.toLowerCase())) return "6";
    if(["p", "r", "s", "š"].includes(char.toLowerCase())) return "7";

    if(["t", "u", "v"].includes(char.toLowerCase())) return "8";
    if(["z", "ž"].includes(char.toLowerCase())) return "9";
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;

        for (let char of word) {

            let key = getKeyForChar(char);

            if (!current.children[key]) {
                current.children[key] = new TrieNode();
            }
            current = current.children[key];
        }
        current.endOfWord = true;

        const exists = current.value.find(wordObj =>  wordObj.wordString == word)

        if(exists) exists.wordWeight++;
        else current.value.push({wordString: word, wordWeight: 1})

        current.value;
    }

    searchNormal(word) {
        let current = this.root;
        for (let char of word) {

            let key = getKeyForChar(char);

            if (!current.children[key]) {
                return [false, null];
            }
            current = current.children[key];
        }
        return [current.endOfWord, current.value]
    }

    searchT9(keys) {
        let current = this.root;
        for (let key of keys) {

            if (!current.children[key]) {
                return [false, null];
            }
            current = current.children[key];
        }
        return [current.endOfWord, current.value]
    }

    startsWithNormal(prefix) {
        let current = this.root;
        for (let char of prefix) {

            let key = getKeyForChar(char);

            if (!current.children[key]) {
                return [];
            }
            current = current.children[key];
        }

        let arr =  this.getAllWordsForNode(current)

        return arr.filter(word => word.startsWith(prefix))
    }

    getAllWordsForNode(node, arr = []) {
        for (const value of node.value) {
            arr.push(value);
        }

        arr.push(...node.value)

        for (let key in node.children) {
            this.getAllWordsForNode(node.children[key], arr);
        }

        return arr;
    }


    startsWithT9(keys) {
        let current = this.root;

        for (let key of keys) {

            if (!current.children[key]) {
                return [];
            }
            current = current.children[key];
        }

        return this.getAllWordsForNode(current)
    }

}

console.time("preparing")

const trie = new Trie();
const jsonWords = fs.readFileSync("dict.json");
let allWords = JSON.parse(jsonWords).words;

allWords.forEach(word => trie.insert(word.toLowerCase()))

console.timeEnd("preparing")

console.time("reading from tree");
trie.startsWithT9("6").length;
console.timeEnd("reading from tree")

console.time("reading from array")
const filtered1 = allWords.filter(word => word.startsWith("n") || word.startsWith("m") || word.startsWith("o"))
console.timeEnd("reading from array")


console.time("reading from tree");
trie.startsWithT9("64").length;
console.timeEnd("reading from tree")

console.time("reading from array")
const filtered2 = filtered1.filter(word => word.startsWith("g") || word.startsWith("h") || word.startsWith("i"))
console.timeEnd("reading from array")


console.time("reading from tree");
trie.startsWithT9("645").length;
console.timeEnd("reading from tree")

console.time("reading from array")
filtered2.filter(word => word.startsWith("j") || word.startsWith("k") || word.startsWith("l"))
console.timeEnd("reading from array")

