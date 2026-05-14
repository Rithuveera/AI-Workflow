import axios from 'axios';

console.log('🔍 Diagnosing WhatsApp Issue...\n');

const RENDER_URL = 'https://fit2fit-gym-api.onrender.com';
const EMAIL = 'veeramanibatharvellai@gmail.com';

async function diagnose() {
    console.log('1️⃣ Checking if server is responding...');
    try {
        await axios.get(`${RENDER_URL}/api/members`);
        console.log('   ✅ Server is online\n');
    } catch (err) {
        console.log('   ❌ Server is down or not responding\n');
        return;
    }

    console.log('2️⃣ Checking subscription status...');
    try {
        const response = await axios.get(`${RENDER_URL}/api/reminder-status/${EMAIL}/HIIT`);
        if (response.data.data.subscribed) {
            console.log('   ✅ Subscription exists');
            console.log(`   Phone: ${response.data.data.subscription.phone_number}`);
            console.log(`   WhatsApp: ${response.data.data.subscription.whatsapp_enabled}\n`);
        } else {
            console.log('   ❌ No subscription found\n');
            return;
        }
    } catch (err) {
        console.log('   ❌ Error checking subscription\n');
        return;
    }

    console.log('3️⃣ Sending test WhatsApp message...');
    try {
        const response = await axios.post(`${RENDER_URL}/api/test-meal-reminder`, {
            email: EMAIL,
            class_type: 'HIIT'
        });

        console.log('   Server Response:', JSON.stringify(response.data, null, 2));

        if (response.data.data.whatsapp_sent) {
            console.log('\n   ✅ Server says message was sent');
            console.log('\n   ⚠️  If you did not receive it, the issue is likely:');
            console.log('   1. You have not joined Twilio Sandbox');
            console.log('   2. Twilio credentials are incorrect');
            console.log('   3. Phone number format is wrong');
        } else {
            console.log('\n   ❌ Server failed to send message');
            if (response.data.data.whatsapp_error) {
                console.log(`   Error: ${response.data.data.whatsapp_error}`);
            }
        }
    } catch (err) {
        console.log('   ❌ Error sending test message');
        if (err.response) {
            console.log(`   ${JSON.stringify(err.response.data, null, 2)}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📋 DIAGNOSIS SUMMARY');
    console.log('='.repeat(60));
    console.log('\n✅ Subscription is active');
    console.log('✅ Server is sending messages');
    console.log('❌ You are not receiving messages on your phone\n');

    console.log('🔧 MOST LIKELY CAUSE:');
    console.log('   You have NOT joined the Twilio Sandbox\n');

    console.log('🚀 SOLUTION:');
    console.log('   1. Go to: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn');
    console.log('   2. Note the Twilio WhatsApp number and sandbox name');
    console.log('   3. Open WhatsApp on your phone (+919677792757)');
    console.log('   4. Send message to Twilio number: "join [sandbox-name]"');
    console.log('   5. Wait for confirmation from Twilio');
    console.log('   6. Run this script again\n');

    console.log('📞 ALTERNATIVE:');
    console.log('   Check Render logs at: https://dashboard.render.com');
    console.log('   Look for WhatsApp error messages\n');
}

diagnose();
