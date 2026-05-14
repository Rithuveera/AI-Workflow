const fs = require('fs');
const path = require('path');

function getApiKey() {
    try {
        const envPath = path.join(__dirname, '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            for (const line of content.split('\n')) {
                if (line.trim().startsWith('GEMINI_API_KEY=')) {
                    return line.split('=')[1].trim();
                }
            }
        }
    } catch (e) {
        console.error("Could not read .env.local", e);
    }
    return process.env.GEMINI_API_KEY;
}

const apiKey = getApiKey();

async function listModels() {
    try {
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY not found in .env.local or process.env");
        }
        console.log("Attempting to list models using API key...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => {
                // Check if it supports generateContent
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found. Response:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
