const url = "https://uat-accomodation.campnueron.com/";

async function testUrl() {
    console.log(`Testing connectivity to: ${url}`);
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });
        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log(`Body length: ${text.length} characters`);
        console.log(`First 100 chars: ${text.substring(0, 100)}`);
    } catch (error) {
        console.error("Fetch failed!");
        console.error("Message:", error.message);
        if (error.cause) console.error("Cause:", error.cause);
    }
}

testUrl();
