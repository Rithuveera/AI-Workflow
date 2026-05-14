import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database', 'testflow.db'));

console.log('🔧 Adding product column to tables...');

const tables = ['requirements', 'test_cases', 'executions'];

tables.forEach(table => {
    try {
        // Check if column exists
        const tableInfo = db.prepare(`PRAGMA table_info(${table})`).all();
        const hasProduct = tableInfo.some(col => col.name === 'product');

        if (!hasProduct) {
            console.log(`Adding product column to ${table}...`);
            db.prepare(`ALTER TABLE ${table} ADD COLUMN product TEXT DEFAULT 'BSSTech ERP'`).run();
            console.log(`✅ Added product column to ${table}`);
        } else {
            console.log(`ℹ️  Product column already exists in ${table}`);
        }
    } catch (error) {
        console.error(`❌ Failed to update ${table}:`, error.message);
    }
});

console.log('✨ Database update complete!');
db.close();
