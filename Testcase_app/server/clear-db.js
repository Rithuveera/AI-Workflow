import db from './database/db.js';

console.log('🧹 Clearing all data from database...');

try {
    db.prepare('DELETE FROM executions').run();
    db.prepare('DELETE FROM test_cases').run();
    db.prepare('DELETE FROM requirements').run();
    db.prepare('DELETE FROM users').run();

    console.log('✅ All data cleared successfully!');
} catch (error) {
    console.error('❌ Error clearing data:', error);
}

db.close();
