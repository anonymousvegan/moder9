export const keyMap = {
    "1": " ",
    '2': ["a", "b", "c", "č", "ć"],
    '3': ["d", "e", "f", "đ"],
    '4': ["g", "h", "i"],
    '5': ["j", "k", "l"],
    '6': ["m", "n", "o"],
    '7': ["p", "r", "s", "š"],
    '8': ["t", "u", "v"],
    '9': ["z", "ž"]
};

export const charToKeyMap = {
    " ": "1",
    'a': '2', 'b': '2', 'c': '2', 'č': '2', 'ć': '2',
    'd': '3', 'e': '3', 'f': '3', 'đ': '3',
    'g': '4', 'h': '4', 'i': '4',
    'j': '5', 'k': '5', 'l': '5',
    'm': '6', 'n': '6', 'o': '6',
    'p': '7', 'r': '7', 's': '7', 'š': '7',
    't': '8', 'u': '8', 'v': '8',
    'z': '9', 'ž': '9'
};

export const keyCodeMap = {
    "<103>": "7",
    "<104>": "8",
    "<105>": "9",
    "<100>": "4",
    "<101>": "5",
    "<65437>": "5",
    "<102>": "6",
    "<97>": "1",
    "<98>": "2",
    "<99>": "3"
};

export const phoneLayout = {
    "1": "7", "2": "8", "3": "9",
    "4": "4", "5": "5", "6": "6",
    "7": "1", "8": "2", "9": "3"
};

export function convertKeyToPhoneLayout(key) {
    return phoneLayout[key] || key;
}

export function getKeyForChar(char){
    return charToKeyMap[char.toLowerCase()] || null;
}

export function getCharForKey(key) {
    return keyMap[key] || [];
}

export function convertKeyCodeToKey(key) {
    return keyCodeMap[key] || key;
}

