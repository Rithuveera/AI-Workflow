# Mobile Testing Onboarding Guide (No Physical Device)

To start testing with the AI Agent, you MUST have a **Virtual Phone** running on your computer.

---

## 🟢 Step 1: Install a Virtual Android Device (Emulator)

Since we are not using physical phones, we need a virtual one. I recommend **LDPlayer** as it is lightweight and easy for testing.

1.  **Download & Install LDPlayer**: [https://www.ldplayer.net/](https://www.ldplayer.net/)
2.  **Turn it ON**: Launch the emulator on your computer.
3.  **Enable ADB (The Bridge)**:
    *   Open **Settings** inside the virtual phone (LDPlayer).
    *   Go to **Developer Options** (If not seen, go to About Phone and click 'Build Number' 7 times).
    *   Enable **USB Debugging**.

> [!IMPORTANT]
> Keep the virtual phone "ON" and "VISIBLE" on your computer screen while the AI tests it.

---

## 🟡 Step 2: Verify the Connection (ADB)

Before running the AI, check if your computer sees the virtual phone:

1.  Open your **PowerShell**.
2.  Run this command:
    ```powershell
    C:\adb-tools\platform-tools\adb.exe devices
    ```
    *If it shows a device (e.g., `emulator-5554  device`), you are ready!*

---

## 🟠 Step 3: Run the AI Tester

Move your APK (`ebook_new_payload.apk`) into the project folder, then run:

```powershell
cd "c:\Users\veeramani\.gemini\antigravity\scratch\Mobile App"
python ai_universal_tester.py
```

### 🏁 Final Checklist:
1.  [ ] **LDPlayer (Virtual Phone)** is ON.
2.  [ ] **`adb devices`** shows one device.
3.  [ ] **`ebook_new_payload.apk`** is in the folder.
