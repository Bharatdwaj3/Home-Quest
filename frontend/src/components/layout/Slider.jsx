
import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Slider = () => {
  return (
    <Carousel fade className="mb-5">
      {["interior_1.jpg", "interior_2.jpg", "interior_3.jpg"].map((img, i) => (
        <Carousel.Item key={i}>
          <div className="stat-card overflow-hidden" style={{ height: "500px" }}>
            <img
              className="d-block w-100 h-100"
              src={`/${img}`}
              alt={`Slide ${i + 1}`}
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption className="text-light">
              <h3 className="username">Find Your Perfect PG</h3>
              <p className="text-light">Modern, safe, and affordable stays near you.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;