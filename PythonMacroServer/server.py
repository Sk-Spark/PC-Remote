from flask import Flask, request, jsonify, send_from_directory
import pyautogui
import keyboard
import os
from time import sleep

app = Flask(__name__)

# Disable the failsafe feature of pyautogui
pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0.5

def trun_off_numlock():
    # Check if Num Lock is on
    num_lock_state = keyboard.is_pressed('num lock')
    if not num_lock_state:
        print('Num Lock is already off')
    else:
        print('Num Lock is on. Turning it off...')
        keyboard.press_and_release('num lock')
        sleep(0.5)


@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory(os.path.dirname(os.path.realpath(__file__)), 'index.html')


@app.route('/press-key', methods=['GET', 'POST'])
def press_key():
    try:
        if request.method == 'GET':
            # Check if the 'macro' query parameter is provided in the GET request
            macro = request.args.get('macro')
            if macro:
                pyautogui.press(macro)
                return jsonify({"status": "success", "message": f"Key '{macro}' pressed successfully"})
            else:
                return jsonify({"status": "error", "message": "Invalid or missing 'macro' query parameter"})
        elif request.method == 'POST':
            data = request.json
            key_to_press = data.get('macro')

            if key_to_press:
                pyautogui.press(key_to_press)
                return jsonify({"status": "success", "message": f"Key '{key_to_press}' pressed successfully"})
            else:
                return jsonify({"status": "error", "message": "Invalid or missing 'key' in the request"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/macro', methods=['POST'])
def macroHandler():
    try:        
        if request.method == 'POST':
            data = request.json
            macro = data.get('macro')
            print("data", data)
            if macro == 1:
                macro1()
                return jsonify({"status": "success", "message": f"Key '{macro}' pressed successfully"})
            else:
                return jsonify({"status": "error", "message": "Invalid or missing 'key' in the request"})
            
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    
def macro1():
    # goto end of the like press shift + home and then press release home and press up arrow 4 times
    # release shift and press F5 key
    trun_off_numlock()
    pyautogui.press('end')
    pyautogui.keyDown('shift')
    pyautogui.press('home')
    pyautogui.press('up', presses=4, interval=0.1)
    pyautogui.keyUp('shift')
    pyautogui.press('f5')
    print('macro1')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)
