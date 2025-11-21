import pool from "./config/db.js";

export const runMigrations = async () => {
  try {
    console.log("Running migrations...");

    // -------------------- STUDENTS TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        grade VARCHAR(50) NOT NULL,
        lat DOUBLE DEFAULT NULL,
        lng DOUBLE DEFAULT NULL,
        assigned_bus BIGINT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Students table ready");

    // -------------------- ADMINS TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Admins table ready");

    // -------------------- DRIVERS TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS drivers (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        license_no VARCHAR(100) NOT NULL,
        vehicle_pref VARCHAR(100),
        lat DOUBLE DEFAULT NULL,
        lng DOUBLE DEFAULT NULL,
        is_verified TINYINT DEFAULT 0,
        is_assigned TINYINT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Drivers table ready");

    // -------------------- BUSES TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS buses (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Buses table ready");

    // -------------------- ASSIGNMENTS TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS assignments (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        bus_id BIGINT NOT NULL,
        driver_id BIGINT NOT NULL,
        assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
        FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
      )
    `);
    console.log("✔ Assignments table ready");

    // -------------------- ROUTES TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_by BIGINT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✔ Routes table ready");

    // -------------------- STOPS TABLE --------------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stops (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        route_id BIGINT DEFAULT NULL,
        bus_id BIGINT DEFAULT NULL,
        name VARCHAR(255) NOT NULL,
        latitude DOUBLE,
        longitude DOUBLE,
        stop_order INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
        FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE
      )
    `);
    console.log("✔ Stops table ready");

    // Ensure lat/lng columns exist on older databases
    const ensureColumn = async (table, column, definition) => {
      const [rows] = await pool.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [process.env.DB_NAME, table, column]
      );
      if (rows.length === 0) {
        await pool.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
        console.log(`➕ Added column ${column} to ${table}`);
      }
    };

    await ensureColumn('students', 'lat', 'DOUBLE DEFAULT NULL');
    await ensureColumn('students', 'lng', 'DOUBLE DEFAULT NULL');
    await ensureColumn('students', 'assigned_bus', 'BIGINT DEFAULT NULL');
    await ensureColumn('drivers', 'lat', 'DOUBLE DEFAULT NULL');
    await ensureColumn('drivers', 'lng', 'DOUBLE DEFAULT NULL');
    await ensureColumn('stops', 'bus_id', 'BIGINT DEFAULT NULL');

    console.log("All migrations completed successfully!");
  } catch (err) {
    console.error("Migration Error:", err);
    process.exit(1);  // Stop server if migration fails
  }
};
