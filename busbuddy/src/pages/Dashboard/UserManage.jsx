import { useState } from "react";
import Modal from 'react-modal';

function UserManage() {

  const [isAddUserModelOpen, setAddUserModalOpen] = useState(false); //state for add user modal
  const [isEditUserModelOpen, setEditUserModalOpen] = useState(false); //state for ed user modal

    const [userInfo, setUserInfo] = useState({     // User info state
      firstName: 'Sandy',
      lastName: 'Wilson',
      email: 'sandy@gmail.com',
      contact: '+94 76 123 4567',
      bio: 'Team Manager'
    });




  // Handler for user info form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };



  
    const handleCreateInfo = () => {         // Handler to save created info
      console.log('Created new user info:', userInfo);
      setAddUserModalOpen(false); // Close modal after creation
    };

    const handleUpdateInfo = () => {         // Handler to save updated info
      console.log('Updated new user info:', userInfo);
      setEditUserModalOpen(false); // Close modal after update
    };

    const handleClearInfo = () => {        // Handler to clear user info form
      setUserInfo({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        bio: ''
      });
    };

    return (
      <>
    <div className="flex flex-row justify-around">
      <div className="p-4 bg-transparent flex justify-center"> {/*searchbar*/}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 text-center ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search for items"
                />
            </div>
      </div>
<div className="flex flex-row justify-center items-center"> {/* Add User Button */}
  <button 
    type="button" 
    className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
    onClick={() => setAddUserModalOpen(true)}
  >
    <i className="fi fi-rs-user-add mr-6"></i>
    Add User
  </button>
</div>
    </div>


    <div className="flex gap-10 relative container mx-auto overflow-x-auto rounded-lg  sm:rounded-lg justify-around">
      {/*left section*/}
      <table className="w-full text-sm text-left text-gray-500 rounded-lg w-2/3">
        <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg ">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">

                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Bio
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>

          </tr>
        </thead>
        <tbody >
          {[
            {
              id: 1,
              firstName: 'Nimal',
              lastName: "De Silva",
              email: "Nimal@email.com",
              contact: "+94 343 3432",
              bio: "Manager"
            },
            {
              id: 2,
              firstName: 'Nimal',
              lastName: "De Silva",
              email: "Nimal@email.com",
              contact: "+94 343 3432",
              bio: "Manager"
            },
            {
              id: 3,
              name: "Magic Mouse 2",
              color: "Black",
              category: "Accessories",
              price: "$99",
            },
            {
              id: 4,
              name: "Apple Watch",
              color: "Silver",
              category: "Accessories",
              price: "$179",
            },
            {
              id: 5,
              name: "iPad",
              color: "Gold",
              category: "Tablet",
              price: "$699",
            },
            {
              id: 6,
              name: 'Apple iMac 27"',
              color: "Silver",
              category: "PC Desktop",
              price: "$3999",
            },
          ].map((employee) => (
            <tr
            key={employee.id}
            className="bg-white/[.6] border-b  hover:bg-gray-50 "
            >
              <td className="w-4 p-4">
                <div className="flex items-center">

                  <label
                    htmlFor={`checkbox-table-search-${employee.id}`}
                    className="sr-only"
                    >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                {employee.firstName}
              </th>
              <td className="px-6 py-4">{employee.lastName}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.contact}</td>
              <td className="px-6 py-4">{employee.bio}</td>
              <td className="px-6 py-4">
                <div className="flex justify-around items-center gap-6">
                  <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => setEditUserModalOpen(true)}>
                  </i>
                  <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"></i>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
    </table>
    </div>

    {/*add user modal*/}
    <Modal 
      isOpen={isAddUserModelOpen}
      onRequestClose={() => setAddUserModalOpen(false)}
      contentLabel="Add New User"
      className="flex shadow-md rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
    >
    <h2 className="text-xl font-semibold m-6">Add New User</h2>
    <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
      <form action="">
      <label className="block text-white mb-1">First Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter first name"
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">Last Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter first name"
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">Email</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter first name"
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">contact</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter first name"
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">Bio</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter first name"
            onChange={handleInputChange}
            />

            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={handleCreateInfo}
              >
                <i className="fi fi-rs-user-add mr-6"></i>
                Add User
          </button>
          <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearInfo}
              >
                <i className="fi fi-rs-user-add mr-6"></i>
                Clear All
          </button>

            </div>
      </form>
    </div>
    </Modal>


    {/*Edit user modal*/}
    <Modal 
      isOpen={isEditUserModelOpen}
      onRequestClose={() => setEditUserModalOpen(false)}
      contentLabel="Add New User"
      className="flex shadow-md rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
    >
    <h2 className="text-xl font-semibold m-6">Edit User</h2>
    <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
      <form action="">
      <label className="block text-white mb-1">First Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter first name"
            value={userInfo.firstName}
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">Last Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter last name"
            value={userInfo.lastName}
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter email address"
            value={userInfo.email}
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">contact</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter user contact"
            value={userInfo.contact}
            onChange={handleInputChange}
            />
          <label className="block text-white mb-1">Bio</label>
          <input
            type="text"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter user bio"
            value={userInfo.bio}
            onChange={handleInputChange}
            />

            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={handleCreateInfo}
              >
                <i className="fi fi-rs-user-add mr-6"></i>
                Add User
          </button>
          <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearInfo}
              >
                <i className="fi fi-rs-user-add mr-6"></i>
                Clear All
          </button>

            </div>
      </form>
    </div>
    </Modal>


      </>
    );
  
  }
  
  export default UserManage;
  