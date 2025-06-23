import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/EN_logo.png"; // Replace with Study Vault logo if available

const Footer = () => {
  return (
    <nav className="bg-[#121212] w-full flex justify-between items-center px-8 h-20">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/posts" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain rounded-full"
          />
          <p className="text-[#f5f5f5] text-[25px] font-semibold cursor-pointer hidden sm:block">
            Study Vault &nbsp;
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Footer;
