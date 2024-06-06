class TrieNode {
    constructor() {
        this.children = {};
        this.valuesStartingWith = [];
    }
}



export default class Trie {
    constructor() {
        this.root = new TrieNode();
    }


    static getKeyForChar(char){
        if(["a", "b", "c", "č", "ć"].includes(char)) return "2";
        if(["d", "e", "f", "đ"].includes(char)) return "3";
        if(["g", "h", "i"].includes(char)) return "4";

        if(["j", "k", "l"].includes(char)) return "5";
        if(["m", "n", "o"].includes(char)) return "6";
        if(["p", "r", "s", "š"].includes(char)) return "7";

        if(["t", "u", "v"].includes(char)) return "8";
        if(["z", "ž"].includes(char)) return "9";
    }

    insertInValuesStartingWith(node, word){
        const exists = node.valuesStartingWith.find(wordObj => wordObj.wordString === word);

        if(exists){
            exists.wordWeight ++;
        }
        else{
            node.valuesStartingWith.push({wordString: word, wordWeight: 1})
        }
    }

    insert(word) {
        let current = this.root;

        this.insertInValuesStartingWith(current, word);

        for (let char of word) {

            let key = Trie.getKeyForChar(char);

            if (!current.children[key]) {
                current.children[key] = new TrieNode();
            }

            current = current.children[key];
            this.insertInValuesStartingWith(current, word)

        }

    }

    searchNormal(word) {
        let current = this.root;
        for (let char of word) {

            let key = Trie.getKeyForChar(char);

            if (!current.children[key]) {
                return [false, null];
            }
            current = current.children[key];
        }
        return current.valuesStartingWith
    }

    searchT9(keys) {
        let current = this.root;
        for (let key of keys) {

            if (!current.children[key]) {
                return [false, null];
            }
            current = current.children[key];
        }
        return current.valuesStartingWith
    }

    startsWithNormal(prefix) {
        let current = this.root;
        for (let char of prefix) {

            let key = Trie.getKeyForChar(char);

            if (!current.children[key]) {
                return [];
            }
            current = current.children[key];
        }

        return current.valuesStartingWith.filter(wordObj => wordObj.wordString.startsWith(prefix));
    }

    startsWithT9(keys) {

        let current = this.root;

        for (let key of keys) {

            if (!current.children[key]) {
                return [];
            }
            current = current.children[key];
        }

        return current.valuesStartingWith;
    }

}
