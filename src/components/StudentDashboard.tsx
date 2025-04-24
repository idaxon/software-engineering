import React, { useState } from 'react';
import { BookOpen, Calendar, GraduationCap, LogOut, Clock, FileText, Users, Bell, Upload, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import StudentTimetable from './StudentTimetable';
import SemesterReport from './SemesterReport';
import FullReportCard from './FullReportCard';

interface StudentDashboardProps {
  onLogout: () => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  deadline: string;
  time: string;
  room: string;
  professor: string;
  type: 'lecture' | 'lab' | 'tutorial';
  facultyName: string;
  assignments: {
    id: number;
    title: string;
    dueDate: string;
    status: string;
    grade?: string;
  }[];
}

interface LeaveRequest {
  id: number;
  course: string;
  date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  attachments?: File[];
}

interface ExtraClass {
  id: number;
  courseId: number;
  courseName: string;
  date: string;
  time: string;
  duration: number;
  room: string;
  reason: string;
  facultyName: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timetable' | 'assignments' | 'leaves'>('dashboard');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showSemesterReport, setShowSemesterReport] = useState(false);
  const [showFullReportCard, setShowFullReportCard] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [leaveAttachments, setLeaveAttachments] = useState<File[]>([]);

  const courses: Course[] = [
    { 
      id: 1, 
      name: 'Advanced Mathematics', 
      grade: 'A', 
      deadline: '2024-03-25',
      time: '09:00',
      room: 'Room 101',
      professor: 'Dr. Smith',
      facultyName: 'Dr. Smith',
      type: 'lecture',
      assignments: [
        {
          id: 1,
          title: 'Linear Algebra Quiz',
          dueDate: '2024-03-20',
          status: 'graded',
          grade: 'A'
        },
        {
          id: 2,
          title: 'Calculus Assignment',
          dueDate: '2024-03-25',
          status: 'pending'
        }
      ]
    },
    { 
      id: 2, 
      name: 'Computer Science', 
      grade: 'B+', 
      deadline: '2024-03-28',
      time: '11:00',
      room: 'Lab 203',
      professor: 'Prof. Johnson',
      facultyName: 'Prof. Johnson',
      type: 'lab',
      assignments: [
        {
          id: 3,
          title: 'Programming Project',
          dueDate: '2024-03-22',
          status: 'submitted'
        }
      ]
    },
    { 
      id: 3, 
      name: 'Physics', 
      grade: 'A-', 
      deadline: '2024-03-30',
      time: '14:00',
      room: 'Room 305',
      professor: 'Dr. Brown',
      facultyName: 'Dr. Brown',
      type: 'tutorial',
      assignments: [
        {
          id: 4,
          title: 'Mechanics Lab Report',
          dueDate: '2024-03-28',
          status: 'pending'
        }
      ]
    },
  ];

  const extraClasses: ExtraClass[] = [
    {
      id: 1,
      courseId: 1,
      courseName: 'Advanced Mathematics',
      date: '2024-03-25',
      time: '14:00',
      duration: 60,
      room: 'Room 201',
      reason: 'Additional practice for upcoming exam',
      facultyName: 'Dr. Smith'
    },
    {
      id: 2,
      courseId: 2,
      courseName: 'Computer Science',
      date: '2024-03-26',
      time: '15:00',
      duration: 90,
      room: 'Lab 204',
      reason: 'Project consultation',
      facultyName: 'Prof. Johnson'
    }
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      course: 'Advanced Mathematics',
      date: '2024-03-20',
      reason: 'Medical appointment',
      status: 'approved'
    },
    {
      id: 2,
      course: 'Physics',
      date: '2024-03-22',
      reason: 'Family event',
      status: 'pending'
    }
  ];

  const notifications = [
    { id: 1, message: 'New assignment posted in Advanced Mathematics', time: '2 hours ago' },
    { id: 2, message: 'Your leave request for Physics has been approved', time: '1 day ago' },
    { id: 3, message: 'Upcoming quiz in Computer Science', time: '2 days ago' },
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const calculateCGPA = () => {
    const gradePoints = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'F': 0.0
    };

    const totalPoints = courses.reduce((sum, course) => {
      return sum + (gradePoints[course.grade as keyof typeof gradePoints] || 0);
    }, 0);

    return (totalPoints / courses.length).toFixed(2);
  };

  const handleSubmitAssignment = (courseId: number, assignmentId: number) => {
    // Find the course and assignment
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const assignment = course.assignments.find(a => a.id === assignmentId);
      if (assignment) {
        // Update the assignment status to 'submitted'
        assignment.status = 'submitted';
        console.log(`Assignment ${assignment.title} for course ${course.name} submitted.`);
        // Optionally, you can also update the UI or show a success message here
      }
    }
  };

  const handleSubmitLeaveRequest = (courseId: number, date: string, reason: string) => {
    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append('courseId', courseId.toString());
    formData.append('date', date);
    formData.append('reason', reason);
    
    // Append each file to the FormData
    leaveAttachments.forEach((file, index) => {
      formData.append(`attachment${index}`, file);
    });

    // Here you would typically make an API call to submit the leave request with attachments
    console.log('Submitting leave request with attachments:', formData);
    
    // Reset the attachments state
    setLeaveAttachments([]);
    setShowLeaveModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLeaveAttachments(Array.from(e.target.files));
    }
  };

  // Sample semester reports data with updated semester naming
  const semesterReports = [
    { semester: 'Semester 1', gpa: 3.5, courses: ['Math', 'Physics', 'Chemistry'] },
    { semester: 'Semester 2', gpa: 3.8, courses: ['Computer Science', 'Biology', 'Statistics'] },
  ];

  // Sample detailed report data
  const detailedReports = [
    {
      semester: 'Semester 1',
      gpa: 3.5,
      courses: [
        { name: 'Math', grade: 'A', assignments: [{ title: 'Midterm', status: 'graded', grade: 'A' }, { title: 'Final', status: 'pending' }] },
        { name: 'Physics', grade: 'B+', assignments: [{ title: 'Lab Report', status: 'graded', grade: 'B+' }] },
        { name: 'Chemistry', grade: 'A-', assignments: [{ title: 'Project', status: 'graded', grade: 'A-' }] },
      ],
    },
    {
      semester: 'Semester 2',
      gpa: 3.8,
      courses: [
        { name: 'Computer Science', grade: 'A', assignments: [{ title: 'Project', status: 'graded', grade: 'A' }] },
        { name: 'Biology', grade: 'B+', assignments: [{ title: 'Lab Report', status: 'pending' }] },
        { name: 'Statistics', grade: 'A-', assignments: [{ title: 'Midterm', status: 'graded', grade: 'A-' }] },
      ],
    },
  ];

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowFullReportCard(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">Student Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 px-3 py-1 rounded-full cursor-pointer" onClick={() => setShowSemesterReport(true)}>
                <span className="text-sm font-medium text-indigo-800">
                  CGPA: {calculateCGPA()}
                </span>
              </div>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
          <div className="flex space-x-8 mt-4">
            <button
              className={`pb-4 ${
                activeTab === 'dashboard'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`pb-4 ${
                activeTab === 'assignments'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('assignments')}
            >
              Assignments
            </button>
            <button
              className={`pb-4 ${
                activeTab === 'timetable'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('timetable')}
            >
              Timetable
            </button>
            <button
              className={`pb-4 ${
                activeTab === 'leaves'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('leaves')}
            >
              Leave Requests
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Courses Section */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">My Courses</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-indigo-600">{course.name}</h4>
                        <p className="text-sm text-gray-500">Professor: {course.professor}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">Grade: {course.grade}</span>
                          <button 
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowAssignmentModal(true);
                            }}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            View Assignments
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deadlines Section */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    {courses.flatMap(course => 
                      course.assignments
                        .filter(assignment => assignment.status === 'pending')
                        .map(assignment => (
                          <div key={assignment.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <h4 className="font-medium text-indigo-600">{course.name}</h4>
                            <p className="text-sm text-gray-500">{assignment.title}</p>
                            <p className="text-sm text-gray-500">Due: {format(new Date(assignment.dueDate), 'PPP')}</p>
                            <div className="mt-2 flex justify-end">
                              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                Submit Work
                              </button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <Bell className="h-6 w-6 text-indigo-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">All Assignments</h3>
                <div className="space-y-6">
                  {courses.map(course => (
                    <div key={course.id} className="border rounded-lg p-4">
                      <h4 className="text-lg font-medium text-indigo-600 mb-3">{course.name}</h4>
                      <div className="space-y-4">
                        {course.assignments.map(assignment => (
                          <div key={assignment.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{assignment.title}</p>
                              <p className="text-sm text-gray-500">Due: {format(new Date(assignment.dueDate), 'PPP')}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              {assignment.status === 'graded' && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                  Grade: {assignment.grade}
                                </span>
                              )}
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  assignment.status === 'submitted'
                                    ? 'bg-blue-100 text-blue-800'
                                    : assignment.status === 'graded'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                              {assignment.status === 'pending' && (
                                <button
                                  onClick={() => handleSubmitAssignment(course.id, assignment.id)}
                                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <StudentTimetable courses={courses} extraClasses={extraClasses} />
        )}

        {activeTab === 'leaves' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Leave Requests</h3>
                  <button
                    onClick={() => setShowLeaveModal(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    New Leave Request
                  </button>
                </div>
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{request.course}</h4>
                        <p className="text-sm text-gray-500">
                          Date: {format(new Date(request.date), 'PPP')}
                        </p>
                        <p className="text-sm text-gray-500">Reason: {request.reason}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Semester Report Modal */}
      {showSemesterReport && (
        <SemesterReport 
          onClose={() => setShowSemesterReport(false)} 
          onViewReport={handleViewReport}
          reports={semesterReports} 
        />
      )}

      {/* Full Report Card Modal */}
      {showFullReportCard && selectedReport && (
        <FullReportCard 
          onClose={() => setShowFullReportCard(false)} 
          report={detailedReports.find(r => r.semester === selectedReport.semester)}
        />
      )}

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">New Leave Request</h3>
              <button
                onClick={() => {
                  setLeaveAttachments([]);
                  setShowLeaveModal(false);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmitLeaveRequest(
                Number(formData.get('courseId')),
                formData.get('date') as string,
                formData.get('reason') as string
              );
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select
                    name="courseId"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <textarea
                    name="reason"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attachments</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                  />
                  {leaveAttachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{leaveAttachments.length} file(s) selected</p>
                      <ul className="mt-1 text-sm text-gray-500">
                        {leaveAttachments.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setLeaveAttachments([]);
                      setShowLeaveModal(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignmentModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCourse.name} - Assignments
              </h3>
              <button
                onClick={() => {
                  setShowAssignmentModal(false);
                  setSelectedCourse(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedCourse.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                    <p className="text-sm text-gray-500">
                      Due: {format(new Date(assignment.dueDate), 'PPP')}
                    </p>
                    {assignment.grade && (
                      <p className="text-sm text-gray-500">Grade: {assignment.grade}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignment.status === 'graded'
                          ? 'bg-green-100 text-green-800'
                          : assignment.status === 'submitted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                    {assignment.status === 'pending' && (
                      <button
                        onClick={() => handleSubmitAssignment(selectedCourse.id, assignment.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;