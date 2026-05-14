-- TestFlow Database Schema

-- Requirements Table
CREATE TABLE IF NOT EXISTS requirements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    attachment_name TEXT,
    attachment_path TEXT,
    attachment_size INTEGER,
    attachment_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases Table
CREATE TABLE IF NOT EXISTS test_cases (
    id TEXT PRIMARY KEY,
    requirement_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    steps TEXT,
    expected_result TEXT,
    priority TEXT DEFAULT 'Medium',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requirement_id) REFERENCES requirements(id) ON DELETE CASCADE
);

-- Executions Table
CREATE TABLE IF NOT EXISTS executions (
    id TEXT PRIMARY KEY,
    test_case_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Passed', 'Failed', 'Blocked', 'NA')),
    notes TEXT,
    executed_by TEXT,
    execution_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_case_id) REFERENCES test_cases(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_test_cases_requirement ON test_cases(requirement_id);
CREATE INDEX IF NOT EXISTS idx_executions_test_case ON executions(test_case_id);
CREATE INDEX IF NOT EXISTS idx_executions_status ON executions(status);
CREATE INDEX IF NOT EXISTS idx_executions_date ON executions(execution_date);

-- Trigger to update updated_at timestamp for requirements
CREATE TRIGGER IF NOT EXISTS update_requirements_timestamp 
AFTER UPDATE ON requirements
BEGIN
    UPDATE requirements SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger to update updated_at timestamp for test_cases
CREATE TRIGGER IF NOT EXISTS update_test_cases_timestamp 
AFTER UPDATE ON test_cases
BEGIN
    UPDATE test_cases SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger to update updated_at timestamp for executions
CREATE TRIGGER IF NOT EXISTS update_executions_timestamp 
AFTER UPDATE ON executions
BEGIN
    UPDATE executions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
