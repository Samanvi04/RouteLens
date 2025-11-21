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
        route_id BIGINT NOT NULL,
        name VARCHAR(255) NOT NULL,
        latitude DOUBLE,
        longitude DOUBLE,
        stop_order INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
      )
    `);
    console.log("✔ Stops table ready");

    console.log("All migrations completed successfully!");
  } catch (err) {
    console.error("Migration Error:", err);
    process.exit(1);  // Stop server if migration fails
  }
};
