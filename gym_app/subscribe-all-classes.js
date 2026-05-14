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

async function subscribeToAllClasses() {
    console.log('📱 Subscribe to ALL Class Meal Reminders\n');
    console.log('This will subscribe you to HIIT, Yoga, AND Strength reminders!\n');

    const name = await question('Enter your name: ');
    const email = await question('Enter your email: ');
    const phone = await question('Enter your phone number (with country code, e.g., +919876543210): ');

    console.log('\n📤 Subscribing to all classes...\n');

    const classes = ['HIIT', 'Yoga', 'Strength'];
    const results = [];

    for (const classType of classes) {
        try {
            console.log(`Subscribing to ${classType}...`);

            const response = await axios.post(`${RENDER_URL}/api/subscribe-reminders`, {
                name: name.trim(),
                email: email.trim(),
                phone_number: phone.trim(),
                class_type: classType,
                whatsapp_enabled: true
            });

            console.log(`✅ ${classType} - SUCCESS!`);
            results.push({ class: classType, success: true });

        } catch (error) {
            console.log(`❌ ${classType} - FAILED`);
            if (error.response) {
                console.log(`   Error: ${error.response.data.error}`);
            }
            results.push({ class: classType, success: false, error: error.message });
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 SUBSCRIPTION SUMMARY');
    console.log('='.repeat(50) + '\n');

    results.forEach(r => {
        if (r.success) {
            console.log(`✅ ${r.class} - Subscribed`);
        } else {
            console.log(`❌ ${r.class} - Failed`);
        }
    });

    const successCount = results.filter(r => r.success).length;

    if (successCount > 0) {
        console.log(`\n🎉 Successfully subscribed to ${successCount} class(es)!`);
        console.log('📱 You should receive WhatsApp confirmation messages now!');

        console.log('\n⏰ You will receive reminders at these times (IST):\n');

        if (results.find(r => r.class === 'HIIT' && r.success)) {
            console.log('🔥 HIIT:');
            console.log('   - 7:00 AM - Breakfast');
            console.log('   - 10:00 AM - Mid-Morning');
            console.log('   - 1:00 PM - Lunch');
            console.log('   - 4:30 PM - Pre-Workout');
            console.log('   - 6:30 PM - Post-Workout');
            console.log('   - 8:30 PM - Dinner\n');
        }

        if (results.find(r => r.class === 'Yoga' && r.success)) {
            console.log('🧘 Yoga:');
            console.log('   - 7:30 AM - Breakfast');
            console.log('   - 10:30 AM - Mid-Morning');
            console.log('   - 1:00 PM - Lunch');
            console.log('   - 4:00 PM - Afternoon');
            console.log('   - 7:00 PM - Post-Yoga');
            console.log('   - 8:30 PM - Dinner\n');
        }

        if (results.find(r => r.class === 'Strength' && r.success)) {
            console.log('💪 Strength:');
            console.log('   - 7:00 AM - Breakfast');
            console.log('   - 10:00 AM - Mid-Morning');
            console.log('   - 12:30 PM - Lunch');
            console.log('   - 3:30 PM - Pre-Workout');
            console.log('   - 6:00 PM - Post-Workout');
            console.log('   - 8:30 PM - Dinner\n');
        }

        console.log('📝 Note: You will receive reminders for ALL subscribed classes!');
        console.log('   This means you may get multiple reminders at similar times.');

    } else {
        console.log('\n❌ All subscriptions failed. Please check your details and try again.');
    }

    rl.close();
}

subscribeToAllClasses();
