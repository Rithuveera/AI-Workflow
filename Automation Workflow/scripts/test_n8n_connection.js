const axios = require('axios');

/**
 * TEST SCRIPT
 * This script sends a "Fake" failure to your n8n workflow
 * so you can verify that the AI, Google Chat, and Gmail are all working.
 */
const WEBHOOK_URL = 'http://localhost:5678/webhook-test/playwright-failure';

const dummyFailure = {
    product: 'ERP',
    filename: 'Login_Test_Simulated.spec.js',
    testTitle: 'Simulated Authentication Failure',
    error: 'Error: page.goto: Navigation timeout of 30000ms exceeded.\n\nActual error: Timed out waiting for selector "text=Dashboard" to appear in DOM.',
    // We leave screenshotPath empty to test the "Has Screenshot?" logic
    screenshotPath: '',
    duration: '3500ms'
};

async function sendTest() {
    console.log('📤 Sending SIMULATED failure to n8n...');
    try {
        const response = await axios.post(WEBHOOK_URL, dummyFailure);
        console.log('✅ Success! n8n received the data.');
        console.log('Check your n8n screen, Google Chat, and Gmail!');
    } catch (error) {
        console.error('❌ Error connecting to n8n:', error.message);
        console.log('Make sure n8n is running and you clicked "Execute Workflow"!');
    }
}

sendTest();
