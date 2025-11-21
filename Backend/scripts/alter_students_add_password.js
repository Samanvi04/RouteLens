import pool from '../config/db.js';

(async () => {
  try {
    await pool.query("ALTER TABLE students ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT ''");
    console.log('ALTER OK: password column added');
  } catch (e) {
    if (e && (e.code === 'ER_DUP_FIELDNAME' || e.errno === 1060)) {
      console.log('SKIP: password column already exists');
    } else {
      console.error('ALTER ERR', e);
    }
  } finally {
    process.exit(0);
  }
})();
