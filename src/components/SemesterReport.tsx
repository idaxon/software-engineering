import React from 'react';
import { XCircle } from 'lucide-react';

interface SemesterReportProps {
  onClose: () => void;
  onViewReport: (report: any) => void;
  reports: { semester: string; gpa: number; courses: string[] }[];
}

const SemesterReport: React.FC<SemesterReportProps> = ({ onClose, onViewReport, reports }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Semester Reports</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="border rounded-lg p-4 cursor-pointer" onClick={() => onViewReport(report)}>
              <h4 className="font-medium text-gray-900">Semester {index + 1}</h4>
              <p className="text-sm text-gray-500">GPA: {report.gpa.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Courses: {report.courses.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterReport; 