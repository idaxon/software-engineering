import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [leaveAttachment, setLeaveAttachment] = useState<File | null>(null);
    const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleAssignmentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAssignmentFile(event.target.files[0]);
        }
    };

    const handleSubmitAssignment = async () => {
        if (!assignmentFile) {
            setSubmitMessage('Please select a file to submit');
            return;
        }

        setSubmitting(true);
        setSubmitMessage('Submitting...');

        try {
            // Create form data
            const formData = new FormData();
            formData.append('assignment', assignmentFile);

            // Replace with your actual API endpoint
            const response = await fetch('/api/submit-assignment', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSubmitMessage('Assignment submitted successfully!');
                setAssignmentFile(null);
            } else {
                setSubmitMessage('Failed to submit assignment. Please try again.');
            }
        } catch (error) {
            setSubmitMessage('Error submitting assignment. Please try again.');
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLeaveAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLeaveAttachment(event.target.files[0]);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Assignments</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="mb-4">
                    <input 
                        type="file" 
                        onChange={handleAssignmentFileChange}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={handleSubmitAssignment}
                        disabled={submitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                                 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Submitting...' : 'Submit Assignment'}
                    </button>
                    {submitMessage && (
                        <p className={`text-sm ${
                            submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {submitMessage}
                        </p>
                    )}
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Leave Request</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <input 
                    type="file" 
                    onChange={handleLeaveAttachmentChange} 
                    placeholder="Attach file for leave request"
                    className="block w-full text-sm text-gray-500 mb-4
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Submit Leave Request
                </button>
            </div>
        </div>
    );
};

export default StudentDashboard; 