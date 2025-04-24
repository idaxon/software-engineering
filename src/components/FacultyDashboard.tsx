import React, { useState } from 'react';
import { BookOpen, Users, ClipboardList, LogOut, Bell, Calendar, CheckCircle, XCircle, Upload, FileText, Plus, Clock, List, GraduationCap, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface FacultyDashboardProps {
  onLogout: () => void;
}

interface Course {
  id: number;
  name: string;
  students: number;
  assignments: number;
  time: string;
  room: string;
  pendingReviews: number;
}

interface Assignment {
  id: number;
  courseId: number;
  title: string;
  dueDate: string;
  submissionsCount: number;
  gradedCount: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: number;
  grade: string;
}

interface LeaveRequest {
  id: number;
  studentName: string;
  course: string;
  date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  facultyResponse?: string;
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
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timetable' | 'assignments' | 'leaves'>('dashboard');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [showStudentListModal, setShowStudentListModal] = useState(false);
  const [showGradeSubmissionModal, setShowGradeSubmissionModal] = useState(false);
  const [showExtraClassModal, setShowExtraClassModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [extraClasses, setExtraClasses] = useState<ExtraClass[]>([
    {
      id: 1,
      courseId: 1,
      courseName: 'Advanced Mathematics',
      date: '2024-03-25',
      time: '14:00',
      duration: 60,
      room: 'Room 201',
      reason: 'Additional practice for upcoming exam'
    }
  ]);
  const [showLeaveActionModal, setShowLeaveActionModal] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | null>(null);
  const [leaveActionType, setLeaveActionType] = useState<'approve' | 'reject' | null>(null);

  const courses: Course[] = [
    { 
      id: 1, 
      name: 'Advanced Mathematics', 
      students: 25, 
      assignments: 3,
      time: '09:00 - 10:30',
      room: 'Room 101',
      pendingReviews: 8
    },
    { 
      id: 2, 
      name: 'Computer Science', 
      students: 30, 
      assignments: 4,
      time: '11:00 - 12:30',
      room: 'Lab 203',
      pendingReviews: 12
    },
    { 
      id: 3, 
      name: 'Physics', 
      students: 20, 
      assignments: 2,
      time: '14:00 - 15:30',
      room: 'Room 305',
      pendingReviews: 5
    },
  ];

  const assignments: Assignment[] = [
    {
      id: 1,
      courseId: 1,
      title: 'Linear Algebra Quiz',
      dueDate: '2024-03-20',
      submissionsCount: 20,
      gradedCount: 15
    },
    {
      id: 2,
      courseId: 1,
      title: 'Calculus Assignment',
      dueDate: '2024-03-25',
      submissionsCount: 18,
      gradedCount: 10
    },
    {
      id: 3,
      courseId: 2,
      title: 'Programming Project',
      dueDate: '2024-03-22',
      submissionsCount: 25,
      gradedCount: 20
    },
    {
      id: 4,
      courseId: 3,
      title: 'Mechanics Lab Report',
      dueDate: '2024-03-28',
      submissionsCount: 15,
      gradedCount: 10
    }
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      studentName: 'John Doe',
      course: 'Advanced Mathematics',
      date: '2024-03-20',
      reason: 'Medical appointment',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      course: 'Physics',
      date: '2024-03-22',
      reason: 'Family event',
      status: 'pending'
    }
  ];

  const notifications = [
    { id: 1, message: 'New leave request from John Doe', time: '1 hour ago' },
    { id: 2, message: 'Assignment submission deadline approaching', time: '2 hours ago' },
    { id: 3, message: 'Department meeting scheduled for tomorrow', time: '1 day ago' },
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', attendance: 85, grade: 'A-' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', attendance: 92, grade: 'A' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', attendance: 78, grade: 'B+' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', attendance: 88, grade: 'A-' },
  ];

  const handleLeaveAction = (requestId: number, action: 'approve' | 'reject', response: string) => {
    // Update the leave request status and add faculty response
    const updatedLeaveRequests = leaveRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: action,
          facultyResponse: response
        };
      }
      return request;
    });

    // Here you would typically make an API call to update the leave request status
    console.log(`Leave request ${requestId} ${action}ed with response: ${response}`);
    
    // Reset the modal state
    setShowLeaveActionModal(false);
    setSelectedLeaveRequest(null);
    setLeaveActionType(null);
  };

  const getTotalPendingReviews = () => {
    return courses.reduce((total, course) => total + course.pendingReviews, 0);
  };

  const handleCreateAssignment = () => {
    setShowCreateAssignmentModal(true);
    setShowAssignmentModal(false);
  };

  const handleViewStudentList = () => {
    setShowStudentListModal(true);
    setShowAssignmentModal(false);
  };

  const handleGradeSubmissions = () => {
    setShowGradeSubmissionModal(true);
    setShowAssignmentModal(false);
  };

  const handleScheduleExtraClass = () => {
    setShowExtraClassModal(true);
    setShowAssignmentModal(false);
  };

  const handleScheduleExtraClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newExtraClass: ExtraClass = {
      id: extraClasses.length + 1,
      courseId: selectedCourse?.id || 0,
      courseName: selectedCourse?.name || '',
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      duration: parseInt(formData.get('duration') as string),
      room: formData.get('room') as string,
      reason: formData.get('reason') as string
    };

    setExtraClasses([...extraClasses, newExtraClass]);
    // Here you would typically make an API call to notify students
    setShowExtraClassModal(false);
    setShowAssignmentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">Faculty Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-indigo-800">
                  {getTotalPendingReviews()} Pending Reviews
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
              {/* Courses Management */}
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
                        <p className="text-sm text-gray-500">Students: {course.students}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm text-gray-500">{course.assignments} Assignments</span>
                          <button 
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowAssignmentModal(true);
                            }}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            Manage Course
                          </button>
                        </div>
                        {course.pendingReviews > 0 && (
                          <div className="mt-2 flex items-center">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                              {course.pendingReviews} pending reviews
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student Management */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-indigo-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Student Management</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-indigo-600">{course.name}</h4>
                        <p className="text-sm text-gray-500">{course.students} Enrolled Students</p>
                        <div className="mt-2 flex justify-between items-center">
                          <button className="text-sm text-indigo-600 hover:text-indigo-800">
                            View Attendance
                          </button>
                          <button className="text-sm text-indigo-600 hover:text-indigo-800">
                            Manage Grades
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications */}
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
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Assignment Management</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Create New Assignment
                  </button>
                </div>
                <div className="space-y-6">
                  {courses.map(course => {
                    const courseAssignments = assignments.filter(a => a.courseId === course.id);
                    return (
                      <div key={course.id} className="border rounded-lg p-4">
                        <h4 className="text-lg font-medium text-indigo-600 mb-3">{course.name}</h4>
                        <div className="space-y-4">
                          {courseAssignments.map(assignment => (
                            <div key={assignment.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{assignment.title}</p>
                                <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500">
                                  <span className="font-medium">{assignment.gradedCount}</span>
                                  /{assignment.submissionsCount} graded
                                </div>
                                <button className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Review
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timetable' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Teaching Schedule</h3>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100">
                      <Calendar className="h-4 w-4 inline-block mr-2" />
                      Week View
                    </button>
                    <button className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100">
                      <Clock className="h-4 w-4 inline-block mr-2" />
                      Month View
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center font-medium text-gray-700 bg-indigo-50 py-3 rounded-lg shadow-sm">
                      {day}
                    </div>
                  ))}
                  {weekDays.map((day) => (
                    <div key={`schedule-${day}`} className="min-h-[300px] border rounded-lg p-3 bg-gray-50">
                      {courses.map((course) => (
                        <div
                          key={`${day}-${course.id}`}
                          className="mb-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-shadow"
                        >
                          <p className="font-medium text-indigo-600">{course.name}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.time}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {course.room}
                          </p>
                        </div>
                      ))}
                      {extraClasses
                        .filter(ec => {
                          const classDate = new Date(ec.date);
                          return weekDays.indexOf(day) === classDate.getDay() - 1;
                        })
                        .map(extraClass => (
                          <div
                            key={`extra-${extraClass.id}`}
                            className="mb-3 p-3 bg-yellow-50 rounded-lg shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-yellow-800">{extraClass.courseName}</p>
                                <p className="text-sm text-yellow-700 flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {extraClass.time} ({extraClass.duration} mins)
                                </p>
                                <p className="text-sm text-yellow-700 flex items-center">
                                  <BookOpen className="h-4 w-4 mr-1" />
                                  {extraClass.room}
                                </p>
                              </div>
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                Extra Class
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Leave Requests</h3>
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-gray-500" />
                            <h4 className="font-medium text-gray-900">{request.studentName}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-gray-500" />
                            <p className="text-sm text-gray-600">Course: {request.course}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-gray-500" />
                            <p className="text-sm text-gray-600">Date: {format(new Date(request.date), 'PPP')}</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                            <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                          </div>
                          {request.attachments && request.attachments.length > 0 && (
                            <div className="flex items-start space-x-2">
                              <Upload className="h-5 w-5 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-gray-600">Attachments:</p>
                                <ul className="mt-1 text-sm text-gray-500">
                                  {request.attachments.map((file, index) => (
                                    <li key={index} className="flex items-center space-x-1">
                                      <span>• {file.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                          {request.facultyResponse && (
                            <div className="flex items-start space-x-2">
                              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                              <p className="text-sm text-gray-600">Response: {request.facultyResponse}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : request.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </div>
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedLeaveRequest(request);
                                  setLeaveActionType('approve');
                                  setShowLeaveActionModal(true);
                                }}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="h-6 w-6" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedLeaveRequest(request);
                                  setLeaveActionType('reject');
                                  setShowLeaveActionModal(true);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Reject"
                              >
                                <XCircle className="h-6 w-6" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Course Management Modal */}
      {showAssignmentModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCourse.name} - Course Management
              </h3>
              <button
                onClick={() => setShowAssignmentModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Course Statistics</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      Total Students: {selectedCourse.students}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Assignments: {selectedCourse.assignments}
                    </p>
                    <p className="text-sm text-gray-500">
                      Pending Reviews: {selectedCourse.pendingReviews}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">Quick Actions</h4>
                  <div className="mt-2 space-y-2">
                    <button 
                      onClick={handleCreateAssignment}
                      className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </button>
                    <button 
                      onClick={handleViewStudentList}
                      className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded flex items-center"
                    >
                      <List className="h-4 w-4 mr-2" />
                      View Student List
                    </button>
                    <button 
                      onClick={handleGradeSubmissions}
                      className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded flex items-center"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Grade Submissions
                    </button>
                    <button 
                      onClick={handleScheduleExtraClass}
                      className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Extra Class
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Assignments</h4>
                <div className="space-y-3">
                  {assignments
                    .filter(a => a.courseId === selectedCourse.id)
                    .map(assignment => (
                      <div
                        key={assignment.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{assignment.title}</p>
                          <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {assignment.gradedCount}/{assignment.submissionsCount} graded
                          </span>
                          <button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded">
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateAssignmentModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Assignment</h3>
              <button
                onClick={() => {
                  setShowCreateAssignmentModal(false);
                  setShowAssignmentModal(true);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignment Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter assignment description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Points</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter total points"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateAssignmentModal(false);
                    setShowAssignmentModal(true);
                  }}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student List Modal */}
      {showStudentListModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Student List - {selectedCourse.name}</h3>
              <button
                onClick={() => {
                  setShowStudentListModal(false);
                  setShowAssignmentModal(true);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.attendance}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Grade Submissions Modal */}
      {showGradeSubmissionModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Grade Submissions - {selectedCourse.name}</h3>
              <button
                onClick={() => {
                  setShowGradeSubmissionModal(false);
                  setShowAssignmentModal(true);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-6">
              {assignments
                .filter(a => a.courseId === selectedCourse.id)
                .map(assignment => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {assignment.gradedCount}/{assignment.submissionsCount} graded
                      </div>
                    </div>
                    <div className="space-y-3">
                      {students.map(student => (
                        <div key={student.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">Submitted: Yes</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <input
                              type="number"
                              placeholder="Enter grade"
                              className="w-20 px-2 py-1 border rounded"
                            />
                            <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                              Save
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Extra Class Modal */}
      {showExtraClassModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Schedule Extra Class</h3>
              <button
                onClick={() => {
                  setShowExtraClassModal(false);
                  setShowAssignmentModal(true);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleScheduleExtraClassSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  name="date"
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  name="time"
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  name="duration"
                  type="number"
                  required
                  min="30"
                  step="30"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter duration in minutes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Room</label>
                <input
                  name="room"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter room number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  name="reason"
                  rows={3}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter reason for extra class"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowExtraClassModal(false);
                    setShowAssignmentModal(true);
                  }}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Schedule Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Action Modal */}
      {showLeaveActionModal && selectedLeaveRequest && leaveActionType && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {leaveActionType === 'approve' ? 'Approve' : 'Reject'} Leave Request
              </h3>
              <button
                onClick={() => {
                  setShowLeaveActionModal(false);
                  setSelectedLeaveRequest(null);
                  setLeaveActionType(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleLeaveAction(
                selectedLeaveRequest.id,
                leaveActionType,
                formData.get('response') as string
              );
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student</label>
                  <p className="mt-1 text-sm text-gray-500">{selectedLeaveRequest.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <p className="mt-1 text-sm text-gray-500">{selectedLeaveRequest.course}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="mt-1 text-sm text-gray-500">
                    {format(new Date(selectedLeaveRequest.date), 'PPP')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student's Reason</label>
                  <p className="mt-1 text-sm text-gray-500">{selectedLeaveRequest.reason}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Response
                  </label>
                  <textarea
                    name="response"
                    rows={3}
                    required
                    placeholder={`Enter your reason for ${leaveActionType}ing the leave request...`}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLeaveActionModal(false);
                      setSelectedLeaveRequest(null);
                      setLeaveActionType(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                      leaveActionType === 'approve'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {leaveActionType === 'approve' ? 'Approve' : 'Reject'} Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;