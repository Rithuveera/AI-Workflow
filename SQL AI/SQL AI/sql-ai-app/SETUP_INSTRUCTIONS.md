# SQL AI Assistant - Setup

## 1. Configure API Key
The application requires a Google Gemini API Key.
1. Create a new file named `.env.local` in this folder (`sql-ai-app`).
2. Add the following line to it:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   (Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey))

## 2. Run the App
1. Open a terminal in this folder.
2. Run:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
