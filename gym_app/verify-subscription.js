import axios from 'axios';

const RENDER_URL = 'https://fit2fit-gym-api.onrender.com';
const EMAIL = 'veeramanibatharvellai@gmail.com';

console.log('🔍 Checking Subscription Status...\n');
console.log(`Email: ${EMAIL}\n`);

async function checkStatus() {
    const classes = ['HIIT', 'Yoga', 'Strength'];

    for (const classType of classes) {
        try {
            const response = await axios.get(
                `${RENDER_URL}/api/reminder-status/${EMAIL}/${classType}`
            );

            if (response.data.data.subscribed) {
                console.log(`✅ ${classType} - SUBSCRIBED`);
                const sub = response.data.data.subscription;
                console.log(`   Phone: ${sub.phone_number}`);
                console.log(`   WhatsApp: ${sub.whatsapp_enabled ? 'Enabled' : 'Disabled'}`);
            } else {
                console.log(`❌ ${classType} - NOT SUBSCRIBED`);
            }
        } catch (error) {
            console.log(`❌ ${classType} - ERROR checking status`);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🧪 Testing WhatsApp Reminder for HIIT...\n');

    try {
        const testResponse = await axios.post(`${RENDER_URL}/api/test-meal-reminder`, {
            email: EMAIL,
            class_type: 'HIIT'
        });

        console.log('✅ TEST SUCCESS!');
        console.log('Response:', JSON.stringify(testResponse.data, null, 2));

        if (testResponse.data.data.whatsapp_sent) {
            console.log('\n📱 WhatsApp test message sent! Check your phone!');
        } else {
            console.log('\n❌ WhatsApp not sent');
            if (testResponse.data.data.whatsapp_error) {
                console.log('Error:', testResponse.data.data.whatsapp_error);
            }
        }
    } catch (error) {
        console.log('❌ TEST FAILED');
        if (error.response) {
            console.log('Error:', error.response.data);
        }
    }
}

checkStatus();
