import { getKeyForChar } from "./convertor";

class TrieNode {
    constructor() {
        this.children = {};
        this.value = [];
        this.cached = [];
    }
}

export default class Trie {
    constructor(words) {
        this.root = new TrieNode();
        words = words.map(w => w.toLowerCase());
        const wordMap = new Map();

        words.forEach(word => {
            wordMap.set(word, (wordMap.get(word) || 0) + 1);
        });

        this.allWords = Array.from(wordMap, ([word, weight]) => ({ wordString: word, wordWeight: weight }));
        this.allWords.forEach(word => this.insert(word))

        this.cache();

    }

    insert(word) {
        let current = this.root;

        for (let char of word.wordString) {

            let key = getKeyForChar(char);

            if (!current.children[key]) {
                current.children[key] = new TrieNode();
            }
            current = current.children[key];
        }

        current.value.push(word)
    }

    getNode(keys) {
        let current = this.root;
        for (let key of keys) {

            if (!current.children[key]) {
                return null;
            }
            current = current.children[key];
        }
        return current
    }

    getNodeFromAlpha(word){
        return this.getNode(word.split("").map(letter => getKeyForChar(letter)).join())
    }

    startsWithAlpha(prefix) {
        return this.startsWithT9(prefix.split("").map(letter => getKeyForChar(letter)).join())
    }

    getAllWordsForNode(node, arr = []) {

        arr.push(...node.value)

        for (let key in node.children) {
            this.getAllWordsForNode(node.children[key], arr);
        }

        return arr;
    }

    startsWithT9(keys, enableCache = true) {
        const node = this.getNode(keys);

        if(enableCache && keys.length <= 2) {
            return node.cached;
        };

        return this.getAllWordsForNode(node);
    }

    cacheSingleNode(keys){

        if(keys.length > 2) return;

        let node = this.getNode(keys)
        let wordsStartingWith = this.startsWithT9(keys, false);

        const filtered = wordsStartingWith.filter(word => word.wordString.length === keys.length)
        const other = wordsStartingWith.filter(word => word.wordString.length !== keys.length)

        filtered.sort((a, b) => b.wordWeight - a.wordWeight);
        other.sort((a, b) => b.wordWeight - a.wordWeight);

        const all = [...filtered, ...other].slice(0, 20);

        node.cached = all;
    }

    cache(){

        this.root.cached = this.allWords;

        for(let i = 2; i <=9; i++){

            this.cacheSingleNode("" + i)

            for(let j = 2; j <=9; j++){
                this.cacheSingleNode(""+ i + j)
            }
        }
    }

}
