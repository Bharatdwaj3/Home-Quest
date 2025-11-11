// client/src/components/ShortestPathPanel.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import { Card, Spinner, Alert, Badge, ListGroup, Button, Form } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

// ────── Fix Leaflet icons ──────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ────── Haversine distance (km) ──────
const haversineKm = ([lat1, lng1], [lat2, lng2]) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

export default function ShortestPathPanel({ pg }) {
  const [userPos, setUserPos] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showManual, setShowManual] = useState(false);

  // ────── Try geolocation ──────
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
      pos => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      err => {
        setError(err.code === 1 ? "Location blocked. Click 'Allow'." : err.message);
        setLoading(false);
        setShowManual(true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    tryLocation();
  }, []);

  // ────── Geocode city (free) ──────
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
        setError("City not found. Try 'Delhi', 'Mumbai'");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // ────── UI: Loading ──────
  if (loading) {
    return (
      <Card className="my-4 p-4 text-center border-0 shadow-sm">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 fw-bold">Finding your location...</p>
      </Card>
    );
  }

  // ────── UI: Error + Retry + Manual ──────
  if (!userPos) {
    return (
      <Card className="my-4 border-0 shadow-sm">
        <Card.Header className="bg-warning text-dark fw-bold">
          Location Needed
        </Card.Header>
        <Card.Body>
          <Alert variant="light" className="border-warning">
            <strong>{error}</strong>
          </Alert>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={tryLocation}>
              Try Again (Allow Location)
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowManual(!showManual)}>
              {showManual ? "Hide" : "Enter City"}
            </Button>
          </div>
          {showManual && (
            <Form.Group className="mt-3">
              <Form.Control
                placeholder="e.g., Delhi, Mumbai"
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && geocode()}
              />
              <Button variant="success" size="sm" className="mt-2 w-100" onClick={geocode}>
                Show Distance
              </Button>
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    );
  }

  // ────── UI: Map + Distance ──────
  const pgPos = [pg.latitude, pg.longitude];
  const distance = (haversineKm(userPos, pgPos) * 1.2).toFixed(1); // +20% for roads
  const eta = Math.round((distance / 30) * 60); // 30 km/h

  return (
    <Card className="my-4 border-0 shadow-sm">
      <Card.Header className="bg-success text-white fw-bold">
        Distance from You
      </Card.Header>
      <Card.Body className="p-0">
        <div style={{ height: "300px" }}>
          <MapContainer center={userPos} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userPos}><Popup>You</Popup></Marker>
            <Marker position={pgPos}><Popup>{pg.name}</Popup></Marker>
            <Polyline positions={[userPos, pgPos]} color="red" weight={5} dashArray="10,10" />
          </MapContainer>
        </div>
        <ListGroup variant="flush" className="border-top">
          <ListGroup.Item className="d-flex justify-content-between py-3">
            <strong>Distance</strong>
            <Badge bg="info" pill>{distance} km</Badge>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between py-3">
            <strong>ETA (car)</strong>
            <Badge bg="success" pill>{eta} min</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}