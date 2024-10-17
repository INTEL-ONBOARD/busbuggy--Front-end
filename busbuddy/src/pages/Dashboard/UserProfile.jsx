import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility reasons

const UserProfile = () => {
  // State for Modals
  const [isProfilePicModalOpen, setProfilePicModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);

  // User info state
  const [userInfo, setUserInfo] = useState({
    firstName: 'Sandy',
    lastName: 'Wilson',
    email: 'sandy@gmail.com',
    phone: '+94 76 123 4567',
    bio: 'Team Manager'
  });

  const [profilePic, setProfilePic] = useState(null);

  // Handler for profile picture upload
  const handleProfilePicUpload = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
    setProfilePicModalOpen(false); // Close modal after upload
  };

  // Handler for user info form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handler to save updated info
  const handleSaveInfo = () => {
    console.log('Updated user info:', userInfo);
    setEditInfoModalOpen(false); // Close modal after save
  };

  // Handler to clear user info form
  const handleClearInfo = () => {
    setUserInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: ''
    });
  };

  return (
    <div className="p-10 flex space-x-10 ">
      {/* Left Section: Profile Picture and Buttons */}
      <div className="flex flex-col items-center bg-white p-6 shadow-md corner rounded-md">
        <img
          src={profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-full w-32 h-32 mb-4"
        />
        <h2 className="text-xl font-semibold">Mr. {userInfo.firstName} {userInfo.lastName}</h2>
        <p className="text-gray-500">{userInfo.bio}</p>

        <button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
          onClick={() => setProfilePicModalOpen(true)}
        >
          Update Profile Picture
        </button>
        <button
          className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded"
        >
          Remove Profile Picture
        </button>
      </div>

      {/* Right Section: User Information */}
      <div className="flex flex-col bg-white p-6 shadow-md flex-1 rounded-md justify-between">
        <h2 className="text-lg font-bold">User Information</h2>
        <div className="mt-4">
          <p><strong>First Name: </strong>{userInfo.firstName}</p>
          <p><strong>Last Name: </strong>{userInfo.lastName}</p>
          <p><strong>Email Address: </strong>{userInfo.email}</p>
          <p><strong>Phone: </strong>{userInfo.phone}</p>
          <p><strong>Bio: </strong>{userInfo.bio}</p>
        </div>

        <button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded w-1/4 md:w-1/4 sm:wd-1/2 place-self-end place-items-end -mb-100"
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
        <h2 className="text-xl font-semibold">Edit Profile Information</h2>
        <div className="mt-4">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={userInfo.bio}
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
            className="bg-yellow-500 text-white py-2 px-4 rounded"
            onClick={handleSaveInfo}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
