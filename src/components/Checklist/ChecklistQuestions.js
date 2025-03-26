/** @format */

import React from "react";

const ChecklistQuestions = ({ questions, formData, onCheckboxChange, onNoteChange, onInputChange }) => {
    return (
        <div className='form-questions'>
            {questions.map(({ label, key }, index) => (
                <div className='form-question' key={key}>
                    <label>
                        {label}
                        <div className='form-check'>
                            {key === "elevatorsOnSite" ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <input
                                        type='radio'
                                        name={key}
                                        value='OK'
                                        checked={formData[key]?.answer === "OK"}
                                        onChange={e => onCheckboxChange(e, key)}
                                    />
                                    <span>OK</span>
                                    <input
                                        type='radio'
                                        name={key}
                                        value='NG'
                                        checked={formData[key]?.answer === "NG"}
                                        onChange={e => onCheckboxChange(e, key)}
                                    />
                                    <span>NG</span>
                                    <input
                                        type='radio'
                                        name={key}
                                        value='N/A'
                                        checked={formData[key]?.answer === "N/A"}
                                        onChange={e => onCheckboxChange(e, key)}
                                    />
                                    <span>N/A</span>
                                </>
                            )}
                        </div>
                    </label>

                    <label>
                        Notes:
                        <textarea name={key} value={formData[key]?.note || ""} onChange={e => onNoteChange(e, key)} />
                    </label>

                    {/* ✅ Only show these two fields if Q13 is Yes */}
                    {key === "elevatorsOnSite" && formData[key]?.answer === "Yes" && (
                        <div className='conditional-fields'>
                            <label>
                                Number of Operators:
                                <input
                                    type='number'
                                    name='numberOfOperators'
                                    value={formData.numberOfOperators || ""}
                                    onChange={onInputChange}
                                />
                            </label>
                            <label>
                                Number of Hours per Operator:
                                <input
                                    type='number'
                                    name='hoursPerOperator'
                                    value={formData.hoursPerOperator || ""}
                                    onChange={onInputChange}
                                />
                            </label>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChecklistQuestions;
