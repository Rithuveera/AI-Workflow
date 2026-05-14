
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    console.log("Checking available Gemini models...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is not set.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // There isn't a direct "listModels" method on the high-level genAI object in some versions,
    // but we can try to access the model manager if available, or just test common models.

    // Actually, checking the SDK docs, typically we don't list models from the client often.
    // However, we can TRY to generate with a few known models and see which one does NOT throw 404.

    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-8b",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    console.log("Testing generation with candidate models:");

    for (const modelName of candidates) {
        process.stdout.write(`Testing ${modelName}: `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test.");
            const response = await result.response;
            console.log("PASS ✅");
        } catch (error) {
            if (error.message.includes("404") || error.message.includes("not found")) {
                console.log("FAIL (404 Not Found) ❌");
            } else {
                console.log(`FAIL (${error.message}) ❌`);
            }
        }
    }
}

listModels();
