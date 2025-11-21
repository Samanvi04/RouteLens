import pool from '../config/db.js';

(async () => {
  try {
    await pool.query("ALTER TABLE students ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL");
    console.log('ALTER OK: email column added');
  } catch (e) {
    if (e && (e.code === 'ER_DUP_FIELDNAME' || e.errno === 1060)) {
      console.log('SKIP: email column already exists');
    } else {
      console.error('ALTER ERR', e);
    }
  } finally {
    process.exit(0);
  }
})();
