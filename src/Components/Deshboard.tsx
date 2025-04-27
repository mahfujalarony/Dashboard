import React, { useState, useEffect } from 'react';
import Month from './Month';
import Year from './Year';
import Users from './Users';
import Sales from './Sales';
import Weather from './Weather';
import { FiMenu, FiX, FiHome, FiUsers, FiCalendar, FiDollarSign, FiCloud } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';

interface DashboardProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Dashboard: React.FC<DashboardProps > = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('month');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); 
  };


  const navItems = [
    { id: 'month', label: 'Month', icon: <FiHome className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <FiUsers className="w-5 h-5" /> },
    { id: 'year', label: 'Year', icon: <FiCalendar className="w-5 h-5" /> },
    { id: 'sales', label: 'Sales', icon: <FiDollarSign className="w-5 h-5" /> },
    { id: 'weather', label: 'Weather', icon: <FiCloud className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

     
      <aside
        className={`fixed lg:sticky top-0 left-0 w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          
          <div className="flex items-center justify-between mb-8 p-2">
            <h2 className="text-xl font-bold flex items-center">
              <span className="bg-blue-500 w-6 h-6 rounded-md flex items-center justify-center mr-2">
                <FiHome className="w-4 h-4" />
              </span>
              Dashboard
            </h2>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-white p-1 rounded-full"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

         
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

       
          <div className="mt-auto p-2">
            <button onClick={handleLogout} className="flex items-center w-full p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <IoMdLogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

  
      <div className="flex-1 flex flex-col min-h-screen">
       
        <header className="lg:hidden sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 p-1 rounded-md"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <div className="w-6 h-6"></div>
          </div>
        </header>

       
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
  
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {navItems.find((item) => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <button onClick={handleLogout} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <IoMdLogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>


          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {activeTab === 'month' && <Month />}
            {activeTab === 'year' && <Year />}
            {activeTab === 'users' && <Users />}
            {activeTab === 'sales' && <Sales />}
            {activeTab === 'weather' && <Weather />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;