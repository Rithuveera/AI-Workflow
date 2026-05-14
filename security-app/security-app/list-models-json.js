const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyAtCtSmnxMGKS4UmWWOz40aVfRa2L_cd2w";

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        require('fs').writeFileSync('models.json', JSON.stringify(data, null, 2));
    } catch (error) {
        require('fs').writeFileSync('models.json', JSON.stringify({ error: error.message }));
    }
}

listModels();
