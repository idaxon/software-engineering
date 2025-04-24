import React, { useState } from 'react';

function LeaveRequestForm() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission including file upload
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... existing form fields ... */}
            
            <div>
                <label htmlFor="file-upload">Attach File:</label>
                <input 
                    type="file" 
                    id="file-upload" 
                    onChange={handleFileChange} 
                />
            </div>

            <button type="submit">Submit Leave Request</button>
        </form>
    );
}

export default LeaveRequestForm; 