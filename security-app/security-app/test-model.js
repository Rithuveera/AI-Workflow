const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyAtCtSmnxMGKS4UmWWOz40aVfRa2L_cd2w";
const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
    console.log(`Testing model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello!");
        const response = await result.response;
        console.log(`Success! Response: ${response.text()}`);
        return true;
    } catch (error) {
        console.error(`Failed with ${modelName}:`, error.message);
        return false;
    }
}

async function main() {
    // Try a few likely candidates in order or preference
    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    for (const m of candidates) {
        if (await testModel(m)) {
            console.log(`\n>>> FOUND WORKING MODEL: ${m} <<<`);
            break;
        }
    }
}

main();
