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
  Card,
  OverlayTrigger,
  Tooltip,
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

export default function PGDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPG] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view PG details.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:4001/api/pg/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPG(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load PG details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPG();
  }, [id]);

  if (loading)
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner
          animation="grow"
          variant="primary"
          size="lg"
          style={{ width: "4rem", height: "4rem" }}
        />
      </Container>
    );

  if (error || !pg)
    return (
      <Container className="my-5 text-center">
        <Alert
          variant="danger"
          className="shadow-lg d-inline-block p-4"
          style={{
            borderRadius: "1rem",
            fontSize: "1.1rem",
            boxShadow: "0 8px 25px rgba(220, 53, 69, 0.2)",
          }}
        >
          <strong>Oops!</strong> {error || "PG not found."}
        </Alert>
      </Container>
    );

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <Container fluid className="px-0 position-relative">
        {/* Back Button */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            zIndex: 10,
          }}
        >
          <Button
            variant="dark"
            size="sm"
            className="rounded-pill shadow-sm"
            onClick={() => navigate(-1)}
            style={{
              padding: "0.5rem 1.2rem",
              fontWeight: "600",
              fontSize: "0.95rem",
            }}
          >
            <BiChevronLeft /> Back
          </Button>
        </div>

        {/* Main Content */}
        <Container className="py-5">
          <Row>
            {/* Left: Images Grid */}
          {/* Left: Images Grid */}
<Col lg={5}>
  <Row className="g-3">
    {pg.imageUrl ? (
      <Col xs={12}>
        <div
          style={{
            borderRadius: "1.2rem",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
          }}
        >
          <img
            src={pg.imageUrl}
            alt="PG Main"
            className="img-fluid"
            style={{
              height: "380px",
              width: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => window.open(pg.imageUrl, "_blank")}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x380/eeeeee/999999?text=Image+Not+Found";
            }}
          />
        </div>
      </Col>
    ) : (
      <Col>
        <div
          className="d-flex flex-column align-items-center justify-content-center bg-white rounded-3"
          style={{
            height: "380px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            border: "1px dashed #d0d0d0",
          }}
        >
          <BiPackage size={68} className="text-muted mb-3" />
          <p className="text-muted fw-semibold" style={{ fontSize: "1.2rem" }}>
            No Image Available
          </p>
        </div>
      </Col>
    )}
  </Row>
