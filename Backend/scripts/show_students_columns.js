import pool from '../config/db.js';

(async()=>{
  try{
    const [rows]=await pool.query("SHOW COLUMNS FROM students");
    console.log('Columns:\n', rows.map(r=>r.Field).join(', '));
  }catch(e){
    console.error(e);
  }finally{process.exit(0);} 
})();
