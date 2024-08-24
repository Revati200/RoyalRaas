import React from 'react'
import './Footer.css'
import logo_img from '../Assests/logo.png.png'
import instagram_icon from '../Assests/icons/instagram_icon.jpg'
import linkedin_icon from '../Assests/icons/linkedin_icon.jpg'
import github_icon from '../Assests/icons/github_icon.jpg'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo_img} alt=""/>
            <h3>CONNECT WITH ME</h3>
            <p>Feel free to connect with me</p>
            
        </div>
          <div className="footer-social-icon">
            <div className="footer-icons-container">
              <a href="https://www.instagram.com/revati.tatar/">
              <img src={instagram_icon} alt=""/>
               </a>
            </div>
            <div className="footer-icons-container">
            <a href="https://www.linkedin.com/in/revati-tatar2004">
              <img src={linkedin_icon} alt=""/>
              </a>
            </div>
            <div className="footer-icons-container">
              <a href="https://github.com/Revati200">
              <img src={github_icon} alt=""/>
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            <hr/>
            <p>Made by Revati Tatar @ 2024</p>
          </div>
    </div>
  )
}

export default Footer