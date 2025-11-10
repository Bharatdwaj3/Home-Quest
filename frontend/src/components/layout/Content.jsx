import React from 'react'
import Stack from 'react-bootstrap/Stack';
import '../../style/content.scss'
import Card from 'react-bootstrap/Card';
const Content = () => {
  return (
    <>
        <div className='content-wrapper'>
          
          <div className='visual-categories-section mt-5'>
            <div className='category-row row align-items-center mb-5'>
              <div className='col-md-4'>
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1724788724644-65ce98d7ce14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="College Dorm"
                    className='img-fluid rounded-3'  
                  />
              </div>
              <div className='col-md-8'>
                <div className='category-content p-4'>
                  <h2 className='category-title fw-bold text-primary mb-3'>Near Campus</h2>
                  <p className='category-description fst-italicfs-5'>
                    Find affordable rooms close to universities and colleges. Perfect for students seeking study-friendly spaces with easy commute to campus.
                  </p>
                </div>
              </div>
            </div>
            <div className='category-row row align-items-center mb-5'>
              <div className='col-md-8 order-md-1 order-2'>
               
                  <div className='category-content p-4 text-end'>
                    <h2 className='category-title fw-bold text-success mb-3'>Corporate Hubs</h2>
                    <p className='category-description fst-italic fs-5'>
                       Discover convenient PGs near office locations with modern amenities. Ideal for professionals seeking work-life balance and shorter commutes.
                    </p>
                  </div>
                </div>
                <div className='col-md-4 order-md-2 order-1'>
                  <img 
                    src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Professional Worksapce"
                    className='img-fluid rounded-3'
                  />
                </div>
              </div>
            </div>
          </div>
              <br />
              <div className='feature-categories ms-4 mt-5 p-4'>
                <div className='row g-4'>
                  <div className='col-md-6 col-lg-3'>
                    <Card className="h-100 text-center p-3 shadow-sm">
                      <Card.Body>
                        <div className='feature-icon mb-3'>
                          <span style={{fontSize:'3rem'}}></span>
                        </div>
                        <Card.Title className="fw-bold fs-4">Budget Friendly</Card.Title>
                        <Card.Text className="fst-italic">
                          Filter your budget no suprises, no pressure to overspend
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-md-6 col-lg-3'>
                    <Card className="h-100 text-center p-3 shadow-sm">
                      <Card.Body>
                        <div className='feature-icon mb-3'>
                          <span style={{fontSize:'3rem'}}></span>
                        </div>
                        <Card.Title className="fw-bold fs-4">Privacy and Control</Card.Title>
                        <Card.Text className="fst-italic">
                           Your Search stays private explore safely at you own pace
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                   <div className='col-md-6 col-lg-3'>
                    <Card className="h-100 text-center p-3 shadow-sm">
                      <Card.Body>
                        <div className='feature-icon mb-3'>
                          <span style={{fontSize:'3rem'}}></span>
                        </div>
                        <Card.Title className="fw-bold fs-4">ental listings</Card.Title>
                        <Card.Text className="fst-italic">
                           Actual places that feel like home, not just rental listings
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                   <div className='col-md-6 col-lg-3'>
                    <Card className="h-100 text-center p-3 shadow-sm">
                      <Card.Body>
                        <div className='feature-icon mb-3'>
                          <span style={{fontSize:'3rem'}}></span>
                        </div>
                        <Card.Title className="fw-bold fs-4">No rush Process</Card.Title>
                        <Card.Text className="fst-italic">
                           Take your time, compare options, decide when you're ready
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
          
        
    </>
  )
}

export default Content