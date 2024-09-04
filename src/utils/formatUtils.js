/** @format */

// /** @format */

// /**
//  * Capitalizes the first letter and letters following a period and space.
//  * @param {string} value - The string to format.
//  * @returns {string} - The formatted string.
//  */
// export const capitalizeNotes = value => {
//     return value.replace(/(?:^|\. )\w/g, char => char.toUpperCase());
// };

// /**
//  * Generates a full name from first and last name.
//  * @param {string} firstName - The first name.
//  * @param {string} lastName - The last name.
//  * @returns {string} - The full name.
//  */
// export const generateFullName = (firstName, lastName) => {
//     return `${firstName} ${lastName}`;
// };

// /**
//  * Generates an email address from first name and last name.
//  * @param {string} firstName - The first name.
//  * @param {string} lastName - The last name.
//  * @returns {string} - The generated email address.
//  */
// export const generateEmail = (firstName, lastName) => {
//     return `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@megagroup.nyc`;
// };

// /**
//  * Prepares checklist data for email.
//  * @param {object} formData - The form data.
//  * @returns {string} - The formatted checklist data.
//  */
// export const prepareChecklistData = formData => {
//     const questionLabels = {
//         elevatorsInspected75feet: "Confirm elevators are left at the uppermost floor below 75'.",
//         roofFreeOfDebri: "Confirm roof is free of Debris:",
//         materialOnRoof: "Confirm material stored on roof is tied down properly:",
//         openingsProperlyProtected: "Confirm all openings are properly protected:",
//         windowsClosedLocked: "Confirm all windows are closed and locked:",
//         terraceDoorsShutLocked: "Confirm all terrace doors are shut and locked:",
//         drainsElevatorsEachFloor: "Confirm drains outside of the elevators on each floor are clean and free of debris:",
//         elevatorSumpPumps: "Confirm elevator sump pumps are powered and functional:",
//         sewerEjecterPump: "Confirm sewer ejecter pump is powered and functional:",
//         basinsAdjacent: "Confirm all catch basins adjacent to the site are clear of any debris:",
//         leakDetectionSystem: "Confirm leak detection system is powered and functioning:",
//         fireAlarmSystem: "Confirm Fire Alarm system is called back online with Central Station:",
//     };

//     return Object.entries(formData)
//         .filter(([key, value]) => typeof value === "object")
//         .map(([key, value]) => {
//             const questionLabel = questionLabels[key];
//             return `${questionLabel}\nAnswer: ${value.answer || "N/A"}${value.note ? `\nNote: ${value.note}` : ""}`;
//         })
//         .join("\n\n");
// };
