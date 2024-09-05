/** @format */

import emailjs from "emailjs-com";
import React, { useState } from "react";
import checklistData from "../data/checklistData.json"; // Import JSON data

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

    const requiredAsterisk = <span className='required-asterisk'>*</span>;
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [missingFields, setMissingFields] = useState([]);

    const handleCheckboxChange = (e, questionKey) => {
        const { value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [questionKey]: { ...prevData[questionKey], answer: value },
        }));
    };

    const handleNoteChange = (e, questionKey) => {
        const { value } = e.target;

        // Capitalize the first letter and letters following a period and space
        const formattedValue = value.replace(/(?:^|\. )\w/g, char => char.toUpperCase());

        setFormData(prevData => ({
            ...prevData,
            [questionKey]: { ...prevData[questionKey], note: formattedValue },
        }));
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        const formattedValue =
            name === "firstName" || name === "lastName" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: formattedValue,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Combine first name and last name
        const fullName = `${formData.firstName} ${formData.lastName}`;

        // Generate email address
        const userEmail = `${formData.firstName
            .charAt(0)
            .toLowerCase()}${formData.lastName.toLowerCase()}@megagroup.nyc`;

        // Prepare checklist data
        const checklistDataString = checklistData.questions
            .map((question, index) => {
                const value = formData[question.key];
                return `${index + 1}. ${question.label}\nAnswer: ${value.answer || "N/A"}${
                    value.note ? `\nNote: ${value.note}` : ""
                }`;
            })
            .join("\n\n");

        // Check for required fields
        const requiredFields = ["projectName", "firstName", "lastName"];
        const missing = requiredFields.filter(field => !formData[field]);

        // Check if all checklist questions have an answer
        const missingAnswers = checklistData.questions
            .filter(question => !formData[question.key].answer)
            .map(question => question.label);

        if (missing.length > 0 || missingAnswers.length > 0) {
            setMissingFields([...missingAnswers]);
            setErrorMessage("Please fill out all required fields.");
            return;
        }

        const emailContent = `
    Project Name: ${formData.projectName}
    Date: ${formData.date}
    Full Name: ${fullName}
    Email: ${userEmail}

    Building Inspection:
    ${checklistDataString}
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
                    checklist_data: checklistDataString,
                    message: emailContent,
                },
                process.env.REACT_APP_EMAILJS_USER_ID
            )
            .then(
                response => {
                    console.log("SUCCESS!", response.status, response.text);
                    setSuccessMessage(
                        `<div class="successmessage">Your checklist has been submitted successfully!</div>
                <a href="/" class="success-link">Home Page</a>`
                    );
                    setShowForm(false); // Hide the form after successful submission
                },
                error => {
                    console.log("FAILED...", error);
                    setErrorMessage(`<div class="errormessage">There was an error submitting the form. Please try again.</div>
                <a href="/" class="success-link">Home Page</a>`);
                }
            );
    };

    const inputStyle = fieldName => ({
        width: "100%",
        padding: "0.5rem",
        marginTop: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
        height: "54%",
        backgroundColor: formData[fieldName] === "" ? "" : "#fff",
    });

    return (
        <div className='Checklist'>
            {showForm ? (
                <form onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <label>
                            Project Name: {requiredAsterisk}
                            <select
                                name='projectName'
                                value={formData.projectName}
                                onChange={handleInputChange}
                                required
                                style={inputStyle("projectName")}
                            >
                                <option value=''>Select Project</option>
                                {checklistData.projects.map((project, index) => (
                                    <option key={index} value={project}>
                                        {project}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Date: {requiredAsterisk}
                            <input type='text' name='date' value={formData.date} readOnly style={inputStyle("date")} />
                        </label>
                    </div>
                    <div className='form-row'>
                        <label>
                            First Name: {requiredAsterisk}
                            <input
                                type='text'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                style={inputStyle("firstName")}
                            />
                        </label>
                        <label>
                            Last Name: {requiredAsterisk}
                            <input
                                type='text'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                style={inputStyle("lastName")}
                            />
                        </label>
                    </div>
                    <h2 className='inspection'>Building Inspection:</h2>
                    {checklistData.questions.map(({ label, key }, index) => (
                        <div className='question-box' key={index}>
                            <fieldset>
                                <legend>
                                    {index + 1}. {label} {requiredAsterisk}
                                </legend>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "8px",
                                    }}
                                >
                                    <label>
                                        OK
                                        <input
                                            type='radio'
                                            name={key}
                                            value='OK'
                                            checked={formData[key].answer === "OK"}
                                            onChange={e => handleCheckboxChange(e, key)}
                                        />
                                    </label>
                                    <label>
                                        NG
                                        <input
                                            type='radio'
                                            name={key}
                                            value='NG'
                                            checked={formData[key].answer === "NG"}
                                            onChange={e => handleCheckboxChange(e, key)}
                                        />
                                    </label>
                                    <label>
                                        N/A
                                        <input
                                            type='radio'
                                            name={key}
                                            value='N/A'
                                            checked={formData[key].answer === "N/A"}
                                            onChange={e => handleCheckboxChange(e, key)}
                                        />
                                    </label>
                                </div>
                                <textarea
                                    placeholder='Enter notes here...'
                                    name={`notes_${key}`}
                                    value={formData[key].note}
                                    onChange={e => handleNoteChange(e, key)}
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        marginTop: "0.5rem",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        boxSizing: "border-box",
                                        height: "54%",
                                    }}
                                />
                            </fieldset>
                        </div>
                    ))}
                    <button type='submit' className='submit-button'>
                        Submit Checklist
                    </button>
                </form>
            ) : (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: successMessage }} />
                </div>
            )}
            {errorMessage && <div className='errormessage'>{errorMessage}</div>}
        </div>
    );
};

export default Checklist;

// /** @format */

// import emailjs from "emailjs-com";
// import React, { useState } from "react";
// import checklistData from "../data/checklistData.json"; // Import JSON data

// const Checklist = () => {
//     const [formData, setFormData] = useState({
//         projectName: "",
//         firstName: "",
//         lastName: "",
//         date: new Date().toLocaleDateString(),
//         elevatorsInspected75feet: { answer: "", note: "" },
//         roofFreeOfDebri: { answer: "", note: "" },
//         materialOnRoof: { answer: "", note: "" },
//         openingsProperlyProtected: { answer: "", note: "" },
//         windowsClosedLocked: { answer: "", note: "" },
//         terraceDoorsShutLocked: { answer: "", note: "" },
//         drainsElevatorsEachFloor: { answer: "", note: "" },
//         elevatorSumpPumps: { answer: "", note: "" },
//         sewerEjecterPump: { answer: "", note: "" },
//         basinsAdjacent: { answer: "", note: "" },
//         leakDetectionSystem: { answer: "", note: "" },
//         fireAlarmSystem: { answer: "", note: "" },
//     });

//     const requiredAsterisk = <span className='required-asterisk'>*</span>;
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [showForm, setShowForm] = useState(true);

//     const handleCheckboxChange = (e, questionKey) => {
//         const { value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [questionKey]: { ...prevData[questionKey], answer: value },
//         }));
//     };

//     const handleNoteChange = (e, questionKey) => {
//         const { value } = e.target;

//         // Capitalize the first letter and letters following a period and space
//         const formattedValue = value.replace(/(?:^|\. )\w/g, char => char.toUpperCase());

//         setFormData(prevData => ({
//             ...prevData,
//             [questionKey]: { ...prevData[questionKey], note: formattedValue },
//         }));
//     };

//     const handleInputChange = e => {
//         const { name, value } = e.target;
//         const formattedValue =
//             name === "firstName" || name === "lastName" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

//         setFormData(prevData => ({
//             ...prevData,
//             [name]: formattedValue,
//         }));
//     };

//     const handleSubmit = e => {
//         e.preventDefault();

//         // Combine first name and last name
//         const fullName = `${formData.firstName} ${formData.lastName}`;

//         // Generate email address
//         const userEmail = `${formData.firstName
//             .charAt(0)
//             .toLowerCase()}${formData.lastName.toLowerCase()}@megagroup.nyc`;

//         // Prepare checklist data
//         const checklistDataString = checklistData.questions
//             .map((question, index) => {
//                 const value = formData[question.key];
//                 return `${index + 1}. ${question.label}\nAnswer: ${value.answer || "N/A"}${
//                     value.note ? `\nNote: ${value.note}` : ""
//                 }`;
//             })
//             .join("\n\n");

//         const emailContent = `
//     Project Name: ${formData.projectName}
//     Date: ${formData.date}
//     Full Name: ${fullName}
//     Email: ${userEmail}

//     Building Inspection:
//     ${checklistDataString}
//     `;

//         // Send email using EmailJS
//         emailjs
//             .send(
//                 process.env.REACT_APP_EMAILJS_SERVICE_ID,
//                 process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
//                 {
//                     project_name: formData.projectName,
//                     date: formData.date,
//                     full_name: fullName,
//                     useremail: userEmail,
//                     checklist_data: checklistDataString,
//                     message: emailContent,
//                 },
//                 process.env.REACT_APP_EMAILJS_USER_ID
//             )
//             .then(
//                 response => {
//                     console.log("SUCCESS!", response.status, response.text);
//                     setSuccessMessage(
//                         `<div class="successmessage">Your checklist has been submitted successfully!</div>
//                 <a href="/" class="success-link">Home Page</a>`
//                     );
//                     setShowForm(false); // Hide the form after successful submission
//                 },
//                 error => {
//                     console.log("FAILED...", error);
//                     setErrorMessage(`<div class="errormessage">There was an error submitting the form. Please try again.</div>
//                 <a href="/" class="success-link">Home Page</a>`);
//                 }
//             );
//     };

//     const inputStyle = fieldName => ({
//         width: "100%",
//         padding: "0.5rem",
//         marginTop: "0.5rem",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         boxSizing: "border-box",
//         height: "54%",
//         backgroundColor: formData[fieldName] === "" ? "" : "#fff",
//     });

//     return (
//         <div className='Checklist'>
//             {showForm ? (
//                 <form onSubmit={handleSubmit}>
//                     <div className='form-row'>
//                         <label>
//                             Project Name: {requiredAsterisk}
//                             <select
//                                 name='projectName'
//                                 value={formData.projectName}
//                                 onChange={handleInputChange}
//                                 required
//                                 style={inputStyle("projectName")}
//                             >
//                                 <option value=''>Select Project</option>
//                                 {checklistData.projects.map((project, index) => (
//                                     <option key={index} value={project}>
//                                         {project}
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>
//                         <label>
//                             Date: {requiredAsterisk}
//                             <input type='text' name='date' value={formData.date} readOnly style={inputStyle("date")} />
//                         </label>
//                     </div>
//                     <div className='form-row'>
//                         <label>
//                             First Name: {requiredAsterisk}
//                             <input
//                                 type='text'
//                                 name='firstName'
//                                 value={formData.firstName}
//                                 onChange={handleInputChange}
//                                 required
//                                 style={inputStyle("firstName")}
//                             />
//                         </label>
//                         <label>
//                             Last Name: {requiredAsterisk}
//                             <input
//                                 type='text'
//                                 name='lastName'
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 required
//                                 style={inputStyle("lastName")}
//                             />
//                         </label>
//                     </div>
//                     <h2 className='inspection'>Building Inspection:</h2>
//                     {checklistData.questions.map(({ label, key }, index) => (
//                         <div className='question-box' key={index}>
//                             <fieldset>
//                                 <legend>
//                                     {index + 1}. {label} {requiredAsterisk}
//                                 </legend>
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         alignItems: "center",
//                                         marginTop: "8px",
//                                     }}
//                                 >
//                                     <label>
//                                         OK
//                                         <input
//                                             type='radio'
//                                             name={key}
//                                             value='OK'
//                                             checked={formData[key].answer === "OK"}
//                                             onChange={e => handleCheckboxChange(e, key)}
//                                         />
//                                     </label>
//                                     <label>
//                                         NG
//                                         <input
//                                             type='radio'
//                                             name={key}
//                                             value='NG'
//                                             checked={formData[key].answer === "NG"}
//                                             onChange={e => handleCheckboxChange(e, key)}
//                                         />
//                                     </label>
//                                     <label>
//                                         N/A
//                                         <input
//                                             type='radio'
//                                             name={key}
//                                             value='N/A'
//                                             checked={formData[key].answer === "N/A"}
//                                             onChange={e => handleCheckboxChange(e, key)}
//                                         />
//                                     </label>
//                                 </div>
//                                 <textarea
//                                     placeholder='Enter notes here...'
//                                     name={`notes_${key}`}
//                                     value={formData[key].note}
//                                     onChange={e => handleNoteChange(e, key)}
//                                     style={{
//                                         width: "100%",
//                                         padding: "0.5rem",
//                                         marginTop: "0.5rem",
//                                         border: "1px solid #ccc",
//                                         borderRadius: "4px",
//                                         boxSizing: "border-box",
//                                         height: "54%",
//                                     }}
//                                 />
//                             </fieldset>
//                         </div>
//                     ))}
//                     <button type='submit' className='submit-button'>
//                         Submit Checklist
//                     </button>
//                 </form>
//             ) : (
//                 <div>
//                     <div dangerouslySetInnerHTML={{ __html: successMessage }} />
//                 </div>
//             )}
//             {errorMessage && <div className='error-message'>{errorMessage}</div>}
//         </div>
//     );
// };

// export default Checklist;

// /** @format */

// import emailjs from "emailjs-com";
// import React, { useState } from "react";

// const Checklist = () => {
//     const [formData, setFormData] = useState({
//         projectName: "",
//         firstName: "",
//         lastName: "",
//         date: new Date().toLocaleDateString(),
//         elevatorsInspected75feet: { answer: "", note: "" },
//         roofFreeOfDebri: { answer: "", note: "" },
//         materialOnRoof: { answer: "", note: "" },
//         openingsProperlyProtected: { answer: "", note: "" },
//         windowsClosedLocked: { answer: "", note: "" },
//         terraceDoorsShutLocked: { answer: "", note: "" },
//         drainsElevatorsEachFloor: { answer: "", note: "" },
//         elevatorSumpPumps: { answer: "", note: "" },
//         sewerEjecterPump: { answer: "", note: "" },
//         basinsAdjacent: { answer: "", note: "" },
//         leakDetectionSystem: { answer: "", note: "" },
//         fireAlarmSystem: { answer: "", note: "" },
//     });

//     const requiredAsterisk = <span className='required-asterisk'>*</span>;
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [showForm, setShowForm] = useState(true);

//     const handleCheckboxChange = (e, questionKey) => {
//         const { value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [questionKey]: { ...prevData[questionKey], answer: value },
//         }));
//     };

//     const handleNoteChange = (e, questionKey) => {
//         const { value } = e.target;

//         // Capitalize the first letter and letters following a period and space
//         const formattedValue = value.replace(/(?:^|\. )\w/g, char => char.toUpperCase());

//         setFormData(prevData => ({
//             ...prevData,
//             [questionKey]: { ...prevData[questionKey], note: formattedValue },
//         }));
//     };

//     const handleInputChange = e => {
//         const { name, value } = e.target;
//         const formattedValue =
//             name === "firstName" || name === "lastName" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

//         setFormData(prevData => ({
//             ...prevData,
//             [name]: formattedValue,
//         }));
//     };

//     const handleSubmit = e => {
//         e.preventDefault();

//         // Combine first name and last name
//         const fullName = `${formData.firstName} ${formData.lastName}`;

//         // Generate email address
//         const userEmail = `${formData.firstName
//             .charAt(0)
//             .toLowerCase()}${formData.lastName.toLowerCase()}@megagroup.nyc`;

//         // Prepare checklist data
//         const checklistData = Object.entries(formData)
//             .filter(([key, value]) => typeof value === "object")
//             .map(([key, value]) => {
//                 const questionLabel = {
//                     elevatorsInspected75feet: "Confirm elevators are left at the uppermost floor below 75'.",
//                     roofFreeOfDebri: "Confirm roof is free of Debris:",
//                     materialOnRoof: "Confirm material stored on roof is tied down properly:",
//                     openingsProperlyProtected: "Confirm all openings are properly protected:",
//                     windowsClosedLocked: "Confirm all windows are closed and locked:",
//                     terraceDoorsShutLocked: "Confirm all terrace doors are shut and locked:",
//                     drainsElevatorsEachFloor:
//                         "Confirm drains outside of the elevators on each floor are clean and free of debris:",
//                     elevatorSumpPumps: "Confirm elevator sump pumps are powered and functional:",
//                     sewerEjecterPump: "Confirm sewer ejecter pump is powered and functional:",
//                     basinsAdjacent: "Confirm all catch basins adjacent to the site are clear of any debris:",
//                     leakDetectionSystem: "Confirm leak detection system is powered and functioning:",
//                     fireAlarmSystem: "Confirm Fire Alarm system is called back online with Central Station:",
//                 }[key];

//                 return `${questionLabel}\nAnswer: ${value.answer || "N/A"}${value.note ? `\nNote: ${value.note}` : ""}`;
//             })
//             .join("\n\n");

//         const emailContent = `
//     Project Name: ${formData.projectName}
//     Date: ${formData.date}
//     Full Name: ${fullName}
//     Email: ${userEmail}

//     Building Inspection:
//     ${checklistData}
//     `;

//         // Send email using EmailJS
//         emailjs
//             .send(
//                 process.env.REACT_APP_EMAILJS_SERVICE_ID,
//                 process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
//                 {
//                     project_name: formData.projectName,
//                     date: formData.date,
//                     full_name: fullName,
//                     useremail: userEmail,
//                     checklist_data: checklistData,
//                     message: emailContent,
//                 },
//                 process.env.REACT_APP_EMAILJS_USER_ID
//             )
//             .then(
//                 response => {
//                     console.log("SUCCESS!", response.status, response.text);
//                     setSuccessMessage(
//                         `<div class="success-message">Your checklist has been submitted successfully!</div>
//                 <a href="/" class="success-link">Home Page</a>`
//                     );
//                     setShowForm(false); // Hide the form after successful submission
//                 },
//                 error => {
//                     console.log("FAILED...", error);
//                     setErrorMessage("There was an error submitting the form. Please try again.");
//                 }
//             );
//     };

//     const inputStyle = fieldName => ({
//         width: "100%",
//         padding: "0.5rem",
//         marginTop: "0.5rem",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         boxSizing: "border-box",
//         height: "54%",
//         backgroundColor: formData[fieldName] === "" ? "" : "#fff",
//     });

//     return (
//         <div className='Checklist'>
//             {showForm ? (
//                 <form onSubmit={handleSubmit}>
//                     <div className='form-row'>
//                         <label>
//                             Project Name: {requiredAsterisk}
//                             <select
//                                 name='projectName'
//                                 value={formData.projectName}
//                                 onChange={handleInputChange}
//                                 required
//                                 style={inputStyle("projectName")}
//                             >
//                                 <option value=''>Select Project</option>
//                                 <option value='203 Newport'>203 Newport</option>
//                                 <option value='50-25 Barnett Ave'>50-25 Barnett Ave</option>
//                                 <option value='424 Carroll Street'>424 Carroll Street</option>
//                                 <option value='2435 Pacific Street'>2435 Pacific Street</option>
//                                 <option value='2444 Tiebout Ave'>2444 Tiebout Ave</option>
//                                 <option value='540 DeGraw'>540 DeGraw</option>
//                                 <option value='778 Myrtle Avenue'>778 Myrtle Avenue</option>
//                                 <option value='GMDC (Newport)'>GMDC (Newport)</option>
//                                 <option value='Graces Place'>Graces Place</option>
//                                 <option value='Metropolitan Building'>Metropolitan Building</option>
//                                 <option value='Woodycrest'>Woodycrest</option>
//                             </select>
//                         </label>
//                         <label>
//                             Date: {requiredAsterisk}
//                             <input type='text' name='date' value={formData.date} readOnly style={inputStyle("date")} />
//                         </label>
//                     </div>
//                     <div className='form-row'>
//                         <label>
//                             First Name: {requiredAsterisk}
//                             <input
//                                 type='text'
//                                 name='firstName'
//                                 value={formData.firstName}
//                                 onChange={handleInputChange}
//                                 required
//                                 style={inputStyle("firstName")}
//                             />
//                         </label>
//                         <label>
//                             Last Name: {requiredAsterisk}
//                             <input
//                                 type='text'
//                                 name='lastName'
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 required
//                                 style={inputStyle("lastName")}
//                             />
//                         </label>
//                     </div>
//                     <h2 className='inspection'>Building Inspection:</h2>
//                     {[
//                         {
//                             label: "1. Confirm elevators are left at the uppermost floor below 75'.",
//                             key: "elevatorsInspected75feet",
//                         },
//                         { label: "2. Confirm roof is free of Debris:", key: "roofFreeOfDebri" },
//                         { label: "3. Confirm material stored on roof is tied down properly:", key: "materialOnRoof" },
//                         { label: "4. Confirm all openings are properly protected:", key: "openingsProperlyProtected" },
//                         { label: "5. Confirm all windows are closed and locked:", key: "windowsClosedLocked" },
//                         { label: "6. Confirm all terrace doors are shut and locked:", key: "terraceDoorsShutLocked" },
//                         {
//                             label: "7. Confirm drains outside of the elevators on each floor are clean and free of debris:",
//                             key: "drainsElevatorsEachFloor",
//                         },
//                         {
//                             label: "8. Confirm elevator sump pumps are powered and functional:",
//                             key: "elevatorSumpPumps",
//                         },
//                         { label: "9. Confirm sewer ejecter pump is powered and functional:", key: "sewerEjecterPump" },
//                         {
//                             label: "10. Confirm all catch basins adjacent to the site are clear of any debris:",
//                             key: "basinsAdjacent",
//                         },
//                         {
//                             label: "11. Confirm leak detection system is powered and functioning:",
//                             key: "leakDetectionSystem",
//                         },
//                         {
//                             label: "12. Confirm Fire Alarm system is called back online with Central Station:",
//                             key: "fireAlarmSystem",
//                         },
//                     ].map(({ label, key }, index) => (
//                         <div className='question-box' key={index}>
//                             <fieldset>
//                                 <legend>
//                                     {label} {requiredAsterisk}
//                                 </legend>
//                                 <div className='checkbox'>
//                                     <label>
//                                         <input
//                                             type='radio'
//                                             name={key}
//                                             value='OK'
//                                             checked={formData[key].answer === "OK"}
//                                             onChange={e => handleCheckboxChange(e, key)}
//                                             required
//                                         />
//                                         OK
//                                     </label>
//                                     <label>
//                                         <input
//                                             type='radio'
//                                             name={key}
//                                             value='NG'
//                                             checked={formData[key].answer === "NG"}
//                                             onChange={e => handleCheckboxChange(e, key)}
//                                             required
//                                         />
//                                         NG
//                                     </label>
//                                     <label>
//                                         <input
//                                             type='radio'
//                                             name={key}
//                                             value='N/A'
//                                             checked={formData[key].answer === "N/A"}
//                                             onChange={e => handleCheckboxChange(e, key)}
//                                             required
//                                         />
//                                         N/A
//                                     </label>
//                                 </div>
//                                 <input
//                                     type='text'
//                                     placeholder='Notes'
//                                     value={formData[key].note}
//                                     onChange={e => handleNoteChange(e, key)}
//                                     style={inputStyle("notes")}
//                                 />
//                             </fieldset>
//                         </div>
//                     ))}
//                     {errorMessage && <p className='error-message'>{errorMessage}</p>}
//                     <button type='submit'>Submit</button>
//                 </form>
//             ) : (
//                 <div className='successmessage' dangerouslySetInnerHTML={{ __html: successMessage }} />
//             )}
//         </div>
//     );
// };

// export default Checklist;
