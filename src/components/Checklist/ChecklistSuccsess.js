/** @format */

import React from "react";

const ChecklistSuccess = ({ message }) => {
    return (
        <div className='successmessage'>
            <div dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    );
};

export default ChecklistSuccess;
