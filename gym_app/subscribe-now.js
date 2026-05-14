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

async function subscribe() {
    console.log('📱 WhatsApp Meal Reminder Subscription\n');

    const name = await question('Enter your name: ');
    const email = await question('Enter your email: ');
    const phone = await question('Enter your phone number (with country code, e.g., +919876543210): ');
    const classType = await question('Enter class type (HIIT/Yoga/Strength): ');

    console.log('\n📤 Subscribing...\n');

    try {
        const response = await axios.post(`${RENDER_URL}/api/subscribe-reminders`, {
            name: name.trim(),
            email: email.trim(),
            phone_number: phone.trim(),
            class_type: classType.trim(),
            whatsapp_enabled: true
        });

        console.log('✅ SUCCESS!\n');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        console.log('\n📱 You should receive a WhatsApp confirmation message now!');
        console.log('\n⏰ You will receive meal reminders at these times (IST):');

        if (classType.trim().toUpperCase() === 'HIIT') {
            console.log('   - 7:00 AM - Breakfast');
            console.log('   - 10:00 AM - Mid-Morning');
            console.log('   - 1:00 PM - Lunch');
            console.log('   - 4:30 PM - Pre-Workout');
            console.log('   - 6:30 PM - Post-Workout');
            console.log('   - 8:30 PM - Dinner');
        } else if (classType.trim().toUpperCase() === 'YOGA') {
            console.log('   - 7:30 AM - Breakfast');
            console.log('   - 10:30 AM - Mid-Morning');
            console.log('   - 1:00 PM - Lunch');
            console.log('   - 4:00 PM - Afternoon');
            console.log('   - 7:00 PM - Post-Yoga');
            console.log('   - 8:30 PM - Dinner');
        } else if (classType.trim().toUpperCase() === 'STRENGTH') {
            console.log('   - 7:00 AM - Breakfast');
            console.log('   - 10:00 AM - Mid-Morning');
            console.log('   - 12:30 PM - Lunch');
            console.log('   - 3:30 PM - Pre-Workout');
            console.log('   - 6:00 PM - Post-Workout');
            console.log('   - 8:30 PM - Dinner');
        }

        console.log('\n🎉 All set! You\'ll receive WhatsApp reminders at the scheduled times.');

    } catch (error) {
        console.log('❌ ERROR!\n');

        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('Error:', error.message);
        }
    }

    rl.close();
}

subscribe();
