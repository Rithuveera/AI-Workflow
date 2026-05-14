import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize database
const db = new Database(join(__dirname, 'testflow.db'));

console.log('🔧 Initializing TestFlow database...');

// Read and execute schema
const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

console.log('✅ Database schema created successfully!');

// Insert sample data (optional)
const insertSampleData = () => {
    // Check if data already exists
    const count = db.prepare('SELECT COUNT(*) as count FROM requirements').get().count;

    if (count > 0) {
        console.log('ℹ️  Data already exists, skipping sample data insertion.');
        return;
    }

    console.log('📝 Inserting sample data...');

    // Sample requirements
    const reqStmt = db.prepare(`
        INSERT INTO requirements (id, title, description) 
        VALUES (?, ?, ?)
    `);

    const req1Id = 'req-' + Date.now();
    const req2Id = 'req-' + (Date.now() + 1);

    reqStmt.run(req1Id, 'User Authentication', 'Users should be able to login and logout securely');
    reqStmt.run(req2Id, 'Dashboard Display', 'Display test execution statistics on dashboard');

    // Sample test cases
    const tcStmt = db.prepare(`
        INSERT INTO test_cases (id, requirement_id, title, description, steps, expected_result, priority) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const tc1Id = 'tc-' + Date.now();
    const tc2Id = 'tc-' + (Date.now() + 1);

    tcStmt.run(
        tc1Id,
        req1Id,
        'Login with valid credentials',
        'Verify user can login with correct username and password',
        '1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button',
        'User should be redirected to dashboard',
        'High'
    );

    tcStmt.run(
        tc2Id,
        req2Id,
        'View dashboard statistics',
        'Verify dashboard shows correct test execution stats',
        '1. Login to application\n2. Navigate to dashboard\n3. Check statistics display',
        'Dashboard should show total, passed, failed, and blocked test counts',
        'Medium'
    );

    // Sample executions
    const execStmt = db.prepare(`
        INSERT INTO executions (id, test_case_id, status, notes, executed_by) 
        VALUES (?, ?, ?, ?, ?)
    `);

    execStmt.run(
        'exec-' + Date.now(),
        tc1Id,
        'Passed',
        'Login functionality working as expected',
        'Test Engineer'
    );

    execStmt.run(
        'exec-' + (Date.now() + 1),
        tc2Id,
        'Passed',
        'All statistics displaying correctly',
        'Test Engineer'
    );

    console.log('✅ Sample data inserted successfully!');
};

insertSampleData();

// Display table counts
const requirements = db.prepare('SELECT COUNT(*) as count FROM requirements').get();
const testCases = db.prepare('SELECT COUNT(*) as count FROM test_cases').get();
const executions = db.prepare('SELECT COUNT(*) as count FROM executions').get();

console.log('\n📊 Database Statistics:');
console.log(`   Requirements: ${requirements.count}`);
console.log(`   Test Cases: ${testCases.count}`);
console.log(`   Executions: ${executions.count}`);
console.log('\n✨ Database initialization complete!\n');

db.close();
