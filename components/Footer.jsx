import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Tech Store All rights reserverd</p>
      <p className="icons">
        <BsFacebook />
        <AiOutlineInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
