import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const RENDER_URL = 'https://fit2fit-gym-api.onrender.com';

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function testReminders() {
    console.log('🧪 Meal Reminder Test Tool\n');
    console.log('This will test if your meal reminders are working.\n');

    const email = await question('Enter your email: ');
    const classType = await question('Enter class type (HIIT/Yoga/Strength): ');

    console.log('\n📤 Sending test reminder...\n');

    try {
        const response = await axios.post(`${RENDER_URL}/api/test-meal-reminder`, {
            email: email.trim(),
            class_type: classType.trim()
        });

        console.log('✅ SUCCESS!\n');
        console.log('Response:', JSON.stringify(response.data, null, 2));

        if (response.data.data.email_sent) {
            console.log('\n📧 Email reminder sent! Check your inbox.');
        } else {
            console.log('\n❌ Email failed:', response.data.data.email_error);
        }

        if (response.data.data.whatsapp_sent) {
            console.log('📱 WhatsApp reminder sent! Check your phone.');
        } else if (response.data.data.whatsapp_error) {
            console.log('❌ WhatsApp failed:', response.data.data.whatsapp_error);
        }

        console.log('\n✨ If you received the test reminder, your scheduled reminders should work too!');
        console.log('   Next scheduled reminder times are in MEAL-REMINDER-SCHEDULE.md');

    } catch (error) {
        console.log('❌ ERROR!\n');

        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', JSON.stringify(error.response.data, null, 2));

            if (error.response.status === 404) {
                console.log('\n💡 This means you don\'t have an active subscription.');
                console.log('   Solution: Go to https://fit2fit-gym-api.onrender.com');
                console.log('   and subscribe to meal reminders for your class.');
            }
        } else {
            console.log('Error:', error.message);
        }
    }

    rl.close();
}

testReminders();
