/** @format */

import emailjs from "emailjs-com";
import React, { useState } from "react";
import { capitalizeNotes, generateEmail, generateFullName, prepareChecklistData } from "../../utils/formatUtils";
import ChecklistForm from "./ChecklistForm";
import ChecklistSuccess from "./ChecklistSuccess";

const Checklist = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        firstName: "",
        lastName: "",
        date: new Date().toLocaleDateString(),
        elevatorsInspected75feet: { answer: "", note: "" },
        roofFreeOfDebri: { answer: "", note: "" },
        materialOnRoof: { answer: "", note: "" },
        openingsProperlyProtected: { answer: "", note: "" },
        windowsClosedLocked: { answer: "", note: "" },
        terraceDoorsShutLocked: { answer: "", note: "" },
        drainsElevatorsEachFloor: { answer: "", note: "" },
        elevatorSumpPumps: { answer: "", note: "" },
        sewerEjecterPump: { answer: "", note: "" },
        basinsAdjacent: { answer: "", note: "" },
        leakDetectionSystem: { answer: "", note: "" },
        fireAlarmSystem: { answer: "", note: "" },
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(true);

    const handleInputChange = e => {
        const { name, value } = e.target;
        const formattedValue =
            name === "firstName" || name === "lastName" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: formattedValue,
        }));
    };

    const handleCheckboxChange = (e, questionKey) => {
        const { value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [questionKey]: { ...prevData[questionKey], answer: value },
        }));
    };

    const handleNoteChange = (e, questionKey) => {
        const { value } = e.target;
        const formattedValue = capitalizeNotes(value);

        setFormData(prevData => ({
            ...prevData,
            [questionKey]: { ...prevData[questionKey], note: formattedValue },
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const fullName = generateFullName(formData.firstName, formData.lastName);
        const userEmail = generateEmail(formData.firstName, formData.lastName);
        const checklistData = prepareChecklistData(formData);

        const emailContent = `
            Project Name: ${formData.projectName}
            Date: ${formData.date}
            Full Name: ${fullName}
            Email: ${userEmail}

            Building Inspection:
            ${checklistData}
        `;

        // Send email using EmailJS
        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                {
                    project_name: formData.projectName,
                    date: formData.date,
                    full_name: fullName,
                    useremail: userEmail,
                    checklist_data: checklistData,
                    message: emailContent,
                },
                process.env.REACT_APP_EMAILJS_USER_ID
            )
            .then(
                response => {
                    setSuccessMessage(
                        `<div class="success-message">Your checklist has been submitted successfully!</div>
                        <a href="/" class="success-link">Home Page</a>`
                    );
                    setShowForm(false);
                },
                error => {
                    setErrorMessage("There was an error submitting the form. Please try again.");
                }
            );
    };

    return (
        <div className='Checklist'>
            {showForm ? (
                <ChecklistForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onCheckboxChange={handleCheckboxChange}
                    onNoteChange={handleNoteChange}
                    onSubmit={handleSubmit}
                    errorMessage={errorMessage}
                />
            ) : (
                <ChecklistSuccess message={successMessage} />
            )}
        </div>
    );
};

export default Checklist;
