import os
import base64
import json
import time
import subprocess
import google.generativeai as genai
import xml.etree.ElementTree as ET
import re
from typing import Dict, Any, Tuple, List
from dotenv import load_dotenv

# --- CONFIGURATION ---
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Use 1.5 Flash which is most stable for free-tier image analysis
model = genai.GenerativeModel('gemini-1.5-flash')

ADB_PATH = r"C:\adb-tools\platform-tools\adb.exe"
SCREENSHOT_PATH = "screen.png"
UIDUMP_PATH = "view.xml"

class UniversalAITester:
    def __init__(self, platform: str = "android"):
        self.platform = platform.lower()

    def get_ui_dump(self):
        subprocess.run([ADB_PATH, "shell", "uiautomator", "dump", "/sdcard/view.xml"], capture_output=True)
        subprocess.run([ADB_PATH, "pull", "/sdcard/view.xml", UIDUMP_PATH], capture_output=True)

    def find_element_by_text(self, target_text: str) -> Tuple[int, int]:
        self.get_ui_dump()
        if not os.path.exists(UIDUMP_PATH): return None
        try:
            tree = ET.parse(UIDUMP_PATH)
            for node in tree.getroot().iter('node'):
                if any(target_text.lower() in node.get(attr, '').lower() for attr in ['text', 'resource-id', 'content-desc']):
                    bounds = node.get('bounds')
                    if bounds:
                        match = re.search(r'\[(\d+),(\d+)\]\[(\d+),(\d+)\]', bounds)
                        if match:
                            x1, y1, x2, y2 = map(int, match.groups())
                            return (x1 + x2) // 2, (y1 + y2) // 2
        except: pass
        return None

    def capture_screenshot(self) -> str:
        subprocess.run([ADB_PATH, "shell", "screencap", "-p", "/sdcard/screen.png"], check=True)
        subprocess.run([ADB_PATH, "pull", "/sdcard/screen.png", SCREENSHOT_PATH], check=True)
        with open(SCREENSHOT_PATH, "rb") as img:
            return base64.b64encode(img.read()).decode('utf-8')

    def hide_keyboard_if_needed(self):
        kb_out = subprocess.run([ADB_PATH, "shell", "dumpsys", "input_method"], capture_output=True, text=True).stdout
        if "mInputShown=true" in kb_out:
            print("⌨️ Keyboard open. Sending 'Back' to hide...")
            subprocess.run([ADB_PATH, "shell", "input", "keyevent", "4"])
            time.sleep(1.5)

    def execute_single_action(self, action: Dict[str, Any]):
        atype = action.get("action")
        params = action.get("params", {})
        reason = action.get("reason","")
        
        # Correction logic
        search_term = ""
        if "username" in reason.lower() or "username" in str(params.get('text','')).lower(): search_term = "Username"
        elif "password" in reason.lower() or "password" in str(params.get('text','')).lower(): search_term = "Password"
        elif any(k in reason.lower() for k in ["sign in", "login"]): search_term = "SIGN IN"

        if search_term:
            precise = self.find_element_by_text(search_term)
            if precise: params['x'], params['y'] = precise

        print(f"  ➡️ {atype} at ({params.get('x')}, {params.get('y')}) | {reason}")
        
        if atype in ["click", "type"]:
            subprocess.run([ADB_PATH, "shell", "input", "tap", str(params['x']), str(params['y'])])
            time.sleep(1)
            if atype == "type":
                txt = str(params['text']).replace(" ", "%s")
                subprocess.run([ADB_PATH, "shell", "input", "text", txt])
                time.sleep(1)
                self.hide_keyboard_if_needed()

    def ask_ai_with_retry(self, goal: str, img_b64: str) -> List[Dict[str, Any]]:
        """Calls AI with a 3-minute retry window to bypass 429 errors."""
        prompt = f"Goal: {goal}. Return JSON LIST of steps to login: action, params {{x, y, text}}, reason."
        
        for attempt in range(3):
            try:
                print(f"🧠 AI planning... (Attempt {attempt+1}/3)")
                response = model.generate_content([prompt, {"mime_type": "image/png", "data": base64.b64decode(img_b64)}])
                return json.loads(response.text.strip().replace("```json", "").replace("```", ""))
            except Exception as e:
                if "429" in str(e):
                    print(f"⚠️ Quota exceeded. Waiting 60 seconds to retry...")
                    time.sleep(60)
                else:
                    print(f"❌ Error: {e}")
                    break
        return []

    def run(self, goal: str, apk: str = None):
        if apk: 
            print(f"📦 Fresh install of {apk}...")
            subprocess.run([ADB_PATH, "install", "-r", apk])
            time.sleep(5)
            
        print(f"🏁 Starting Goal: {goal}")
        img = self.capture_screenshot()
        sequence = self.ask_ai_with_retry(goal, img)
        
        if sequence:
            print(f"✅ Executing {len(sequence)} steps...")
            for action in sequence:
                self.execute_single_action(action)
                time.sleep(1)
            print("✨ DONE. Dashboard should be visible.")
        else:
            print("❌ AI failed to plan. Please wait 5 mins or check API Key.")

if __name__ == "__main__":
    subprocess.run([ADB_PATH, "start-server"])
    tester = UniversalAITester()
    goal = "Login with abinesh / Password1@ and find the dashboard."
    tester.run(goal, apk="ebook_new_payload.apk")
