// Use built-in global fetch (Node 18+) — file is ESM in this project
const payload = {
  name: 'AutoTest Route Script',
  description: 'Route with 3 stops from test script',
  created_by: null,
  stops: [
    { name: 'S1', lat: 12.34, lng: 56.78, order: 1 },
    { name: 'S2', lat: 21.34, lng: 65.78, order: 2 },
    { name: 'S3', lat: 31.34, lng: 75.78, order: 3 },
  ]
};

(async () => {
  try {
    console.log('Posting route...');
    const res = await fetch('http://127.0.0.1:5000/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const body = await res.text();
    console.log('POST RESPONSE (status', res.status, '):', body);

    if (res.ok) {
      const json = JSON.parse(body);
      if (json.id) {
        console.log('Fetching stops for route id', json.id);
        const sres = await fetch(`http://127.0.0.1:5000/api/routes/${json.id}/stops`);
        const sbody = await sres.text();
        console.log('STOPS RESPONSE (status', sres.status, '):', sbody);
      } else {
        console.error('No id returned when creating route');
      }
    } else {
      console.error('Route creation failed');
    }
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();
