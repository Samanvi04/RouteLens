import pool from '../config/db.js';

(async ()=>{
  try{
    const [cols] = await pool.query('SHOW COLUMNS FROM buses');
    const fields = cols.map(c=>c.Field);
    console.log('Current buses columns:', fields.join(', '));

    if (!fields.includes('plate')){
      try{
        await pool.query("ALTER TABLE buses ADD COLUMN plate VARCHAR(50) DEFAULT NULL");
        console.log('Added column plate');
      }catch(e){ console.error('Error adding plate:', e.message); }
    } else console.log('plate exists');

    if (!fields.includes('capacity')){
      try{
        await pool.query("ALTER TABLE buses ADD COLUMN capacity INT DEFAULT NULL");
        console.log('Added column capacity');
      }catch(e){ console.error('Error adding capacity:', e.message); }
    } else console.log('capacity exists');

  }catch(e){ console.error(e); }
  finally{ process.exit(0); }
})();
