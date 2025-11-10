import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Card, Badge, ListGroup, Button, Alert, Spinner, Container } from "react-bootstrap";
import { BiXCircle, BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMap = () => {

  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [pgData, setPgData] = useState([]);
  const [selectPg, setSelectPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");   

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      setError("Please log in first.");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:4001/api/pg/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log("PGs loaded:", res.data);
      setPgData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Error:", err.response?.data || err.message);
      setError("Failed to load PGs. Try logging in again.");
      setLoading(false);
    });
  }, []);

  // Filter PGs with valid coordinates
  const validPgs = pgData.filter(pg => pg.latitude && pg.longitude);

  // Show loading
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading map...</p>
      </Container>
    );
  }

  // Show error
  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          <BiXCircle className="me-2" />
          {error}
          {error.includes("log in") && (
            <Button
              variant="outline-danger"
              size="sm"
              className="ms-3"
              onClick={() => (window.location.href = "/login")}
            >
              <BiLogIn className="me-1" />
              Login
            </Button>
          )}
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{ 
      position: "relative",
      width: "100%",
      height: "100vh",
    }}>
      {/* ALWAYS render MapContainer */}
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[30.2689, 77.9931]}
        zoom={13}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Only render markers when we have valid data */}
        {validPgs.map(pg => (
          <Marker
            key={pg._id}
            position={[pg.latitude, pg.longitude]}
            eventHandlers={{
              click: () => {
                setSelectPg(selectPg?._id === pg._id ? null : pg); // toggle
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Hover card */}
      {selectPg && (
        <div style={{
          position: "absolute",
          top: "40px",
          left: "90%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: "300px",
        }}>
          <Card className="shadow-lg border-0" style={{ overflow: "hidden", padding: 0 }}>
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center" style={{ padding: "15px 20px" }}>
              <div>
                <h5 className="mb-0" style={{ fontWeight: "600" }}>
                  {selectPg?.city || "Unknown City"}
                </h5>
                <small style={{ opacity: 0.9 }}>
                  {selectPg?.area || "Unknown Area"}
                </small>
              </div>
              <Badge bg={selectPg?.avaliable ? "success" : "danger"} style={{ fontSize: "0.85rem", padding: "8px 12px" }}>
                {selectPg?.avaliable ? "available" : "Occupied"}
              </Badge>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Bedrooms</strong></span>
                  <Badge bg="secondary">
                    {selectPg?.rooms?.bedrooms?.["$numberInt"] || selectPg?.rooms?.bedrooms || 0}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Bathrooms</strong></span>
                  <Badge bg="secondary">
                    {selectPg?.rooms?.washroom?.["$numberInt"] || selectPg?.rooms?.washroom || 0}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span><strong>Type</strong></span>
                  <Badge bg="info">{selectPg?.type || "N/A"}</Badge>
                </ListGroup.Item>
                {selectPg?.landmark && (
                  <ListGroup.Item>
                    <small className="text-muted">
                      <strong>Landmark: </strong>{selectPg?.landmark}
                    </small>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
            <Card.Footer className="bg-light text-center" style={{ padding: "12px" }}>
              <Button 
                variant="primary" 
                size="sm" 
                style={{ 
                    borderRadius: "20px", 
                    padding: "8px 25px", 
                    fontWeight: "500",

                  }}
                  onClick={(e) => {
            e.stopPropagation();                            // prevent double nav
            navigate(`/rooms/${selectPg._id}`);
          }}
                >
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LocationMap;