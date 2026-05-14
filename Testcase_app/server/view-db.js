import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database', 'testflow.db'));

let output = '';
output += '\n📊 ========== TESTFLOW DATABASE CONTENTS ==========\n\n';

// View Requirements
output += '📋 REQUIREMENTS:\n';
output += '─'.repeat(80) + '\n';
const reqs = db.prepare('SELECT * FROM requirements').all();
if (reqs.length === 0) {
    output += '   (No requirements found)\n';
} else {
    reqs.forEach((req, idx) => {
        output += `${idx + 1}. ID: ${req.id}\n`;
        output += `   Title: ${req.title}\n`;
        output += `   Description: ${req.description}\n`;
        output += `   Created: ${req.created_at}\n\n`;
    });
}

// View Test Cases
output += '\n🧪 TEST CASES:\n';
output += '─'.repeat(80) + '\n';
const tcs = db.prepare(`
    SELECT tc.*, r.title as requirement_title 
    FROM test_cases tc 
    LEFT JOIN requirements r ON tc.requirement_id = r.id
`).all();
if (tcs.length === 0) {
    output += '   (No test cases found)\n';
} else {
    tcs.forEach((tc, idx) => {
        output += `${idx + 1}. ID: ${tc.id}\n`;
        output += `   Title: ${tc.title}\n`;
        output += `   Requirement: ${tc.requirement_title || 'N/A'}\n`;
        output += `   Priority: ${tc.priority}\n`;
        output += `   Steps: ${tc.steps}\n`;
        output += `   Expected Result: ${tc.expected_result}\n`;
        output += `   Created: ${tc.created_at}\n\n`;
    });
}

// View Executions
output += '\n🏃 EXECUTIONS:\n';
output += '─'.repeat(80) + '\n';
const execs = db.prepare(`
    SELECT e.*, tc.title as test_case_title 
    FROM executions e 
    LEFT JOIN test_cases tc ON e.test_case_id = tc.id
    ORDER BY e.execution_date DESC
`).all();
if (execs.length === 0) {
    output += '   (No executions found)\n';
} else {
    execs.forEach((exec, idx) => {
        output += `${idx + 1}. ID: ${exec.id}\n`;
        output += `   Test Case: ${exec.test_case_title || 'Unknown'}\n`;
        output += `   Status: ${exec.status}\n`;
        output += `   Executed By: ${exec.executed_by || 'N/A'}\n`;
        output += `   Date: ${exec.execution_date}\n`;
        output += `   Notes: ${exec.notes || 'N/A'}\n\n`;
    });
}

// View Users
output += '\n👥 USERS:\n';
output += '─'.repeat(80) + '\n';
try {
    const users = db.prepare('SELECT * FROM users').all();
    if (users.length === 0) {
        output += '   (No users found)\n';
    } else {
        users.forEach((user, idx) => {
            output += `${idx + 1}. ID: ${user.id}\n`;
            output += `   Username: ${user.username}\n`;
            output += `   Created: ${user.created_at}\n\n`;
        });
    }
} catch (error) {
    output += '   (Users table not found or error accessing it)\n';
}

// Statistics
output += '\n📈 STATISTICS:\n';
output += '─'.repeat(80) + '\n';
output += `Total Requirements: ${reqs.length}\n`;
output += `Total Test Cases: ${tcs.length}\n`;
output += `Total Executions: ${execs.length}\n`;

const passed = execs.filter(e => e.status === 'Passed').length;
const failed = execs.filter(e => e.status === 'Failed').length;
const blocked = execs.filter(e => e.status === 'Blocked').length;
const na = execs.filter(e => e.status === 'NA').length;

output += `\nExecution Breakdown:\n`;
output += `  ✅ Passed: ${passed}\n`;
output += `  ❌ Failed: ${failed}\n`;
output += `  ⚠️  Blocked: ${blocked}\n`;
output += `  ➖ Not Applicable: ${na}\n`;

output += '\n' + '='.repeat(80) + '\n';
output += `📁 Database Location: ${join(__dirname, 'database', 'testflow.db')}\n\n`;

// Write to file
const outputPath = join(__dirname, 'database-contents.txt');
fs.writeFileSync(outputPath, output);

// Also print to console
console.log(output);
console.log(`✅ Database contents saved to: ${outputPath}`);

db.close();
