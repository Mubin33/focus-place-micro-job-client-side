import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div> 
      <div className="footer footer-center bg-base-300 text-base-content rounded p-10">
       
          <div className="grid grid-flow-col gap-4">
            <Link to="https://www.linkedin.com/in/md-yasin-arafat-mubin-33a913237/">
              <FaLinkedin size={30} />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=61566957151512">
              <FaFacebookSquare size={30} />
            </Link>
          </div> 
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Focus-Place
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
