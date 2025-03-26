/** @format */

import React from "react";
import ChecklistHeader from "./CheacklistHeader";
import ChecklistContent from "./ChecklistContent";
import ChecklistQuestions from "./ChecklistQuestions";

const ChecklistForm = ({ formData, onInputChange, onCheckboxChange, onNoteChange, onSubmit, errorMessage }) => {
    return (
        <form onSubmit={onSubmit}>
            <ChecklistHeader formData={formData} onInputChange={onInputChange} />
            <ChecklistContent formData={formData} onCheckboxChange={onCheckboxChange} />
            <ChecklistQuestions
                formData={formData}
                onCheckboxChange={onCheckboxChange}
                onNoteChange={onNoteChange}
                onInputChange={onInputChange}
            />
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <button type='submit'>Submit</button>
        </form>
    );
};

export default ChecklistForm;
