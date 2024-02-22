import React from "react";
import "./FooterStyle.css"
import logo from '../pngs/logopng.png'

function Footer() {
        return (
          <footer id="footer">
      <div className="footer">
        <div className="logo">
          <img className="footerimg" src={logo} alt=""></img>
        </div>
      <div className="row">
      Company

      <ul>
      <li><a href="https://github.com/IIC2024">Contact us</a></li>
      <li><a href="https://github.com/IIC2024">Feedback</a></li>
      <li><a href="https://github.com/IIC2024">Vishnu Institute of Technology</a></li>
      <li><a href="https://github.com/IIC2024">Terms & Conditions</a></li>
      <li><a href="https://github.com/IIC2024">Career</a></li>
      </ul>
      </div>
      <div className="row">
          Explore
      <ul>
      <li><a href="https://github.com/IIC2024">Contact us</a></li>
      <li><a href="https://github.com/IIC2024">Feedback</a></li>
      <li><a href="https://github.com/IIC2024">Vishnu Institute of Technology</a></li>
      <li><a href="https://github.com/IIC2024">Terms & Conditions</a></li>
      <li><a href="https://github.com/IIC2024">Career</a></li>
      </ul>
      </div>

      <div className="abouthim" style={{fontSize:'1rem',marginTop:'70px',color:'grey',marginRight:'60px'}}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur facilis accusantium rerum, dolorem, accusamus incidunt nostrum quisquam eos vitae expedita minus soluta earum iusto repellat minima corrupti suscipit ipsum maxime.
      </div>
      </div>
      <div className="social-icons">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-google"></i>
      </div>
      </footer>
  );
}

export default Footer;