</Col>

            {/* Right: Details */}
            <Col lg={7}>
              {/* Title & Actions */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1
                    className="fw-bold text-dark mb-1"
                    style={{ fontSize: "2.1rem", lineHeight: "1.2" }}
                  >
                    {pg.name || "Unnamed PG"}
                  </h1>
                  <p
                    className="text-primary d-flex align-items-center"
                    style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
                  >
                    <BiMap className="me-1" />
                    {pg.address || "No address available"}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant={saved ? "danger" : "outline-danger"}
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setSaved(!saved)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    <BiHeart className="me-1" />
                    {saved ? "Saved" : "Save"}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-pill"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    <BiShare className="me-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="d-flex align-items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <BiStar
                    key={i}
                    size={20}
                    className={i < 4 ? "text-warning" : "text-muted"}
                  />
                ))}
                <span className="ms-2 text-muted" style={{ fontSize: "0.95rem" }}>
                  (4.2 • 128 reviews)
                </span>
              </div>

              {/* Price & Deal */}
              <div
                className="p-4 rounded-4 mb-4"
                style={{
                  background: "linear-gradient(135deg, #e6f7ed 0%, #d4f0e0 100%)",
                  boxShadow: "0 8px 24px rgba(40, 167, 69, 0.15)",
                  borderLeft: "6px solid #28a745",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2
                      className="text-success fw-bold mb-1"
                      style={{ fontSize: "2.4rem", lineHeight: "1" }}
                    >
                      <BiRupee />
                      {pg.price?.toLocaleString() || "N/A"}
                      <small
                        className="text-muted ms-1"
                        style={{ fontSize: "1.1rem", fontWeight: "normal" }}
                      >
                        /month
                      </small>
                    </h2>
                    <Badge
                      bg="danger"
                      className="px-3 py-2"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        animation: "pulse 2s infinite",
                      }}
                    >
                      Limited Time Deal!
                    </Badge>
                  </div>
                  <div className="text-end">
                    <p
                      className="text-decoration-line-through text-muted mb-0"
                      style={{ fontSize: "1.1rem" }}
                    >
                      ₹{Math.round((pg.price || 0) * 1.2).toLocaleString()}
                    </p>
                    <p className="text-success fw-bold" style={{ fontSize: "1.2rem" }}>
                      Save 20%
                    </p>
                  </div>
                </div>
              </div>

              {/* Room Info */}
              <Row className="g-3 mb-4">
                {[
                  { icon: BiBed, label: "Bedrooms", value: pg.rooms?.bedrooms || 0 },
                  { icon: BiBath, label: "Bathrooms", value: pg.rooms?.washroom || 0 },
                  { icon: BiHome, label: "Type", value: pg.type || "N/A" },
                ].map((item, i) => (
                  <Col xs={4} key={i}>
                    <div
                      className="text-center p-3 bg-white rounded-3"
                      style={{
                        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
                      }}
                    >
                      <item.icon size={32} className="text-primary mb-2" />
                      <p className="mb-0 fw-bold" style={{ fontSize: "1.2rem" }}>
                        {item.value}
                      </p>
                      <small className="text-muted">{item.label}</small>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Amenities */}
              <Card
                className="mb-4 border-0"
                style={{
                  boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
                  borderRadius: "1rem",
                }}
              >
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-dark mb-3 d-flex align-items-center">
                    <BiCheckCircle className="text-success me-2" />
                    Amenities
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {pg.amenities?.length > 0 ? (
                      pg.amenities.map((amenity, i) => (
                        <Badge
                          key={i}
                          bg="success"
                          className="px-3 py-2 rounded-pill"
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "500",
                          }}
                        >
                          {amenity}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted mb-0">No amenities listed.</p>
                    )}
                  </div>
                </Card.Body>
              </Card>

              {/* Action Buttons */}
              <div className="d-grid d-md-flex gap-3 mb-4">
                <Button
                  variant="success"
                  size="lg"
                  className="rounded-pill shadow-sm"
                  onClick={() => navigate("/map")}
                  style={{
                    padding: "0.8rem 2.2rem",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                  }}
                >
                  <BiMap className="me-2" />
                  View on Map
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="rounded-pill"
                  style={{
                    padding: "0.8rem 2.2rem",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                  }}
                >
                  <BiCreditCard className="me-2" />
                  Contact Owner
                </Button>
              </div>

              {/* Trust */}
              <div className="text-center text-success" style={{ fontSize: "0.95rem" }}>
                <BiShield className="me-1" />
                <strong>100% Secure • Verified Property</strong>
              </div>
            </Col>
          </Row>

          {/* Offers */}
          <Row className="mt-5 g-3">
            <Col md={6}>
              <Alert
                variant="light"
                className="border-success border-start border-4 p-3 rounded-3"
                style={{
                  backgroundColor: "#f0fdf4",
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.1)",
                }}
              >
                <strong>Get ₹200 cashback</strong> with ICICI Credit Card
                <br />
                <small className="text-success">Valid until 15 Nov 2025</small>
              </Alert>
            </Col>
            <Col md={6}>
              <Alert
                variant="light"
                className="border-warning border-start border-4 p-3 rounded-3"
                style={{
                  backgroundColor: "#fffbeb",
                  boxShadow: "0 4px 12px rgba(251, 191, 36, 0.15)",
                }}
              >
                <strong>Partner Offer:</strong> Book 3 months, get 10% off
              </Alert>
            </Col>
          </Row>

          {/* Availability */}
          <div
            className="mt-4 p-4 bg-white rounded-3 d-flex justify-content-between align-items-center"
            style={{
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <p className="mb-0 d-flex align-items-center text-success fw-semibold">
              <BiCalendar className="me-2" />
              <strong>Available from:</strong> Today
            </p>
            <p className="mb-0 d-flex align-items-center text-success fw-semibold">
              <BiPackage className="me-2" />
              <strong>Move-in:</strong> Within 24 hours
            </p>
          </div>

          {/* Description Section */}
          <Row className="mt-5">
            <Col>
              <Card
                className="border-0"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                }}
              >
                <Card.Header
                  className="text-white py-3"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontWeight: "600",
                  }}
                >
                  <h5 className="mb-0 d-flex align-items-center">
                    <BiInfoCircle className="me-2" />
                    About this PG
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <p
                    className="lead text-dark mb-4"
                    style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
                  >
                    {pg.description ||
                      `Welcome to ${pg.name || "this PG"} — a modern, fully-furnished accommodation located in the heart of ${pg.city || "the city"}. Perfect for students and working professionals.`}
                  </p>
                  <ul className="list-unstyled">
                    {[
                      "24/7 water and electricity",
                      "High-speed WiFi included",
                      "Housekeeping twice a week",
                      "Security guard on duty",
                      "Common area with TV",
                    ].map((item, i) => (
                      <li key={i} className="mb-3 d-flex align-items-center">
                        <BiCheckCircle className="text-success me-2 flex-shrink-0" />
                        <span style={{ fontSize: "1rem" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted small mt-4">
                    Added on: {new Date(pg.createdAt).toLocaleDateString()}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Pulse Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
          100% {
            transform: scale(1);
          }
        }
        [style*="animation: pulse"] {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}