import axios from 'axios';

const RENDER_URL = 'https://fit2fit-gym-api.onrender.com';

async function checkReminderSystem() {
    console.log('🔍 Checking Reminder System Status...\n');

    try {
        // 1. Check if server is alive
        console.log('1️⃣ Checking server health...');
        try {
            const healthResponse = await axios.get(`${RENDER_URL}/api/members`);
            console.log('✅ Server is running\n');
        } catch (err) {
            console.log('⚠️  Server might be sleeping or down\n');
        }

        // 2. Check for active subscriptions
        console.log('2️⃣ Checking active subscriptions...');
        console.log('⚠️  Note: This requires database access. Check Render logs for subscription count.\n');

        // 3. Check current time
        console.log('3️⃣ Current time check:');
        const now = new Date();
        const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        console.log(`   Current IST Time: ${istTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true })}`);
        console.log(`   Current IST Date: ${istTime.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })}\n`);

        // 4. Show next scheduled reminders
        console.log('4️⃣ Next scheduled reminders (IST):');
        const schedules = [
            { time: '07:00', meal: 'HIIT/Strength Breakfast' },
            { time: '07:30', meal: 'Yoga Breakfast' },
            { time: '10:00', meal: 'HIIT/Strength Mid-Morning' },
            { time: '10:30', meal: 'Yoga Mid-Morning' },
            { time: '12:30', meal: 'Strength Lunch' },
            { time: '13:00', meal: 'HIIT/Yoga Lunch' },
            { time: '15:30', meal: 'Strength Pre-Workout' },
            { time: '16:00', meal: 'Yoga Afternoon' },
            { time: '16:30', meal: 'HIIT Pre-Workout' },
            { time: '18:00', meal: 'Strength Post-Workout' },
            { time: '18:30', meal: 'HIIT Post-Workout' },
            { time: '19:00', meal: 'Yoga Post-Yoga' },
            { time: '20:30', meal: 'All Classes Dinner' }
        ];

        const currentHour = istTime.getHours();
        const currentMinute = istTime.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        let nextReminders = schedules.filter(s => {
            const [hour, minute] = s.time.split(':').map(Number);
            const scheduleTimeInMinutes = hour * 60 + minute;
            return scheduleTimeInMinutes > currentTimeInMinutes;
        }).slice(0, 3);

        if (nextReminders.length === 0) {
            nextReminders = schedules.slice(0, 3);
            console.log('   (Showing tomorrow\'s first reminders)');
        }

        nextReminders.forEach(r => {
            console.log(`   • ${r.time} - ${r.meal}`);
        });

        console.log('\n5️⃣ Troubleshooting Steps:');
        console.log('   a) Check Render Dashboard logs for:');
        console.log('      - "Initializing Meal Reminder Scheduler"');
        console.log('      - "All meal reminders scheduled successfully"');
        console.log('      - "Keep-Alive ping successful" (every 14 minutes)');
        console.log('      - "Checking reminders for [CLASS] - [MEAL]" (at scheduled times)');
        console.log('      - "Found X subscribers for [CLASS]"');
        console.log('      - "Email sent to [email]" or "WhatsApp sent to [phone]"\n');

        console.log('   b) Common issues:');
        console.log('      - No active subscriptions in database');
        console.log('      - Email service credentials not configured');
        console.log('      - Twilio credentials not configured (for WhatsApp)');
        console.log('      - Server restarted recently (check deployment time)');
        console.log('      - Timezone mismatch\n');

        console.log('6️⃣ Test reminder manually:');
        console.log('   Run this command (replace with your email and class):');
        console.log(`   curl -X POST ${RENDER_URL}/api/test-meal-reminder \\`);
        console.log('     -H "Content-Type: application/json" \\');
        console.log('     -d "{\\"email\\":\\"your-email@example.com\\",\\"class_type\\":\\"HIIT\\"}"');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('   Response:', error.response.data);
        }
    }
}

checkReminderSystem();
