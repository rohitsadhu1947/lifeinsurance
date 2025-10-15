-- Create quotes_storage table for session-based quote retrieval
CREATE TABLE IF NOT EXISTS quotes_storage (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    quote_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_quotes_storage_session_id ON quotes_storage(session_id);
CREATE INDEX IF NOT EXISTS idx_quotes_storage_expires_at ON quotes_storage(expires_at);

-- Clean up expired quotes (this would typically be run as a scheduled job)
-- DELETE FROM quotes_storage WHERE expires_at < CURRENT_TIMESTAMP;

