import pool from '../config/db.js';

// Direct DB test: inserts a route and multiple stops, then queries them.
// Run: from repo root -> `node Backend/scripts/db_test_create_route.js`

async function main() {
  const testRoute = {
    name: 'DB Test Route',
    description: 'Inserted directly into DB by test script',
    created_by: null
  };

  const testStops = [
    { name: 'A', lat: 12.30, lng: 76.60, order: 1 },
    { name: 'B', lat: 12.31, lng: 76.61, order: 2 },
    { name: 'C', lat: 12.32, lng: 76.62, order: 3 }
  ];

  let routeId;
  try {
    console.log('Starting DB test...');

    // Insert route
    const [routeRes] = await pool.query(
      `INSERT INTO routes (name, description, created_by) VALUES (?, ?, ?)`,
      [testRoute.name, testRoute.description, testRoute.created_by]
    );
    routeId = routeRes.insertId;
    console.log('Inserted route id =', routeId);

    // Insert stops
    for (const s of testStops) {
      const [r] = await pool.query(
        `INSERT INTO stops (route_id, bus_id, name, latitude, longitude, stop_order) VALUES (?, NULL, ?, ?, ?, ?)`,
        [routeId, s.name, s.lat, s.lng, s.order]
      );
      console.log(`Inserted stop id=${r.insertId} (name=${s.name})`);
    }

    // Query back the stops
    const [rows] = await pool.query(
      `SELECT id, route_id, name, latitude, longitude, stop_order, bus_id, created_at FROM stops WHERE route_id = ? ORDER BY stop_order ASC`,
      [routeId]
    );

    console.log('\nPersisted stops for route', routeId, ':');
    console.log(JSON.stringify(rows, null, 2));

    console.log('\nDB test completed successfully');
  } catch (err) {
    console.error('DB test failed:', err.message || err);
  } finally {
    // Close pool
    try { await pool.end(); } catch (e) { /* ignore */ }
    process.exit(0);
  }
}

main();
