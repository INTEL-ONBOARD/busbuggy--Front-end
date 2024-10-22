import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function UserManage() {

  const [viewUserList, setViewUserList] = useState([]); // Correct initialization as an array
  const [addUser, setAddUser] = useState({   // Initialize as an object for form fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [editUser, setEditUser] = useState({   // Added state to store form inputs
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [isAddUserModelOpen, setAddUserModalOpen] = useState(false); //state for add user modal
  const [isEditUserModelOpen, setEditUserModalOpen] = useState(false); //state for edit user modal

  const [selectedUserId, setSelectedUserId] = useState(null); // Fix selected user ID initialization

  useEffect(() => {
    loadUserList();  // Load user information on component mount
  }, []);  // Empty dependency array means this useEffect runs once after the initial render

  // Fetch user list from API
  const loadUserList = async () => {
    try {
      const result = await axios.get('http://localhost:8082/api/users');
      console.log(result.data);  // Log API response for debugging
      setViewUserList(result.data);  // Set state with the fetched data
    } catch (error) {
      console.error("Error fetching all user data:", error);
    }
  };

  // Add a new user
  const addUsers = async () => {
    try {
      const result = await axios.post(`http://localhost:8082/api/users`, addUser);  // Send addUser data in the request body
      console.log("created: " + result.data);  // Log API response for debugging
      setAddUserModalOpen(false);  // Close the modal after adding
      loadUserList();  // Reload user list to reflect the new user
      handleClearInfo();  // Clear the form after submission
    } catch (error) {
      console.error("Error creating user data:", error);
    }
  };

  // loading user data to edit modal's textboxes
  const loadEditUsers = async (userId) => {
    try {
      const result = await axios.get(`http://localhost:8082/api/users/${userId}`);  // Get user data by ID
      console.log(result.data);
      setEditUser(result.data);
    } catch (error) {
      console.error("Error loading user data for edit:", error);
    }
  };

  const editUsers = async (e) => {
    e.preventDefault();  // Prevent form from refreshing the page
    try {
      const userId = selectedUserId;
      console.log("selected userid for edit: " + userId);
      await axios.put(`http://localhost:8082/api/users/${userId}`, editUser);  // Update user info
      console.log('User updated successfully');
      setEditUserModalOpen(false);  // Close modal after saving
      loadUserList();  // Reload user list to reflect updated changes
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handler for add user info form changes
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });  // Update the state with new form input
  };

  // Handler for edit user info form changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });  // Update the edit user state with new form input
  };

  const handleClearInfo = () => {  // Handler to clear the add and edit user form
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
          {/* searchbar */}
          <div className="p-4 bg-transparent flex justify-center">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1 text-center">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            {/* Add User Button */}
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
          {/* Table Section */}
          <table className="text-sm text-left text-gray-500 rounded-lg w-2/3">
            <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">First Name</th>
                <th scope="col" className="px-6 py-3">Last Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Contact</th>
                <th scope="col" className="px-6 py-3">Bio</th>
                <th scope="col" className="px-6 py-3">Edit</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {viewUserList.map((user) => (
                <tr key={user.id} className="bg-white/[.6] border-b hover:bg-gray-50">
                  <td className="w-4 p-4"></td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.firstName}</th>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td> {/* Updated 'phone' */}
                  <td className="px-6 py-4">{user.bio}</td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                      onClick={() =>{ 
                        setEditUserModalOpen(true);
                        setSelectedUserId(user.id); //to select user by id to edit by api
                        }}></i>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"></i>
                    </div>
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
                value={addUser.firstName}  // Bind value to state
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter last name"
                value={addUser.lastName}  // Bind value to state
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter email"
                value={addUser.email}  // Bind value to state
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Contact</label>
              <input
                required
                type="text"
                name="phone"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter contact number"
                value={addUser.phone}  // Bind value to state
                onChange={handleAddInputChange}
              />
              <label className="block text-white mb-1">Bio</label>
              <input
                required
                type="text"
                name="bio"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter bio"
                value={addUser.bio}  // Bind value to state
                onChange={handleAddInputChange}
              />
              <div className="flex flex-row text-center m-6">
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
                  onClick={addUsers}
                >
                  Save
                </button>
                <button
                  className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => {
                    setAddUserModalOpen(false); 
                    handleClearInfo();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
                  onClick={handleClearInfo}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/*Edit user modal*/}
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
                placeholder="Enter contact"
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
                  onClick={editUsers}  // Save edited user changes
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
                  onClick={handleClearInfo}
                >
                  Clear All
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