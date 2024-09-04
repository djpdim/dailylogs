/** @format */

import React from "react";

const ChecklistInput = ({ name, value, onChange, type, options, readOnly }) => {
    if (type === "select") {
        return (
            <select name={name} value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        );
    }

    return <input type={type} name={name} value={value} onChange={onChange} readOnly={readOnly} />;
};

export default ChecklistInput;
