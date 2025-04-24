import React, { useState } from 'react';
import { Users, BookOpen, BarChart, LogOut, Bell, Settings, School, FileText, Calendar, Cog, UserPlus, Download, Filter, ChevronDown, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'analytics' | 'settings'>('overview');
  const [showSystemModal, setShowSystemModal] = useState(false);

  const stats = {
    totalStudents: 1250,
    totalFaculty: 75,
    totalCourses: 48,
    activeUsers: 890,
    departments: 12,
    avgGPA: 3.45,
    graduationRate: 92,
    internationalStudents: 180,
    onlineUsers: 234,
    pendingRequests: 15,
    systemHealth: 98,
    storageUsed: 75
  };

  const recentActivities = [
    { id: 1, action: 'New course added', details: 'Advanced Machine Learning', time: '2 hours ago' },
    { id: 2, action: 'Faculty hired', details: 'Dr. Sarah Johnson - Computer Science', time: '1 day ago' },
    { id: 3, action: 'Department update', details: 'Engineering curriculum revised', time: '2 days ago' },
    { id: 4, action: 'System maintenance', details: 'Server upgrades completed', time: '3 days ago' }
  ];

  const departments = [
    { id: 1, name: 'Computer Science', students: 320, faculty: 18, courses: 24, budget: 450000, performance: 92 },
    { id: 2, name: 'Engineering', students: 450, faculty: 25, courses: 32, budget: 580000, performance: 88 },
    { id: 3, name: 'Business', students: 380, faculty: 20, courses: 28, budget: 420000, performance: 90 },
    { id: 4, name: 'Arts & Sciences', students: 290, faculty: 22, courses: 26, budget: 380000, performance: 87 }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Storage space reaching 75% capacity', time: '1 hour ago' },
    { id: 2, type: 'info', message: 'System backup scheduled for tonight', time: '3 hours ago' },
    { id: 3, type: 'error', message: 'Failed login attempts detected', time: '5 hours ago' }
  ];

  const performanceMetrics = {
    studentRetention: 88,
    facultySatisfaction: 85,
    courseCompletion: 93,
    employmentRate: 89
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <School className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-800">
                  System Health: {stats.systemHealth}%
                </span>
              </div>
              <button 
                onClick={() => setShowSystemModal(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-6 w-6" />
              </button>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {systemAlerts.length}
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
                activeSection === 'overview'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveSection('overview')}
            >
              Overview
            </button>
            <button
              className={`pb-4 ${
                activeSection === 'analytics'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveSection('analytics')}
            >
              Analytics
            </button>
            <button
              className={`pb-4 ${
                activeSection === 'settings'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveSection('settings')}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeSection === 'overview' && (
          <div className="px-4 py-6 sm:px-0">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 overflow-hidden shadow rounded-lg text-white">
                <div className="p-5">
                  <div className="flex items-center">
                    <Users className="h-6 w-6" />
                    <div className="ml-3">
                      <p className="text-sm font-medium opacity-75">Total Students</p>
                      <p className="text-2xl font-semibold">{stats.totalStudents}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 overflow-hidden shadow rounded-lg text-white">
                <div className="p-5">
                  <div className="flex items-center">
                    <Users className="h-6 w-6" />
                    <div className="ml-3">
                      <p className="text-sm font-medium opacity-75">Total Faculty</p>
                      <p className="text-2xl font-semibold">{stats.totalFaculty}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 overflow-hidden shadow rounded-lg text-white">
                <div className="p-5">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6" />
                    <div className="ml-3">
                      <p className="text-sm font-medium opacity-75">Total Courses</p>
                      <p className="text-2xl font-semibold">{stats.totalCourses}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow rounded-lg text-white">
                <div className="p-5">
                  <div className="flex items-center">
                    <BarChart className="h-6 w-6" />
                    <div className="ml-3">
                      <p className="text-sm font-medium opacity-75">Graduation Rate</p>
                      <p className="text-2xl font-semibold">{stats.graduationRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="mb-8 bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h3>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg flex items-center ${
                        alert.type === 'warning'
                          ? 'bg-yellow-50'
                          : alert.type === 'error'
                          ? 'bg-red-50'
                          : 'bg-blue-50'
                      }`}
                    >
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.type === 'warning'
                          ? 'text-yellow-400'
                          : alert.type === 'error'
                          ? 'text-red-400'
                          : 'text-blue-400'
                      }`} />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-sm text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Department Overview */}
              <div className="lg:col-span-2 bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Department Overview</h3>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded-md flex items-center">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                      </button>
                      <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded-md flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Students
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faculty
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Performance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {departments.map((dept) => (
                          <tr key={dept.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dept.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {dept.students}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {dept.faculty}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${dept.budget.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500">{dept.performance}%</span>
                                <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${dept.performance}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {recentActivities.map((activity, activityIdx) => (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {activityIdx !== recentActivities.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                                  <FileText className="h-4 w-4 text-white" />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {activity.action}{' '}
                                    <span className="font-medium text-gray-900">{activity.details}</span>
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  {activity.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'analytics' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Student Retention</p>
                      <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.studentRetention}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Faculty Satisfaction</p>
                      <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.facultySatisfaction}%</p>
                    </div>
                    <PieChart className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Course Completion</p>
                      <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.courseCompletion}%</p>
                    </div>
                    <BarChart className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Employment Rate</p>
                      <p className="text-2xl font-semibold text-gray-900">{performanceMetrics.employmentRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                        <UserPlus className="h-5 w-5 mr-2" />
                        Add New User
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        Manage Permissions
                      </button>
                    </div>
                  </div>
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Maintenance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Storage Usage</p>
                          <p className="text-sm text-gray-500">{stats.storageUsed}% of storage space used</p>
                        </div>
                        <button className="px-4 py-2 text-indigo-600 hover:text-indigo-800">
                          Manage Storage
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Backup Schedule</p>
                          <p className="text-sm text-gray-500">Next backup in 6 hours</p>
                        </div>
                        <button className="px-4 py-2 text-indigo-600 hover:text-indigo-800">
                          Configure Backup
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Enhanced security for all admin accounts</p>
                        </div>
                        <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600">
                          <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Session Timeout</p>
                          <p className="text-sm text-gray-500">Automatically logout after inactivity</p>
                        </div>
                        <select className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* System Settings Modal */}
      {showSystemModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
              <button
                onClick={() => setShowSystemModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900">Quick Actions</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                    <p className="font-medium text-gray-900">System Backup</p>
                    <p className="text-sm text-gray-500">Last backup: 2 days ago</p>
                  </button>
                  <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                    <p className="font-medium text-gray-900">Clear Cache</p>
                    <p className="text-sm text-gray-500">Improve system performance</p>
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">System Health</h4>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">CPU Usage</span>
                    <span className="text-sm font-medium text-gray-900">45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full w-5/12 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Memory Usage</span>
                    <span className="text-sm font-medium text-gray-900">60%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full w-7/12 bg-yellow-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;