const config = {
    phoneLayout: JSON.parse(process.env["PHONE_LAYOUT"]),
    pasteInsteadOfTyping : JSON.parse(process.env["PASTE_INSTEAD_OF_TYPING"]),
    useExistingJSON : JSON.parse(process.env["USE_EXISTING_JSON"]),
    logs : JSON.parse(process.env["LOGS"]),
    disableDict : JSON.parse(process.env["DISABLE_DICT"]),
    repeatingDelay : JSON.parse(process.env["REPEATING_DELAY"]),
}

export default config;
