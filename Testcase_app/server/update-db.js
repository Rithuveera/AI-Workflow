import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database', 'testflow.db'));

console.log('\n🔧 ========== TESTFLOW DATABASE UPDATE TOOL ==========\n');

// Get the query from command line arguments
const query = process.argv.slice(2).join(' ');

if (!query) {
    console.log('❌ No query provided!\n');
    console.log('Usage: node update-db.js "YOUR SQL QUERY HERE"\n');
    console.log('Examples:\n');
    console.log('📝 UPDATE Examples:');
    console.log('  node update-db.js "UPDATE requirements SET title = \'New Title\' WHERE id = \'req-123\'"');
    console.log('  node update-db.js "UPDATE test_cases SET priority = \'High\' WHERE id = \'tc-456\'"');
    console.log('  node update-db.js "UPDATE executions SET status = \'Passed\' WHERE id = \'exec-789\'"\n');

    console.log('➕ INSERT Examples:');
    console.log('  node update-db.js "INSERT INTO requirements (id, title, description) VALUES (\'req-new\', \'New Req\', \'Description\')"');
    console.log('  node update-db.js "INSERT INTO test_cases (id, requirement_id, title, steps, expected_result, priority) VALUES (\'tc-new\', \'req-123\', \'Test\', \'Steps\', \'Result\', \'Medium\')""\n');

    console.log('🗑️  DELETE Examples:');
    console.log('  node update-db.js "DELETE FROM requirements WHERE id = \'req-123\'"');
    console.log('  node update-db.js "DELETE FROM test_cases WHERE id = \'tc-456\'"\n');

    console.log('🔍 SELECT Examples (to view data):');
    console.log('  node update-db.js "SELECT * FROM requirements"');
    console.log('  node update-db.js "SELECT * FROM test_cases WHERE priority = \'High\'"');
    console.log('  node update-db.js "SELECT * FROM executions WHERE status = \'Failed\'"\n');

    db.close();
    process.exit(1);
}

try {
    console.log(`📝 Executing query: ${query}\n`);

    // Check if it's a SELECT query
    if (query.trim().toUpperCase().startsWith('SELECT')) {
        const results = db.prepare(query).all();

        if (results.length === 0) {
            console.log('📭 No results found.\n');
        } else {
            console.log(`✅ Found ${results.length} result(s):\n`);
            console.table(results);
        }
    } else {
        // For INSERT, UPDATE, DELETE
        const result = db.prepare(query).run();

        console.log('✅ Query executed successfully!\n');
        console.log(`📊 Changes made: ${result.changes}`);
        console.log(`🆔 Last inserted ID: ${result.lastInsertRowid || 'N/A'}\n`);

        // Show updated data if it was an UPDATE
        if (query.trim().toUpperCase().startsWith('UPDATE')) {
            console.log('📋 Tip: Run "node view-db.js" to see all updated data\n');
        }
    }

} catch (error) {
    console.error('❌ Error executing query:');
    console.error(error.message);
    console.log('\n💡 Make sure your SQL syntax is correct!\n');
}

db.close();
console.log('='.repeat(60) + '\n');
