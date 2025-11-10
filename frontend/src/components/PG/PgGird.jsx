/* --------------------------------------------------------------
   FILE: src/components/PGs.jsx
   PURPOSE: Beginner-level PG catalogue
   WHAT YOU NEED:
     npm install react-bootstrap bootstrap react-icons axios
   -------------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import {
  BiHome,
  BiMapPin,
  BiBed,
  BiBath,
  BiCalendar,
  BiCheckCircle,
  BiXCircle,
} from "react-icons/bi";

function PgGrid() {
  // ----- 1. STATE (what the component remembers) -----
  const [pgs, setPgs] = useState([]);      // array of PG objects
  const [loading, setLoading] = useState(true); // show spinner?
  const [error, setError] = useState("");   // error message

  // ----- 2. FETCH DATA when component first loads -----
  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); // ADD THIS LINE

  if (!token) {
    setError("Please log in first.");
    setLoading(false);
    return;
  }

  axios
    .get("http://localhost:4001/api/pg/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log("PGs loaded:", res.data); // ADD THIS LINE
      setPgs(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Error:", err.response?.data || err.message);
      setError("Failed to load PGs. Try logging in again.");
      setLoading(false);
    });
}, []);

  // ----- 3. RENDER -----
  return (
    <Container fluid className="bg-light py-5">
      {/* ----- HEADER ----- */}
      <Container className="bg-primary text-white p-4 mb-4 rounded">
        <h1 className="display-5">
          <BiHome className="me-2" />
          PG Listings
        </h1>
        <p className="lead">Find a room that fits you!</p>
      </Container>

      {/* ----- LOADING ----- */}
      {loading && (
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading PGs...</p>
        </Container>
      )}

      {/* ----- ERROR ----- */}
      {error && !loading && (
        <Container className="my-4">
          <Alert variant="danger">
            <BiXCircle className="me-2" />
            {error}
          </Alert>
        </Container>
      )}

      {/* ----- NO DATA ----- */}
      {!loading && !error && pgs.length === 0 && (
        <Container className="text-center py-5">
          <p className="text-muted">No PGs found.</p>
        </Container>
      )}

      {/* ----- LIST OF PGs ----- */}
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {pgs.map((pg) => (
            <Col key={pg._id}>
              <Card className="h-100">
                {/* Image */}
                <Card.Img
                  variant="top"
                  src={pg.imageUrl || "/image/pg_not_available.jpg"}
                  alt="PG picture"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <Card.Body className="d-flex flex-column">
                  {/* Title + Availability */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title>{pg.type}</Card.Title>
                    <Badge bg={pg.avaliable ? "success" : "danger"}>
                      {pg.avaliable ? <BiCheckCircle /> : <BiXCircle />} {" "}
                      {pg.avaliable ? "Available" : "Occupied"}
                    </Badge>
                  </div>

                  {/* Address */}
                  <p className="small text-muted mb-2">
                    <BiHome className="me-1" />
                    {pg.h_no}
                    <br />
                    <BiMapPin className="me-1" />
                    {pg.landmark}
                    <br />
                    <BiMapPin className="me-1" />
                    {pg.area}, {pg.city}
                  </p>

                  {/* Rooms */}
                  <p className="mb-2">
                    <BiBed className="me-1" />
                    Bedrooms: {pg.rooms?.bedrooms ?? "-"}
                    <br />
                    <BiBath className="me-1" />
                    Washrooms: {pg.rooms?.washroom ?? "-"}
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button variant="outline-primary" size="sm">
                      <BiCalendar className="me-1" />
                      Details
                    </Button>
                    <Button variant="primary" size="sm">
                      Contact
                    </Button>
                  </div>
                </Card.Body>

                {/* Footer – dates */}
                <Card.Footer className="text-muted small">
                  <BiCalendar className="me-1" />
                  Added: {new Date(pg.createdAt).toLocaleDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default PgGrid;