import axios from 'axios';

const RENDER_URL = 'https://fit2fit-gym-api.onrender.com';

// Replace these with your actual details
const TEST_CONFIG = {
    email: 'veeramanibalthavellai@gmail.com',  // Your email
    class_type: 'HIIT'  // Or 'Yoga' or 'Strength'
};

console.log('🧪 Testing WhatsApp Reminder...\n');
console.log(`Email: ${TEST_CONFIG.email}`);
console.log(`Class: ${TEST_CONFIG.class_type}\n`);

async function testNow() {
    try {
        console.log('📤 Sending test request to server...\n');

        const response = await axios.post(`${RENDER_URL}/api/test-meal-reminder`, {
            email: TEST_CONFIG.email,
            class_type: TEST_CONFIG.class_type
        });

        console.log('✅ SUCCESS!\n');
        console.log('Response:', JSON.stringify(response.data, null, 2));

        if (response.data.data.whatsapp_sent) {
            console.log('\n📱 WhatsApp reminder sent! Check your phone now!');
        } else {
            console.log('\n❌ WhatsApp not sent');
            if (response.data.data.whatsapp_error) {
                console.log('Error:', response.data.data.whatsapp_error);
            }
        }

        if (response.data.data.email_disabled) {
            console.log('📧 Email reminders are disabled (as requested)');
        }

    } catch (error) {
        console.log('❌ ERROR!\n');

        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', JSON.stringify(error.response.data, null, 2));

            if (error.response.status === 404) {
                console.log('\n💡 No active subscription found!');
                console.log('   Go to: https://fit2fit-gym-api.onrender.com');
                console.log('   Subscribe to meal reminders with WhatsApp enabled');
            }
        } else {
            console.log('Error:', error.message);
        }
    }
}

testNow();
