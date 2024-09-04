/** @format */

import React from "react";

const questions = [
    { label: "1. Confirm elevators are left at the uppermost floor below 75'.", key: "elevatorsInspected75feet" },
    { label: "2. Confirm roof is free of Debris:", key: "roofFreeOfDebri" },
    { label: "3. Confirm material stored on roof is tied down properly:", key: "materialOnRoof" },
    { label: "4. Confirm all openings are properly protected:", key: "openingsProperlyProtected" },
    { label: "5. Confirm all windows are closed and locked:", key: "windowsClosedLocked" },
    { label: "6. Confirm all terrace doors are shut and locked:", key: "terraceDoorsShutLocked" },
    {
        label: "7. Confirm drains outside of the elevators on each floor are clean and free of debris:",
        key: "drainsElevatorsEachFloor",
    },
    { label: "8. Confirm elevator sump pumps are powered and functional:", key: "elevatorSumpPumps" },
    { label: "9. Confirm sewer ejecter pump is powered and functional:", key: "sewerEjecterPump" },
    { label: "10. Confirm all catch basins adjacent to the site are clear of any debris:", key: "basinsAdjacent" },
    { label: "11. Confirm leak detection system is powered and functioning:", key: "leakDetectionSystem" },
    { label: "12. Confirm Fire Alarm system is called back online with Central Station:", key: "fireAlarmSystem" },
];

const ChecklistQuestions = ({ formData, onCheckboxChange, onNoteChange }) => {
    return (
        <div className='form-questions'>
            {questions.map(({ label, key }) => (
                <div className='form-question' key={key}>
                    <label>
                        {label}
                        <div className='form-check'>
                            <input
                                type='radio'
                                name={key}
                                value='Yes'
                                checked={formData[key]?.answer === "Yes"}
                                onChange={e => onCheckboxChange(e, key)}
                            />
                            <span>Yes</span>
                            <input
                                type='radio'
                                name={key}
                                value='No'
                                checked={formData[key]?.answer === "No"}
                                onChange={e => onCheckboxChange(e, key)}
                            />
                            <span>No</span>
                        </div>
                    </label>
                    <label>
                        Notes:
                        <textarea name={key} value={formData[key]?.note || ""} onChange={e => onNoteChange(e, key)} />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ChecklistQuestions;
