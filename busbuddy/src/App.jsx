import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculator';
import Timetable from './pages/Timetable';
import DashboardHome from './pages/Dashboard/DashboardHome';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';

import './App.css'; // Ensure you import the CSS file

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Temporary authentication logic
  
  return (
    <Router>
      <div className="app-background">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/"                 element={<Home />} />
            <Route path="/login"            element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register"         element={<Register />} />
            <Route path="/calculator"       element={<Calculator />} />
            <Route path="/timetable"        element={<Timetable />} />
            <Route path="/dashboard/*"    element={<DashboardHome />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
