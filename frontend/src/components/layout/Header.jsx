import React from 'react'
import '../../style/header.css'
const Header = () => {
  return (
    <>
       <div className='header-section p-5'>
        <div className='header-content'>
          <div className='title-section'>
            <h1 className='header-title'>PG Finder</h1>
          </div>
          <div className='description-section'>
            <p className='header-description'>
              Discover your ideal lodging with HomeQuest’s intuitive interface and powerful search features for a seamless rental experience
            </p>
          </div>
        </div>
       </div>
    </>
  )
}

export default Header