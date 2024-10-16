import { Link, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserManage from './UserManage';
import DeleteAccount from './DeleteAccount';
import InfoSection from './InfoSection';

function DashboardHome() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="profile">User Profile</Link></li>
          <li><Link to="manage">User Manage</Link></li>
          <li><Link to="delete">Delete Account</Link></li>
          <li><Link to="info">Info Section</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="profile" element={<UserProfile />} />
        <Route path="manage" element={<UserManage />} />
        <Route path="delete" element={<DeleteAccount />} />
        <Route path="info" element={<InfoSection />} />
      </Routes>
    </div>
  );
}

export default DashboardHome;
