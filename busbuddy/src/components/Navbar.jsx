import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo image
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to check user info from localStorage

  // Check if user data exists in localStorage when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, [localStorage.getItem('userData')]);

  // Logout handler: clear user data and set isLoggedIn to false
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Remove user data from localStorage
    setIsLoggedIn(false); // Update the state to logged out
    navigate('/');
  };

  return (
    <nav className="relative bg-transparent shadow">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            {/* Use the imported logo image */}
            <img className="w-auto h-12" src={logo} alt="Logo" />
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              aria-label="toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:flex md:items-center">
          <div className="flex flex-col md:flex-row">
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-orange-500 md:mx-4 md:my-0" to="/">Home</Link>
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-orange-500 md:mx-4 md:my-0" to="/calculator">Calculator</Link>
            <Link className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-orange-500 md:mx-4 md:my-0" to="/timetable">Timetable</Link>
          </div>

          {/* Conditional rendering of Login/Logout buttons */}
          {isLoggedIn ? (
            <div className="flex md:ml-auto">
              <button 
                className="my-2 inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-orange-400 bg-white rounded-md border border-white hover:bg-transparent hover:border-white hover:text-white focus:bg-transparent focus:text-white md:mx-2 md:my-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex md:ml-auto">
              <Link 
                className="my-2 inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-orange-400 bg-white rounded-md border border-white hover:bg-transparent hover:border-white hover:text-white focus:bg-transparent focus:text-white md:mx-2 md:my-0"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
