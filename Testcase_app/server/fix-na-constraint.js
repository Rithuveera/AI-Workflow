import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'database', 'testflow.db');
const db = new Database(dbPath);

console.log('🔧 Fixing NA constraint in executions table...\n');

try {
    // Start transaction
    db.exec('BEGIN TRANSACTION');

    // Create new table with correct constraint
    db.exec(`
        CREATE TABLE executions_new (
            id TEXT PRIMARY KEY,
            test_case_id TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('Passed', 'Failed', 'Blocked', 'NA')),
            notes TEXT,
            executed_by TEXT,
            execution_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (test_case_id) REFERENCES test_cases(id) ON DELETE CASCADE
        )
    `);

    // Copy data from old table to new table
    db.exec(`
        INSERT INTO executions_new (id, test_case_id, status, notes, executed_by, execution_date, created_at, updated_at)
        SELECT id, test_case_id, status, notes, executed_by, execution_date, created_at, updated_at
        FROM executions
    `);

    // Drop old table
    db.exec('DROP TABLE executions');

    // Rename new table to original name
    db.exec('ALTER TABLE executions_new RENAME TO executions');

    // Recreate indexes
    db.exec('CREATE INDEX IF NOT EXISTS idx_executions_test_case ON executions(test_case_id)');
    db.exec('CREATE INDEX IF NOT EXISTS idx_executions_status ON executions(status)');
    db.exec('CREATE INDEX IF NOT EXISTS idx_executions_date ON executions(execution_date)');

    // Recreate trigger
    db.exec(`
        CREATE TRIGGER IF NOT EXISTS update_executions_timestamp 
        AFTER UPDATE ON executions
        BEGIN
            UPDATE executions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
        END
    `);

    // Commit transaction
    db.exec('COMMIT');

    console.log('✅ Successfully updated executions table constraint!');
    console.log('   Status values now accept: Passed, Failed, Blocked, NA\n');

} catch (error) {
    db.exec('ROLLBACK');
    console.error('❌ Error updating constraint:', error.message);
    process.exit(1);
} finally {
    db.close();
}
