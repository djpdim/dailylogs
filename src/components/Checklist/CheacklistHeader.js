/** @format */

import React from "react";
import ChecklistInput from "./ChecklistInput";

const ChecklistHeader = ({ formData, onInputChange }) => {
    return (
        <div className='form-row'>
            <label>
                Project Name: <span className='required-asterisk'>*</span>
                <ChecklistInput
                    name='projectName'
                    value={formData.projectName}
                    onChange={onInputChange}
                    type='select'
                    options={[
                        { value: "", text: "Select Project" },
                        { value: "424 Carroll", text: "424 Carroll" },
                        { value: "203 Newport", text: "203 Newport" },
                    ]}
                />
            </label>
            <label>
                Date: <span className='required-asterisk'>*</span>
                <ChecklistInput name='date' value={formData.date} type='text' readOnly />
            </label>
            <label>
                First Name: <span className='required-asterisk'>*</span>
                <ChecklistInput name='firstName' value={formData.firstName} onChange={onInputChange} type='text' />
            </label>
            <label>
                Last Name: <span className='required-asterisk'>*</span>
                <ChecklistInput name='lastName' value={formData.lastName} onChange={onInputChange} type='text' />
            </label>
        </div>
    );
};

export default ChecklistHeader;
