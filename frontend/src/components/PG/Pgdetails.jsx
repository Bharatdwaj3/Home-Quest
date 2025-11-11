/* --------------------------------------------------------------
   FILE: src/components/Pgdetails.jsx
   PURPOSE: PG detail page – now visually identical to TenantProfile
   -------------------------------------------------------------- */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  BiChevronLeft,
  BiMap,
  BiBed,
  BiBath,
  BiHome,
  BiRupee,
  BiCalendar,
  BiPackage,
  BiShield,
  BiCreditCard,
  BiInfoCircle,
  BiCheckCircle,
  BiStar,
  BiHeart,
  BiShare,
} from "react-icons/bi";

import ShortestPathPanel from "../functions/ShortestPath";
import "../../style/tenant-profile.scss";   

export default function PGDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPG] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // ────── FETCH PG ──────
  useEffect(() => {
    const fetchPG = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Please log in.");

        const res = await axios.get(`http://localhost:4001/api/pg/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPG(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPG();
  }, [id]);

  // ────── LOADING / ERROR ──────
  if (loading)
    return (
      <div className="profile-container d-flex align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error || !pg)
    return (
      <div className="profile-container">
        <Container style={{ maxWidth: "1000px" }} className="py-5">
          <Alert variant="danger" className="text-center">
            <strong>Oops!</strong> {error || "PG not found."}
          </Alert>
        </Container>
      </div>
    );

  // ────── RENDER ──────
  return (
    <div className="profile-container">   {/* SAME GRADIENT BG */}
      <Container style={{ maxWidth: "1000px" }} className="py-5">

        {/* BACK BUTTON */}
        <div className="mb-4">
          <Button
            variant="outline-secondary"
            size="sm"
            className="btn-edit d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <BiChevronLeft className="me-1" /> Back
          </Button>
        </div>

        <Row className="g-4">
          {/* ─── LEFT: IMAGE ─── */}
          <Col lg={5}>
            <div className="stat-card position-relative overflow-hidden" style={{ height: "380px" }}>
              {pg.imageUrl ? (
                <img
                  src={pg.imageUrl}
                  alt={pg.name}
                  className="w-100 h-100"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={() => window.open(pg.imageUrl, "_blank")}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x380/eeeeee/999999?text=No+Image";
                  }}
                />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                  <BiPackage size={68} className="mb-3" />
                  <p className="fw-semibold">No Image Available</p>
                </div>
              )}
            </div>
          </Col>

          {/* ─── RIGHT: DETAILS ─── */}
          <Col lg={7}>
            {/* Title + Actions */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h1 className="username mb-1">{pg.name || "Unnamed PG"}</h1>
                <p className="text-light d-flex align-items-center">
                  <BiMap className="me-1" />
                  {pg.address || "No address"}
                </p>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant={saved ? "danger" : "outline-danger"}
                  size="sm"
                  className="btn-edit"
                  onClick={() => setSaved(!saved)}
                >
                  <BiHeart className="me-1" />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline-secondary" size="sm" className="btn-edit">
                  <BiShare className="me-1" /> Share
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="d-flex align-items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <BiStar key={i} size={20} className={i < 4 ? "text-warning" : "text-muted"} />
              ))}
              <span className="ms-2 text-muted small">(4.2 • 128 reviews)</span>
            </div>

            {/* Price Card */}
            <div className="stat-card p-4 mb-4 position-relative overflow-hidden">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="text-success fw-bold mb-0 d-flex align-items-center">
                    <BiRupee />
                    {pg.price?.toLocaleString() || "N/A"}
                    <small className="text-muted ms-1">/month</small>
                  </h2>
                  <Badge bg="danger" className="mt-2 px-3 py-1">Limited Time Deal!</Badge>
                </div>
                <div className="text-end">
                  <p className="text-decoration-line-through text-muted mb-0">
                    ₹{Math.round((pg.price || 0) * 1.2).toLocaleString()}
                  </p>
                  <p className="text-success fw-bold">Save 20%</p>
                </div>
              </div>
            </div>

            {/* Room Info Grid */}
            <Row className="g-3 mb-4">
              {[
                { icon: BiBed, label: "Bedrooms", value: pg.rooms?.bedrooms ?? 0 },
                { icon: BiBath, label: "Bathrooms", value: pg.rooms?.washroom ?? 0 },
                { icon: BiHome, label: "Type", value: pg.type || "N/A" },
              ].map((item, i) => (
                <Col xs={4} key={i}>
                  <div className="stat-card text-center p-3">
                    <item.icon size={32} className="text-primary mb-2" />
                    <p className="mb-0 fw-bold">{item.value}</p>
                    <small className="text-muted">{item.label}</small>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Amenities */}
            <div className="stat-card p-4 mb-4">
              <h5 className="fw-bold d-flex align-items-center text-light mb-3">
                <BiCheckCircle className="text-success me-2" />
                Amenities
              </h5>
              <div className="d-flex flex-wrap gap-2">
                {pg.amenities?.length > 0 ? (
                  pg.amenities.map((a, i) => (
                    <Badge key={i} bg="success" className="px-3 py-2 rounded-pill">
                      {a}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted mb-0">No amenities listed.</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mb-4">
              <Button
                variant="success"
                className="btn-edit flex-grow-1"
                onClick={() => navigate("/map")}
              >
                <BiMap className="me-2" /> View on Map
              </Button>
              <Button variant="outline-primary" className="btn-edit flex-grow-1">
                <BiCreditCard className="me-2" /> Contact Owner
              </Button>
            </div>

            {/* Trust */}
            <p className="text-center text-success small">
              <BiShield className="me-1" />
              <strong>100% Secure • Verified Property</strong>
            </p>
          </Col>
        </Row>

        {/* ─── OFFERS ─── */}
        <Row className="mt-5 g-3">
          <Col md={6}>
            <div className="stat-card p-3 d-flex align-items-center">
              <strong className="me-2">Get ₹200 cashback</strong> with ICICI Card
              <small className="text-success ms-auto">Valid until 15 Nov 2025</small>
            </div>
          </Col>
          <Col md={6}>
            <div className="stat-card p-3">
              <strong>Partner Offer:</strong> Book 3 months, get 10% off
            </div>
          </Col>
        </Row>

        {/* ─── AVAILABILITY ─── */}
        <div className="stat-card p-4 mt-4 d-flex justify-content-between align-items-center">
          <p className="mb-0 d-flex align-items-center text-success fw-semibold">
            <BiCalendar className="me-2" />
            <strong>Available from:</strong> Today
          </p>
          <p className="mb-0 d-flex align-items-center text-success fw-semibold">
            <BiPackage className="me-2" />
            <strong>Move-in:</strong> Within 24 hours
          </p>
        </div>

        {/* ─── DESCRIPTION ─── */}
        <div className="stat-card p-4 mt-5">
          <h5 className="fw-bold d-flex align-items-center text-light mb-3">
            <BiInfoCircle className="me-2" />
            About this PG
          </h5>
          <p className="lead text-light mb-3">
            {pg.description ||
              `Welcome to ${pg.name || "this PG"} — a modern, fully-furnished accommodation in ${pg.city || "the city"}. Perfect for students and professionals.`}
          </p>
          <ul className="list-unstyled mb-0">
            {[
              "24/7 water and electricity",
              "High-speed WiFi included",
              "Housekeeping twice a week",
              "Security guard on duty",
              "Common area with TV",
            ].map((item, i) => (
              <li key={i} className="mb-2 d-flex align-items-center text-light">
                <BiCheckCircle className="text-success me-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-muted small mt-3">
            Added on: {new Date(pg.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* ─── SHORTEST PATH PANEL ─── */}
        <div className="mt-5">
          <ShortestPathPanel pg={pg} />
        </div>
      </Container>
    </div>
  );
}