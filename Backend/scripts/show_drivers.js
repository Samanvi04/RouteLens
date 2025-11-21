import pool from '../config/db.js';

(async ()=>{
  try{
    const [rows]=await pool.query('SELECT id, name, email, license_no, vehicle_pref, is_verified, created_at FROM drivers ORDER BY id DESC LIMIT 10');
    console.log(JSON.stringify(rows, null, 2));
  }catch(e){
    console.error(e);
  }finally{process.exit(0);} 
})();
