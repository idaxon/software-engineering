import React, { useState } from 'react';

const SubmitPage = () => {
    const [attachment, setAttachment] = useState(null);
    const [faculty, setFaculty] = useState('');
    const [workType, setWorkType] = useState('individual');

    const handleAttachmentChange = (event) => {
        setAttachment(event.target.files[0]);
    };

    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
    };

    const handleWorkTypeChange = (event) => {
        setWorkType(event.target.value);
    };

    const handleSubmit = () => {
        // Handle the submission logic here
    };

    return (
        <div>
            <h1>Submit Your Work</h1>
            <input type="file" onChange={handleAttachmentChange} />
            <input type="text" value={faculty} onChange={handleFacultyChange} placeholder="Add Faculty" />
            <select value={workType} onChange={handleWorkTypeChange}>
                <option value="individual">Individual Work</option>
                <option value="group">Group Work</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default SubmitPage; 