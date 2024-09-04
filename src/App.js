/** @format */

// App.js
import React, { useEffect } from "react";
import "./App.css";
import Checklistform from "./Checklistform";

function App() {
    useEffect(() => {
        // scroll to top on refresh
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <div className='App Checklist'>
            <main>
                <Checklistform />
            </main>
        </div>
    );
}

export default App;
