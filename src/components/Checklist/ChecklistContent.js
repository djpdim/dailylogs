/** @format */

import React, { useState } from "react";
import ChecklistQuestion from "./ChecklistQuestions";

const ChecklistContent = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        firstName: "",
        lastName: "",
        date: new Date().toLocaleDateString(),
        // ... other fields
    });

    // Handle input changes and form submission logic here

    return (
        <div className='checklist-content'>
            <form>
                <ChecklistQuestion
                    question="Confirm elevators are left at the uppermost floor below 75'."
                    formData={formData}
                    setFormData={setFormData}
                />
            </form>
        </div>
    );
};

export default ChecklistContent;
