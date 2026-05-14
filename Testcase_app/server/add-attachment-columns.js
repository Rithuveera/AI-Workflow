import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'testflow.db'));

console.log('Adding attachment column to requirements table...');

try {
    // Add attachment columns to requirements table
    db.exec(`
        ALTER TABLE requirements ADD COLUMN attachment_name TEXT;
    `);
    console.log('✅ Added attachment_name column');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('ℹ️  attachment_name column already exists');
    } else {
        throw error;
    }
}

try {
    db.exec(`
        ALTER TABLE requirements ADD COLUMN attachment_path TEXT;
    `);
    console.log('✅ Added attachment_path column');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('ℹ️  attachment_path column already exists');
    } else {
        throw error;
    }
}

try {
    db.exec(`
        ALTER TABLE requirements ADD COLUMN attachment_size INTEGER;
    `);
    console.log('✅ Added attachment_size column');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('ℹ️  attachment_size column already exists');
    } else {
        throw error;
    }
}

try {
    db.exec(`
        ALTER TABLE requirements ADD COLUMN attachment_type TEXT;
    `);
    console.log('✅ Added attachment_type column');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('ℹ️  attachment_type column already exists');
    } else {
        throw error;
    }
}

console.log('\n✅ Database schema updated successfully!');
db.close();
