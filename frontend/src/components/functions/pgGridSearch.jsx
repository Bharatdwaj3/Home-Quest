/* --------------------------------------------------------------
   FILE: src/components/functions/pgGridSearch.jsx
   PURPOSE: PG search grid – now visually identical to TenantProfile
   -------------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  BiHome,
  BiMapPin,
  BiBed,
  BiBath,
  BiCalendar,
  BiCheckCircle,
  BiXCircle,
  BiSearch,
} from "react-icons/bi";

import "../../style/tenant-profile.scss"   // <-- SAME SCSS as TenantProfile

function PgGridSearch() {
  // ────── 1. STATE ──────
  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // ────── 2. FETCH ALL PGs ──────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in first.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4001/api/pg/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPgs(res.data);
        setFilteredPgs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "Failed to load PGs: " + (err.response?.data || err.message)
        );
        setLoading(false);
      });
  }, []);

  // ────── 3. SEARCH BY CITY ──────
  const handleSearch = () => {
    if (!searchCity.trim()) {
      setFilteredPgs(pgs);
      setError("");
      return;
    }
    const q = searchCity.trim().toLowerCase();
    const matches = pgs.filter((pg) =>
      pg.city?.toLowerCase().includes(q)
    );
    setFilteredPgs(matches);
    setError(matches.length === 0 ? `No PGs in "${searchCity}"` : "");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ────── 4. RENDER ──────
  return (
    <div className="profile-container">   {/* SAME OUTER GRADIENT */}
      <Container style={{ maxWidth: "1000px" }} className="py-4">

        {/* ─── SEARCH BAR ─── */}
        <Form className="mb-4">
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-secondary text-light">
              <BiSearch />
            </InputGroup.Text>
            <Form.Control
              className="bg-card text-dark border-secondary"
              placeholder="e.g., Delhi, Mumbai, Bangalore"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="outline-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
          </InputGroup>
        </Form>

        {/* ─── LOADING ─── */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-light">Loading PGs…</p>
          </div>
        )}

        {/* ─── ERROR ─── */}
        {error && !loading && (
          <Alert variant="danger" className="my-4">
            <BiXCircle className="me-2" />
            {error}
          </Alert>
        )}

        {/* ─── GRID ─── */}
        {!loading && !error && (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredPgs.length === 0 ? (
              <Col>
                <div className="empty-state">
                  <p className="text-light">No PGs found.</p>
                </div>
              </Col>
            ) : (
              filteredPgs.map((pg) => (
                <Col key={pg._id}>
                  {/* ─── GLASS CARD (re-using .stat-card) ─── */}
                  <div className="stat-card h-100 d-flex flex-column position-relative overflow-hidden">
                    {/* Image + Availability Badge */}
                    <div className="position-relative" style={{ height: "180px" }}>
                      <img
                        src={pg.imageUrl || "/image/pg_not_available.jpg"}
                        alt={pg.type}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      <Badge
                        bg={pg.avaliable ? "success" : "danger"}
                        className="position-absolute top-0 end-0 m-2"
                      >
                        {pg.avaliable ? <BiCheckCircle /> : <BiXCircle />}{" "}
                        {pg.avaliable ? "Available" : "Occupied"}
                      </Badge>
                    </div>

                    {/* Body */}
                    <div className="p-3 flex-grow-1">
                      <h5 className="mb-2 text-light">{pg.type}</h5>

                      <p className="small text-light mb-2">
                        <BiHome className="me-1" />
                        {pg.h_no}
                        <br />
                        <BiMapPin className="me-1" />
                        {pg.landmark}
                        <br />
                        <BiMapPin className="me-1" />
                        {pg.area}, <strong>{pg.city}</strong>
                      </p>

                      <p className="mb-2 text-light">
                        <BiBed className="me-1" />
                        Bedrooms: {pg.rooms?.bedrooms ?? "-"}
                        <br />
                        <BiBath className="me-1" />
                        Washrooms: {pg.rooms?.washroom ?? "-"}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="p-3 mt-auto d-flex gap-2 justify-content-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-edit"
                      >
                        <BiCalendar className="me-1" />
                        Details
                      </Button>
                      <Button variant="primary" size="sm" className="btn-edit">
                        Contact
                      </Button>
                    </div>

                    {/* Footer Date */}
                    <div className="px-3 pb-2 text-light small">
                      <BiCalendar className="me-1" />
                      Added: {new Date(pg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default PgGridSearch;