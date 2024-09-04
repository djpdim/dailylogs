/** @format */

import React from "react";
import CompanyLogo from "../assets/megalg.svg";

const Navigationbar = () => {
    return (
        <nav className='App-header'>
            <img src={CompanyLogo} alt='Company Logo' className='logo' />
            <h1 className='text-xl font-bold'>Daily End of Day Checklist Form</h1>
        </nav>
    );
};

export default Navigationbar;
