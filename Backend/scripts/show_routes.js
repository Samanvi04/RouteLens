import pool from '../config/db.js';

(async ()=>{
  try{
    const [rows]=await pool.query('SELECT id, name, description, created_by, created_at FROM routes ORDER BY id DESC LIMIT 20');
    console.log(JSON.stringify(rows, null, 2));
  }catch(e){
    console.error(e);
  }finally{process.exit(0);} 
})();
