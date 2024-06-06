import fs from "fs"
import Trie from "./trie-class.js";

let res;

console.time("reading json");
const jsonWords = fs.readFileSync("dict.json");
let allWords = JSON.parse(jsonWords).words;
console.timeEnd("reading json")

console.time("preparing tree")
const trie = new Trie(allWords);
console.timeEnd("preparing tree")

console.time("reading from tree");
res = trie.startsWithT9("6");
console.timeEnd("reading from tree")

console.time("reading from array")
const filtered1 = allWords.filter(word => word.startsWith("n") || word.startsWith("m") || word.startsWith("o"))
console.timeEnd("reading from array")

console.time("reading from tree");
res = trie.startsWithT9("66");
console.timeEnd("reading from tree")

console.time("reading from array")
const filtered2 = filtered1.filter(word => word.startsWith("g") || word.startsWith("h") || word.startsWith("i"))
console.timeEnd("reading from array")


console.time("reading from tree");
res = trie.startsWithT9("645");
console.timeEnd("reading from tree")

console.time("reading from array")
filtered2.filter(word => word.startsWith("j") || word.startsWith("k") || word.startsWith("l"))
console.timeEnd("reading from array")

