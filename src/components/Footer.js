/** @format */

import React from "react";
import CompanyLogo from "../assets/megalg.svg";

const Footer = () => {
    return (
        <footer className='footer'>
            <img src={CompanyLogo} alt='Company Logo' className='footerlogo' />
            <p>&copy; 2024 Mega Contracting Group. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
