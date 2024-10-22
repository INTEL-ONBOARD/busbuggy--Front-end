import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');  // For accessibility reasons

const UserProfile = () => {
  const [user, setUser] = useState({});  // Initialize the user state as an object
  const [profilePic, setProfilePic] = useState(null); // Profile picture state
  const [isProfilePicModalOpen, setProfilePicModalOpen] = useState(false); // Modal state for profile pic
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false); // Modal state for editing info

  // Fetch user data on component mount and when the edit modal closes
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));  // Parse user data from localStorage
    if (!isEditInfoModalOpen) {
      console.log("Reloading user info after closing modal...");
      loadUser(userData.id);  // Reload user info when modal closes
    }
  }, [isEditInfoModalOpen]);  // useEffect will now trigger when isEditInfoModalOpen changes

  const loadUser = async (userId) => {
    try {
      const result = await axios.get(`http://localhost:8082/api/users/${userId}`);
      console.log(result.data);  // Log API response for debugging
      setUser(result.data.data);  // Set user state with the fetched data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
    setProfilePicModalOpen(false); // Close the modal after uploading
  };

  // Handle input changes for user info form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle user data update (Edit user info)
  const handleEditUser = async (e) => {
    e.preventDefault();  // Prevent form from refreshing the page
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));  // Fetch user data from localStorage
      await axios.put(`http://localhost:8082/api/users/${userData.id}`, user);  // Update user info
      console.log('User updated successfully');
      setEditInfoModalOpen(false);  // Close modal after saving
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Clear user info fields
  const handleClearInfo = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: ''
    });
  };

  return (
    <div className="p-10 flex space-x-10">
      {/* Left Section: Profile Picture and Buttons */}
      <div className="flex flex-col items-center bg-white/[.35] p-6 shadow-md corner rounded-md">
        <img
          src={profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-full w-32 h-32 mb-4"
        />
        <h2 className="text-xl font-semibold">Mr. {user.firstName} {user.lastName}</h2>
        <p className="text-gray-500">{user.bio}</p>

        <button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
          onClick={() => setProfilePicModalOpen(true)}
        >
          Update Profile Picture
        </button>
        <button className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded">
          Remove Profile Picture
        </button>
      </div>

      {/* Right Section: User Information */}
      <div className="flex flex-col bg-white/[.35] p-6 shadow-md flex-1 rounded-md justify-between">
        <h2 className="text-lg font-bold">User Information</h2>
        <div className="mt-4">
          <p><strong>First Name: </strong>{user.firstName}</p>
          <p><strong>Last Name: </strong>{user.lastName}</p>
          <p><strong>Email Address: </strong>{user.email}</p>
          <p><strong>Phone: </strong>{user.phone}</p>
          <p><strong>Bio: </strong>{user.bio}</p>
        </div>

        <button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded w-1/4 md:w-1/4 sm:w-1/2 place-self-end"
          onClick={() => setEditInfoModalOpen(true)}
        >
          Edit Profile Information
        </button>
      </div>

      {/* Modal for updating profile picture */}
      <Modal
        isOpen={isProfilePicModalOpen}
        onRequestClose={() => setProfilePicModalOpen(false)}
        contentLabel="Update Profile Picture"
        className="p-4 bg-white shadow-md rounded w-96 mx-auto mt-20"
      >
        <h2 className="text-xl font-semibold">Upload Profile Picture</h2>
        <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
        <button
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
          onClick={() => setProfilePicModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>

      {/* Modal for editing user information */}
      <Modal
        isOpen={isEditInfoModalOpen}
        onRequestClose={() => setEditInfoModalOpen(false)}
        contentLabel="Edit Profile Information"
        className="p-6 bg-white shadow-md rounded w-96 mx-auto mt-20"
      >
        <form onSubmit={handleEditUser}>
          <h2 className="text-xl font-semibold">Edit Profile Information</h2>
          <div className="mt-4">
            <label>First Name</label>
            <input
              required
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <label>Last Name</label>
            <input
              required
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <label>Email</label>
            <input
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <label>Phone</label>
            <input
              required
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <label>Bio</label>
            <input
              required
              type="text"
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handleClearInfo}
            >
              Clear
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => {
                handleClearInfo();
                setEditInfoModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserProfile;
