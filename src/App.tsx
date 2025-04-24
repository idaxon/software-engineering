import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';

export type UserRole = 'student' | 'faculty' | 'admin' | null;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const renderDashboard = () => {
    switch (userRole) {
      case 'student':
        return <StudentDashboard onLogout={handleLogout} />;
      case 'faculty':
        return <FacultyDashboard onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                University Dashboard
              </h2>
            </div>
            {renderDashboard()}
          </div>
        </div>
      ) : (
        renderDashboard()
      )}
    </div>
  );
}

export default App;