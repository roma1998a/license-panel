CREATE TABLE license_keys (
  id SERIAL PRIMARY KEY,
  license_key VARCHAR(50) UNIQUE,
  type VARCHAR(20),
  status VARCHAR(20),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
