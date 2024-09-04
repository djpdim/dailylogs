/** @format */

import React from "react";
import Checklist from "./components/Checklist";
import Footer from "./components/Footer";
import Navigationbar from "./components/Navigatiobar";

const ChecklistForm = () => {
    return (
        <div>
            <Navigationbar />
            <Checklist />
            <Footer />
        </div>
    );
};

export default ChecklistForm;
