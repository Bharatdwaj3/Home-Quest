import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Slider = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
           <img
            className="img-fluid d-block w-100"
            style={{ objectFit: 'cover', height: '500px' }} 
            src="/interior_!.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
           <img
            className="img-fluid d-block w-100"
            style={{ objectFit: 'cover', height: '500px' }} 
            src="/interior_2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
             </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
           <img
            className="img-fluid d-block w-100"
            style={{ objectFit: 'cover', height: '500px' }} 
            src="/interior_3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
         
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slider;
