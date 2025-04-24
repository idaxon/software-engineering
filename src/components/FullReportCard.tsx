import React from 'react';
import { XCircle } from 'lucide-react';

interface FullReportCardProps {
  onClose: () => void;
  report: {
    semester: string;
    gpa: number;
    courses: { name: string; grade: string; assignments: { title: string; status: string; grade?: string }[] }[];
  };
}

const FullReportCard: React.FC<FullReportCardProps> = ({ onClose, report }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{report.semester} Report Card</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <p className="text-sm text-gray-500">GPA: {report.gpa.toFixed(2)}</p>
        <div className="space-y-4 mt-4">
          {report.courses.map((course, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{course.name}</h4>
              <p className="text-sm text-gray-500">Grade: {course.grade}</p>
              <h5 className="font-medium text-gray-700">Assignments:</h5>
              <ul className="list-disc list-inside">
                {course.assignments.map((assignment, idx) => (
                  <li key={idx} className="text-sm text-gray-500">
                    {assignment.title} - Status: {assignment.status} {assignment.grade && `(Grade: ${assignment.grade})`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullReportCard; 