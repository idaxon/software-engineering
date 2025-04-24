import React, { useState } from 'react';

function SubmitPage() {
    const [attachment, setAttachment] = useState(null);
    const [faculty, setFaculty] = useState('');
    const [workType, setWorkType] = useState('individual'); // Default to individual work

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
            <input type="file" onChange={handleAttachmentChange} /> {/* Attachment Icon */}
            <input type="text" value={faculty} onChange={handleFacultyChange} placeholder="Add Faculty" />
            <div>
                <label>
                    <input type="radio" value="individual" checked={workType === 'individual'} onChange={handleWorkTypeChange} />
                    Individual Work
                </label>
                <label>
                    <input type="radio" value="group" checked={workType === 'group'} onChange={handleWorkTypeChange} />
                    Group Work
                </label>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default SubmitPage; 