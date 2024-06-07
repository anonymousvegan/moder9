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
    "8": "backspace",
    "9": "tab",
    "13": "enter",
    "16": "shift",
    "17": "ctrl",
    "162": "ctrl_l",
    "163": "ctrl_r",
    "18": "alt",
    "19": "pause_break",
    "20": "caps_lock",
    "27": "escape",
    "33": "page_up",
    "34": "page_down",
    "35": "end",
    "36": "home",
    "37": "left_arrow",
    "38": "up_arrow",
    "39": "right_arrow",
    "40": "down_arrow",
    "45": "insert",
    "46": "delete",
    "32": "space",
    "48": "0",
    "49": "1",
    "50": "2",
    "51": "3",
    "52": "4",
    "53": "5",
    "54": "6",
    "55": "7",
    "56": "8",
    "57": "9",
    "65": "a",
    "66": "b",
    "67": "c",
    "68": "d",
    "69": "e",
    "70": "f",
    "71": "g",
    "72": "h",
    "73": "i",
    "74": "j",
    "75": "k",
    "76": "l",
    "77": "m",
    "78": "n",
    "79": "o",
    "80": "p",
    "81": "q",
    "82": "r",
    "83": "s",
    "84": "t",
    "85": "u",
    "86": "v",
    "87": "w",
    "88": "x",
    "89": "y",
    "90": "z",
    "91": "left_window_key",
    "92": "right_window_key",
    "93": "select_key",
    // numpad
    "96": "0",
    "97": "1",
    "98": "2",
    "99": "3",
    "100": "4",
    "101": "5",
    "102": "6",
    "103": "7",
    "104": "8",
    "105": "9",
    "106": "*",
    "107": "+",
    "109": "-",
    "111": "/",
    "110": "decimal_point",
    "112": "f1",
    "113": "f2",
    "114": "f3",
    "115": "f4",
    "116": "f5",
    "117": "f6",
    "118": "f7",
    "119": "f8",
    "120": "f9",
    "121": "f10",
    "122": "f11",
    "123": "f12",
    "144": "num_lock",
    "145": "scroll_lock",
    "186": "semi_colon",
    "187": "equal_sign",
    "188": "comma",
    "189": "dash",
    "190": "period",
    "191": "forward_slash",
    "192": "grave_accent",
    "219": "open_bracket",
    "220": "back_slash",
    "221": "close_braket",
    "222": "single_quote"
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

