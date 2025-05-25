require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  user_name TEXT NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("✅ messages table created!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    await client.end();
  }
}

main();
