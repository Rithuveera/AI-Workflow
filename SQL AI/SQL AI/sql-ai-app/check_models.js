const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI("AIzaSyAAGWeMEc8SZ0RBoisTfdlbTylZ9n5xPJo");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // We just want to check availability, but the SDK doesn't have a simple list method exposed easily in all versions.
        // Actually, the SDK *does* have it on the client.

        // Let's try to access the models list via REST if SDK fails, but SDK is installed.
        // The node SDK usually doesn't expose ListModels directly on the main class in older versions, 
        // but let's try the direct inference first.

        // Actually, the error message literally said "Call ListModels".
        // I'll try a different approach: Using a very standard model that usually works.
        // But to be sure, I will try to fetch a widely available valid one.

        // Let's assume the user might have a specific constraint. 
        // I will try 'gemini-1.0-pro' which is the older stable name.

        console.log("Checking models...");
    } catch (e) {
        console.error(e);
    }
}

// Since I cannot interactively run "ListModels" easily without looking up specific SDK syntax for listing (which is rare),
// I will try to use the REST API via curl to see what IS available.
// This is more reliable than guessing SDK method signatures.
