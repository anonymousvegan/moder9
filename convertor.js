export function getKeyForChar(char){
    if(["a", "b", "c", "č", "ć"].includes(char.toLowerCase())) return "2";
    if(["d", "e", "f", "đ"].includes(char.toLowerCase())) return "3";
    if(["g", "h", "i"].includes(char.toLowerCase())) return "4";

    if(["j", "k", "l"].includes(char.toLowerCase())) return "5";
    if(["m", "n", "o"].includes(char.toLowerCase())) return "6";
    if(["p", "r", "s", "š"].includes(char.toLowerCase())) return "7";

    if(["t", "u", "v"].includes(char.toLowerCase())) return "8";
    if(["z", "ž"].includes(char.toLowerCase())) return "9";
}

export function getCharForKey(key) {
    const keyMap = {
        '2': ["a", "b", "c", "č", "ć"],
        '3': ["d", "e", "f", "đ"],
        '4': ["g", "h", "i"],
        '5': ["j", "k", "l"],
        '6': ["m", "n", "o"],
        '7': ["p", "r", "s", "š"],
        '8': ["t", "u", "v"],
        '9': ["z", "ž"]
    };

    return keyMap[key] || [];
}
