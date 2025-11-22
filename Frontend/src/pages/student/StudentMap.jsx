import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./StudentPages.css";

export default function StudentMap() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const GH_KEY = import.meta.env.VITE_GRAPHHOPPER_KEY || null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [routeResult, setRouteResult] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const ensureLeafletCSS = () => {
      const href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    };

    const loadAndRender = async () => {
      try {
        const studentId = localStorage.getItem("userId");
        if (!studentId) throw new Error("No logged-in studentId in localStorage");

        const res = await axios.get(`${API}/api/students/${studentId}/map-data`);
        if (!res.data.success) throw new Error(res.data.message || "No data");
        setMapData(res.data.data);

        // If GraphHopper key present and we have a source + at least one destination, call GH route
        let routeJson = null;
        if (GH_KEY && res.data.data.student?.lat != null && res.data.data.nextStops?.length > 0) {
          const src = `${res.data.data.student.lat},${res.data.data.student.lng}`;
          // include all nextStops as subsequent points
          const points = [src];
          for (const s of res.data.data.nextStops) {
            if (s.latitude != null && s.longitude != null) points.push(`${s.latitude},${s.longitude}`);
          }
          const params = points.map(p => `point=${encodeURIComponent(p)}`).join('&');
          const ghUrl = `https://graphhopper.com/api/1/route?${params}&vehicle=car&points_encoded=false&key=${GH_KEY}`;
          const ghRes = await fetch(ghUrl);
          routeJson = await ghRes.json();
          setRouteResult(routeJson);
        }

        // Load Leaflet dynamically
        let L;
        try {
          // prefer local package if installed
          L = (await import('leaflet')).default;
        } catch (e) {
          // leaflet not installed — try using global L (if included via CDN) or throw
          if (window.L) L = window.L;
          else throw new Error('Leaflet library not found. Please install `leaflet` (npm i leaflet) or include it via CDN.');
        }

        ensureLeafletCSS();

        // create map
        // cleanup previous map if exists
        if (mapRef.current && mapRef.current._leaflet_id) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        const sourceLat = res.data.data.student?.lat ?? 0;
        const sourceLng = res.data.data.student?.lng ?? 0;

        const map = L.map('student-map').setView([sourceLat, sourceLng], 13);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Add source marker
        if (res.data.data.student?.lat != null) {
          L.marker([res.data.data.student.lat, res.data.data.student.lng]).addTo(map).bindPopup('You (student)');
        }

        // Add markers for next stops
        const stopMarkers = [];
        if (res.data.data.nextStops && res.data.data.nextStops.length > 0) {
          for (const s of res.data.data.nextStops) {
            if (s.latitude != null && s.longitude != null) {
              const m = L.marker([s.latitude, s.longitude]).addTo(map).bindPopup(s.name || `Stop ${s.id}`);
              stopMarkers.push(m);
            }
          }
        }

        // Draw GraphHopper polyline if available (use routeJson if present)
        const effectiveRoute = routeJson || routeResult;
        if (effectiveRoute && effectiveRoute.paths && effectiveRoute.paths.length > 0) {
          const coords = effectiveRoute.paths[0].points && effectiveRoute.paths[0].points.coordinates ? effectiveRoute.paths[0].points.coordinates : null;
          if (coords && coords.length > 0) {
            // GraphHopper returns [lon, lat] — convert to [lat, lon]
            const latlngs = coords.map(c => [c[1], c[0]]);
            const poly = L.polyline(latlngs, { color: 'blue', weight: 5 }).addTo(map);
            // fit to poly bounds plus markers
            const group = L.featureGroup([poly, ...stopMarkers]);
            if (res.data.data.student?.lat != null) {
              group.addLayer(L.marker([res.data.data.student.lat, res.data.data.student.lng]));
            }
            map.fitBounds(group.getBounds(), { padding: [40, 40] });
          }
        } else {
          // if no GH route, fit to markers
          const group = L.featureGroup([...stopMarkers]);
          if (res.data.data.student?.lat != null) {
            group.addLayer(L.marker([res.data.data.student.lat, res.data.data.student.lng]));
          }
          if (group.getLayers().length > 0) map.fitBounds(group.getBounds(), { padding: [40, 40] });
        }

        setLoading(false);
      } catch (err) {
        console.error('[StudentMap] error', err);
        let msg = err.message || String(err);
        if (err.response) {
          try {
            msg = `HTTP ${err.response.status}: ${JSON.stringify(err.response.data)}`;
          } catch (e) {
            msg = `HTTP ${err.response.status}`;
          }
          if (err.config && err.config.url) msg += ` (url: ${err.config.url})`;
        }
        setError(msg);
        setLoading(false);
      }
    };

    loadAndRender();
    // cleanup on unmount
    return () => {
      try {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      } catch (e) {}
    };
  }, []);

  if (loading) return <div className="page-container"><p>Loading map data…</p></div>;
  if (error) return <div className="page-container"><p>Error: {error}</p><p>If error indicates Leaflet is missing, run <code>npm i leaflet</code> in the frontend folder.</p></div>;

  return (
    <div className="page-container">
      <h2 className="page-title">Student Map</h2>
      <div id="student-map" style={{ height: '60vh', width: '100%', marginBottom: 12 }}></div>

      <div className="map-info">
        <h4>Source (student)</h4>
        <p>{mapData.student?.lat},{mapData.student?.lng}</p>

        <h4>Next Stops (2nd and 3rd)</h4>
        {mapData.nextStops && mapData.nextStops.length > 0 ? (
          <ul>
            {mapData.nextStops.map((s) => (
              <li key={s.id}>{s.name} — {s.latitude},{s.longitude}</li>
            ))}
          </ul>
        ) : (
          <p>No upcoming stops found for assigned bus.</p>
        )}
      </div>
    </div>
  );
}
