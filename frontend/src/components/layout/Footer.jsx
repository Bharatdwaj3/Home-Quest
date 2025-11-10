import React from 'react'
import '../../style/footer.scss'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
  return (
    <>
       <div className='footer-section p-5 bottom-0'>
          <div className='footer-content'>
            <div className='row h-100 g-0'>
              <div className='col-4'>
                <div className='footer-column'>
                  <div className='footer-title'>
                    <h1 className='text-white fw-bold fs-4'>Home!!</h1>
                  </div>
                  <div className='footer-contact'>
                    <div className='social-icons d-flex mb-2'>
                      <InstagramIcon className="social-icon"/>
                      <TwitterIcon className="social-icon"/>
                      <FacebookIcon className="social-icon"/>
                    </div>
                    <ul className='list-unstyled text-white contact-list'>  
                      <li>Phone: 91+ 98753-04467</li>
                      <li>Email: LodgingGood@haus.com</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div className='footer-column'>
                  <div className='footer-title'>
                    <h1 className='text-white fw-bold fs-4'>About</h1>
                  </div>
                  <div className='footer-links'>
                    <ul className='list-unstyled text-white fst-italic link-list fs-6'>
                      <li>Services</li>
                      <li>Packages</li>
                      <li>Docs</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div className='footer-column'>
                  <div className='footer-title'>
                    <h1 className='text-white fw-bold fs-4'>Goals</h1>
                  </div>
                  <div className='footer-links'>
                    <ul className='list-unstyled text-white fst-italic link-list fs-6'>
                      <li>Legal</li>
                      <li>Community</li>
                      <li>Team</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div className='footer-column'>
                  <div className='footer-title'>
                    <h1 className='text-white fw-bold fs-4'>Users</h1>
                  </div>
                  <div className='footer-links'>
                    <ul className='list-unstyled text-white fst-italic link-list fs-6'>
                      <li>Developers</li>
                      <li>Freelancers</li>
                      <li>Enthusiasts</li>
                      <li>HealthFolk</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
             
          </div>
       </div>
    </>
  )
}

export default Footer