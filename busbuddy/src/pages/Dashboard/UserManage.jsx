import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function UserManage() {
  const [viewUserList, setViewUserList] = useState([]); // Correct initialization as an array
  const [addUser, setAddUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [editUser, setEditUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [isAddUserModelOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModelOpen, setEditUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    loadUserList();
  }, []);

  // Fetch user list from API
  const loadUserList = async () => {
    try {
      const result = await axios.get('http://localhost:8082/api/users');
      setViewUserList(result.data);
    } catch (error) {
      console.error('Error fetching all user data:', error);
    }
  };

  // Add a new user
  const addUsers = async () => {
    try {
      await axios.post('http://localhost:8082/api/users', addUser);
      setAddUserModalOpen(false);
      loadUserList();
      handleClearInfo();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Loading user data into edit modal's textboxes
  const loadEditUsers = async (userId) => {
    try {
      const result = await axios.get(`http://localhost:8082/api/users/${userId}`);
      setEditUser(result.data);
      setSelectedUserId(userId);
      setEditUserModalOpen(true);
    } catch (error) {
      console.error('Error loading user data for edit:', error);
    }
  };

  const editUsers = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/api/users/${selectedUserId}`, editUser);
      setEditUserModalOpen(false);
      loadUserList();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handler for add user info form changes
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  // Handler for edit user info form changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleClearInfo = () => {
    setAddUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: ''
    });
    setEditUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: ''
    });
  };

  return (
    <>
      <div className="bg-white/[.25] p-8 ml-12 rounded-lg shadow-sm">
        <div className="flex flex-row justify-around mb-10">
          <div className="p-4 bg-transparent flex justify-center">
            <div className="relative mt-1 text-center">
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              type="button"
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={() => setAddUserModalOpen(true)}
            >
              <i className="fi fi-rs-user-add mr-6"></i>Add User
            </button>
          </div>
        </div>

        <div className="flex gap-10 relative container mx-auto overflow-x-auto rounded-lg sm:rounded-lg justify-around">
          <table className="text-sm text-left text-gray-500 rounded-lg w-2/3">
            <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg">
              <tr>
                <th className="p-4"></th>
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Bio</th>
                <th className="px-6 py-3">Edit</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {viewUserList.map((user) => (
                <tr key={user.id} className="bg-white/[.6] border-b hover:bg-gray-50">
                  <td className="w-4 p-4"></td>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.firstName}
                  </th>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.bio}</td>
                  <td className="px-6 py-4 text-center">
                    <i
                      className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10"
                      onClick={() => loadEditUsers(user.id)}
                    ></i>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Modal */}
        <Modal
          isOpen={isAddUserModelOpen}
          onRequestClose={() => setAddUserModalOpen(false)}
          contentLabel="Add New User"
          className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
        >
          <h2 className="text-xl font-semibold m-6">Add New User</h2>
          <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
            <form>
              <label className="block text-white mb-1">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter first name"
                value={addUser.firstName}
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter last name"
                value={addUser.lastName}
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter email"
                value={addUser.email}
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Contact</label>
              <input
                required
                type="text"
                name="phone"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter contact number"
                value={addUser.phone}
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Bio</label>
              <input
                required
                type="text"
                name="bio"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter bio"
                value={addUser.bio}
                onChange={handleAddInputChange}
              />
              <div className="flex flex-row text-center m-6">
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
                  onClick={addUsers}
                >
                  Add User
                </button>
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
                  onClick={() => setAddUserModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={isEditUserModelOpen}
          onRequestClose={() => setEditUserModalOpen(false)}
          contentLabel="Edit User"
          className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
        >
          <h2 className="text-xl font-semibold m-6">Edit User</h2>
          <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
            <form>
              <label className="block text-white mb-1">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter first name"
                value={editUser.firstName}
                onChange={handleEditInputChange}
              />
              <label className="block text-white mb-1">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter last name"
                value={editUser.lastName}
                onChange={handleEditInputChange}
              />
              <label className="block text-white mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter email"
                value={editUser.email}
                onChange={handleEditInputChange}
              />
              <label className="block text-white mb-1">Contact</label>
              <input
                required
                type="text"
                name="phone"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter contact number"
                value={editUser.phone}
                onChange={handleEditInputChange}
              />
              <label className="block text-white mb-1">Bio</label>
              <input
                required
                type="text"
                name="bio"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter bio"
                value={editUser.bio}
                onChange={handleEditInputChange}
              />
              <div className="flex flex-row text-center m-6">
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
                  onClick={editUsers}
                >
                  Edit User
                </button>
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
                  onClick={() => setEditUserModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default UserManage;
