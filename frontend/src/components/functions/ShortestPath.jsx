// client/src/components/ShortestPathPanel.jsx
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { Card, Spinner, Alert, Badge, ListGroup, Button, Form } from "react-bootstrap";
import { useDijkstra, reconstructPath } from "./useDijkstra";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Haversine (km)
const haversine = ([lat1, lng1], [lat2, lng2]) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = 
    Math.sin(dLat/2)**2 + 
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function ShortestPathPanel({ pg: currentPg }) {
  const [userPos, setUserPos] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [allPgs, setAllPgs] = useState([]);

  // 1. Fetch all PGs from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Login required");
      setLoading(false);
      return;
    }

    axios.get("http://localhost:4001/api/pg/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setAllPgs(res.data.filter(p => p.latitude && p.longitude));
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to load PGs");
     setLoading(false);
    });
  }, []);

  // 2. Try geolocation
  const tryLocation = () => {
    setLoading(true);
    setError("");
    setShowManual(false);

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      setShowManual(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      err => {
        setError(err.code === 1 ? "Location blocked." : err.message);
        setShowManual(true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    tryLocation();
  }, []);

  // 3. Geocode city
  const geocode = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)},+India&limit=1`
      );
      const data = await res.json();
      if (data[0]) {
        setUserPos([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        setError("City not found");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // 4. Build graph from PGs
  const graph = useMemo(() => {
    const g = {};
    const nodes = [...allPgs, { _id: "USER", latitude: userPos?.[0], longitude: userPos?.[1] }].filter(Boolean);

    nodes.forEach(pg => {
      const id = pg._id;
      g[id] = {};
      nodes.forEach(other => {
        if (other._id === id) return;
        const dist = haversine(
          [pg.latitude, pg.longitude],
          [other.latitude, other.longitude]
        );
        if (dist < 500) g[id][other._id] = dist; // connect < 50 km
      });
    });
    return g;
  }, [allPgs, userPos]);

  const userNode = "USER";
  const pgNode = currentPg?._id;
  const { distances, previous } = useDijkstra(graph, userNode);
  const path = pgNode ? reconstructPath(previous, pgNode) : [];

  // 5. Parse path → coordinates
  const pathCoords = path.map(id => {
    if (id === "USER") return userPos;
    const pg = allPgs.find(p => p._id === id);
    return pg ? [pg.latitude, pg.longitude] : null;
  }).filter(Boolean);

  if (loading) {
    return (
      <Card className="my-4 p-4 text-center border-0 shadow-sm">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 fw-bold">Building graph + Dijkstra...</p>
      </Card>
    );
  }

  if (!userPos) {
    return (
      <Card className="my-4 border-0 shadow-sm">
        <Card.Header className="bg-warning text-dark fw-bold">Location Needed</Card.Header>
        <Card.Body>
          <Alert variant="light" className="border-warning"><strong>{error}</strong></Alert>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={tryLocation}>Try Again</Button>
            <Button variant="outline-secondary" onClick={() => setShowManual(!showManual)}>
              {showManual ? "Hide" : "Enter City"}
            </Button>
          </div>
          {showManual && (
            <Form.Group className="mt-3">
              <Form.Control
                placeholder="e.g., Delhi"
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && geocode()}
              />
              <Button variant="success" size="sm" className="mt-2 w-100" onClick={geocode}>
                Go
              </Button>
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    );
  }

  const distance = distances[pgNode] !== Infinity ? `${distances[pgNode].toFixed(1)} km` : "No path";
  const eta = distances[pgNode] !== Infinity ? `${Math.round((distances[pgNode] / 30) * 60)} min` : "N/A";

  return (
    <Card className="my-4 border-0 shadow-sm">
      <Card.Header className="bg-success text-white fw-bold">
        Dijkstra Shortest Path (via PGs)
      </Card.Header>
      <Card.Body className="p-0">
        <div style={{ height: "320px" }}>
          <MapContainer center={userPos} zoom={11} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userPos}><Popup>You</Popup></Marker>
            <Marker position={[currentPg.latitude, currentPg.longitude]}>
              <Popup>{currentPg.name}</Popup>
            </Marker>
            {pathCoords.length > 1 && (
              <Polyline
                positions={pathCoords}
                color="#dc3545"
                weight={6}
                opacity={0.9}
              />
            )}
          </MapContainer>
        </div>
        <ListGroup variant="flush" className="border-top">
          <ListGroup.Item className="d-flex justify-content-between py-3">
            <strong>Distance</strong>
            <Badge bg="info" pill>{distance}</Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between py-3">
            <strong>ETA</strong>
            <Badge bg="success" pill>{eta}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}