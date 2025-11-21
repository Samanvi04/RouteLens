import pool from '../config/db.js';

(async ()=>{
  try{
    const [rows]=await pool.query('SELECT id, name, plate, capacity, created_at FROM buses ORDER BY id DESC LIMIT 20');
    console.log(JSON.stringify(rows, null, 2));
  }catch(e){
    console.error(e);
  }finally{process.exit(0);} 
})();
