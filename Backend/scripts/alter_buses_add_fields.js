import pool from '../config/db.js';

(async () => {
  try {
    await pool.query("ALTER TABLE buses ADD COLUMN IF NOT EXISTS plate VARCHAR(50) DEFAULT NULL");
    await pool.query("ALTER TABLE buses ADD COLUMN IF NOT EXISTS capacity INT DEFAULT NULL");
    console.log('ALTER OK: buses columns ensured');
  } catch (e) {
    console.error('ALTER ERR', e);
  } finally {
    process.exit(0);
  }
})();
