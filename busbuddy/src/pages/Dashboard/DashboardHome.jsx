import { Link, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserProfile from './UserProfile';
import UserManage from './UserManage';
import DeleteAccount from './DeleteAccount';
import InfoSection from './InfoSection';
import Prices from './Prices';      // New Prices component
import Timetable from './Timetable'; // New Timetable component
import RoutesSection from './RoutesSection';


const Dashboard = () => {

  const [activeTab, setActiveTab] = useState("profile"); // State for current active tab

  return (
    <div className="container mx-auto my-32 md:flex">
      <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
        <li>
          <Link to="profile" 
            className="inline-flex items-center px-4 py-3 text-white bg-orange-600 rounded-lg active w-full" aria-current="page"
            onClick={() => setActiveTab("profile")} // Add click handler here
          >
            <svg 
              className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            Profile
          </Link>
        </li>
        <li>
          <Link to="manage" 
            className={`${activeTab === "manage" ? "inline-flex items-center px-4 py-3 text-white bg-orange-600 rounded-lg active w-full" : "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"}`}
            onClick={() => setActiveTab("manage")}
          >
            <svg
              className={`${activeTab === "manage" ? "w-4 h-4 me-2 text-white" : "w-4 h-4 me-2 text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Manage
          </Link>
        </li>
        <li>
          <Link to="delete" 
            className={`${activeTab === "delete" ? "inline-flex items-center px-4 py-3 text-white bg-orange-600 rounded-lg active w-full" : "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"}`}
            onClick={() => setActiveTab("delete")}
          >
            <svg 
              className={`${activeTab === "delete" ? "w-4 h-4 me-2 text-white" : "w-4 h-4 me-2 text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"
              >
              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
            </svg>
            Delete
          </Link>
        </li>
        <li>
          <Link to="info" 
            className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"
            onClick={() => setActiveTab("info")}
          >
            <svg 
              className={`${activeTab === "info" ? "w-4 h-4 me-2 text-white" : "w-4 h-4 me-2 text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"
            >
              <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z"/>
              <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h3a4.92 4.92 0 0 0 4.917-4.917V10a3 3 0 0 0-3-3Z"/>
            </svg>
            Info
          </Link>
        </li>
        <li>
          <Link to="prices" 
            className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"
            onClick={() => setActiveTab("prices")}
          >
            <svg 
              className={`${activeTab === "prices" ? "w-4 h-4 me-2 text-white" : "w-4 h-4 me-2 text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"
            >
              <path d="M7 7h10M7 12h10M7 17h10"/>
            </svg>
            Prices
          </Link>
        </li>
        <li>
          <Link to="timetable" 
            className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"
            onClick={() => setActiveTab("timetable")}
          >
            <svg 
              className={`${activeTab === "timetable" ? "w-4 h-4 me-2 text-white" : "w-4 h-4 me-2 text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"
            >
              <path d="M5 12h14M12 5v14"/>
            </svg>
            Timetable
          </Link>
        </li>
        <li>
          <Link to="routes" 
            className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"
            onClick={() => setActiveTab("routes")}
          >
            <svg 
              className={`${activeTab === "routes" ? "w-4 h-4 me-2 text-white" : "w-4 h-4 me-2 text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"
            >
              <path d="M12 2l8 8-8 8-8-8 8-8z"/>
            </svg>
            Routes
          </Link>
        </li>
      </ul>

      <div className="w-full">
        <Routes>
          <Route path="profile"     element={<UserProfile />} />
          <Route path="manage"      element={<UserManage />} />
          <Route path="delete"      element={<DeleteAccount />} />
          <Route path="info"        element={<InfoSection />} />
          <Route path="prices"      element={<Prices />} />
          <Route path="timetable"   element={<Timetable />} />
          <Route path="routes"      element={<RoutesSection />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
