from pynput.keyboard import Key, Listener, KeyCode
import json

special_key_map = {
    Key.alt: 18,       # VK_MENU
    Key.alt_l: 164,    # VK_LMENU
    Key.alt_r: 165,    # VK_RMENU
    Key.ctrl: 17,      # VK_CONTROL
    Key.ctrl_l: 162,   # VK_LCONTROL
    Key.ctrl_r: 163,   # VK_RCONTROL
    Key.shift: 16,     # VK_SHIFT
    Key.shift_l: 160,  # VK_LSHIFT
    Key.shift_r: 161,  # VK_RSHIFT
    Key.cmd: 91,       # VK_LWIN Windows Key (Left)
    Key.cmd_r: 92,     # VK_RWIN Windows Key (Right)
    Key.enter: 13,     # VK_RETURN
    Key.esc: 27,       # VK_ESCAPE
    Key.f1: 112,       # VK_F1
    Key.f2: 113,       # VK_F2
    Key.f3: 114,       # VK_F3
    Key.f4: 115,       # VK_F4
    Key.f5: 116,       # VK_F5
    Key.f6: 117,       # VK_F6
    Key.f7: 118,       # VK_F7
    Key.f8: 119,       # VK_F8
    Key.f9: 120,       # VK_F9
    Key.f10: 121,      # VK_F10
    Key.f11: 122,      # VK_F11
    Key.f12: 123,      # VK_F12
    Key.f13: 124,      # VK_F13
    Key.f14: 125,      # VK_F14
    Key.f15: 126,      # VK_F15
    Key.f16: 127,      # VK_F16
    Key.f17: 128,      # VK_F17
    Key.f18: 129,      # VK_F18
    Key.f19: 130,      # VK_F19
    Key.f20: 131,      # VK_F20
    Key.f21: 132,      # VK_F21
    Key.f22: 133,      # VK_F22
    Key.f23: 134,      # VK_F23
    Key.f24: 135,      # VK_F24
    Key.left: 37,   # VK_LEFT Arrow key
    Key.right: 39,  # VK_RIGHT Arrow key
    Key.up: 38,     # VK_UP Arrow key
    Key.down: 40,   # VK_DOWN Arrow key
    Key.page_up: 33, # VK_PRIOR (Page Up)
    Key.page_down: 34, # VK_NEXT (Page Down)
    Key.end: 35,     # VK_END
    Key.home: 36,    # VK_HOME
    Key.num_lock: 144,      # VK_NUMLOCK
    Key.delete: 46,         # VK_DELETE
    Key.backspace: 8,       # VK_BACKSPACE
    Key.print_screen: 44,
    Key.tab: 9,            # VK_TAB
    Key.caps_lock: 20,     # VK_CAPITAL
    Key.space: 32,         # VK_SPACE
    Key.insert: 45,  # VK_INSERT
}

def on_press(key):
    if isinstance(key, Key):
        key_code = special_key_map.get(key, 'Unknown')
    elif isinstance(key, KeyCode):
        key_code = key.vk if key.vk is not None else 'Unknown'
    else:
        key_code = 'Unknown2'
    print(json.dumps(["press", str(key_code)]), flush=True)

def on_release(key):
    if isinstance(key, Key):
        key_code = special_key_map.get(key, 'Unknown')
    elif isinstance(key, KeyCode):
        key_code = key.vk if key.vk is not None else 'Unknown'
    else:
        key_code = 'Unknown'
    print(json.dumps(["release", str(key_code)]), flush=True)

with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()
