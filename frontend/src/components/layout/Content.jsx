/* src/components/layout/Content.jsx */
import React from "react";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiHome, BiBriefcase, BiLock, BiHeart } from "react-icons/bi";
import "../../style/tenant-profile.scss";

const Content = () => {
  const categories = [
    {
      img: "https://plus.unsplash.com/premium_photo-1724788724644-65ce98d7ce14?q=80&w=1170&auto=format&fit=crop",
      title: "Near Campus",
      desc: "Find affordable rooms close to universities and colleges. Perfect for students seeking study-friendly spaces with easy commute to campus.",
      icon: BiHome,
      color: "text-primary",
    },
    {
      img: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?q=80&w=1380&auto=format&fit=crop",
      title: "Corporate Hubs",
      desc: "Discover convenient PGs near office locations with modern amenities. Ideal for professionals seeking work-life balance and shorter commutes.",
      icon: BiBriefcase,
      color: "text-success",
      reverse: true,
    },
  ];

  const features = [
    { icon: BiLock, title: "Budget Friendly", text: "Filter your budget — no surprises, no pressure to overspend." },
    { icon: BiHeart, title: "Privacy and Control", text: "Your search stays private — explore safely at your own pace." },
    { icon: BiHome, title: "Real Homes", text: "Actual places that feel like home, not just rental listings." },
    { icon: BiBriefcase, title: "No Rush Process", text: "Take your time, compare options, decide when you're ready." },
  ];

  return (
    <div className="container py-5">
      <div className="mb-5">
        {categories.map((cat, i) => (
          <Row key={i} className={`align-items-center mb-5 ${cat.reverse ? "flex-row-reverse" : ""}`}>
            <Col md={4}>
              <div className="stat-card overflow-hidden" style={{ height: "280px" }}>
                <img src={cat.img} alt={cat.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
              </div>
            </Col>
            <Col md={8}>
              <div className="stat-card p-4 h-100 d-flex flex-column justify-content-center">
                <h2 className={`category-title fw-bold ${cat.color} mb-3 d-flex align-items-center`}>
                  <cat.icon className="me-2" size={28} />
                  {cat.title}
                </h2>
                <p className="text-light fs-5">{cat.desc}</p>
              </div>
            </Col>
          </Row>
        ))}
      </div>

      <Row className="g-4">
        {features.map((f, i) => (
          <Col md={6} lg={3} key={i}>
            <Card className="stat-card h-100 text-center p-4">
              <Card.Body className="d-flex flex-column">
                <f.icon size={48} className="text-primary mb-3" />
                <Card.Title className="fw-bold fs-4 text-light">{f.title}</Card.Title>
                <Card.Text className="text-light flex-grow-1">{f.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Content;