/**
 * Function is used to render the admin dashboard (header, sidebar)
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Child component
import Sidebar from '../dashboard/Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user} = useAuth();

  function renderHeader(){
    return (
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span className="text-xl font-semibold ml-1">TalentApp</span>
              </Link>
            </div>
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline-block text-sm text-gray-600">Welcome, {user?.username}!</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium rounded-md transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                  </svg>
                  Logout
                </button>
              </div>
          </div>
        </header>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {renderHeader()}
      <div className="flex flex-1 bg-gray-100">
        <Sidebar excludeAdminsLink={true} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
