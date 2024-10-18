
import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';

const RoutesSection = () => {

  //for route page
  const [isRouteSectionOpen, setRouteModalOpen] = useState(false); //state for route list section table
  const [isAddRouteModalOpen, setAddRouteModalOpen] = useState(false); //state for route list add section modal(opens from route list section's add)
  const [isEditRouteModalOpen, setEditRouteModalOpen] = useState(false); //state for route list edit modal(opens from route list section's edit)
  
  //for route description page
  const [isFareStageSectionOpen, setFareStageSectionOpen] = useState(false); //state for route description section table(opens from route list section's view)
  const [isAddFareStageModalOpen, setAddFareStageModalOpen] = useState(false); //state for route description section table(opens from  route description section's edit)
  const [isEditFareStageModalOpen, setEditFareStageModalOpen] = useState(false); //state for route description edit table(opens from  route description section's edit)

  const [routeInfo, setRouteInfo] = useState({     // Price info state
    id: 10,
    routeNo: 100,
    description: "Colombo-Kandy-Express"
  });

  const [fareStageInfo, setFareStageInfo] = useState({     // Price info state
    id: 2,
    fareStage: 20,
    price: 300.00,
    city: "Kandy",
  });

  // Handler for edit route input form changes
  const handleRouteInputChange = (e) => {
    const { name, value} = e.target;
    setRouteInfo({ ...routeInfo, [name]: value });
  };

  const handleCreateRouteInfo = () => {         // Handler to save created info
    console.log('Created new route info:', routeInfo);
    setAddRouteModalOpen(false); // Close modal after creation
  };

  const handleRouteUpdateInfo = () => {         // Handler to save updated info
    console.log('Updated new route info:', routeInfo);
    setEditRouteModalOpen(false); // Close modal after update
  };

  const handleClearRouteInfo = () => {        // Handler to clear route input form
    setRouteInfo({
      id: 0,
      routeNo: 0,
      description: ""
    });
  };

  // Handler for edit fare stage input form changes
  const handleFareStageInputChange = (e) => {
    const { name, value} = e.target;
    setFareStageInfo({ ...fareStageInfo, [name]: value });
  };

  const handleCreateFareStageInfo = () => {         // Handler to save created info
    console.log('Created new fare stage info:', fareStageInfo);
    setAddFareStageModalOpen(false); // Close modal after creation
  };

  const handleFareStageUpdateInfo = () => {         // Handler to save updated info
    console.log('Updated new fare stage info:', fareStageInfo);
    setEditFareStageModalOpen(false); // Close modal after update
  };

  const handleClearFareStageInfo = () => {        // Handler to clear fare stage input form
    console.log("textboxes should be cleared");
    setFareStageInfo({
      fareStage: 0,
      price: 0.00,
      city: ""
    });
  };



  return (
    <>

    {isFareStageSectionOpen ? 
    (
      <div className="bg-white/[.20] p-8 ml-12 rounded-lg">{/*Fare Stage/Route description rendering*/}

      <h1 className="text-2xl font-bold">Colombo-Kandy-Express(001)</h1>

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
              placeholder="Search for opportunities"
              />
          </div>
    </div>
    <div className="flex flex-row justify-center items-center"> {/* Add Price Button */}
      <button 
        type="button" 
        className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
        onClick={() => setAddFareStageModalOpen(true)} //opens add modal for route description
        >
        <i className="fi fi-rs-price-add mr-6"></i>
        Add Fare Stage
      </button>
    </div>
  </div>


  <div className="flex gap-10 relative container mx-auto overflow-x-auto rounded-lg  sm:rounded-lg justify-around">
      {/*table*/}
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
              Fare Stage
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3 w-6">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 w-6">
              Delete
            </th>

          </tr>
        </thead>
        <tbody >
          {[
            {
              id: 1,
              fareStage: 3,
              city: "Pilimathalawa",
              price: 435.00
            },
            {
              id: 2,
              fareStage: 4,
              city: "Kandy",
              price: 810.00
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
          ].map((fareStage) => (
            <tr
            key={fareStage.id}
            className="bg-white/[.6] border-b  hover:bg-gray-50 "
            >
              <td className="w-4 p-4">
                <div className="flex items-center">

                  <label
                    htmlFor={`checkbox-table-search-${fareStage.id}`}
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
                {fareStage.fareStage}
              </th>
              <td className="px-6 py-4">{fareStage.city}</td>
              <td className="px-6 py-4">{fareStage.price}</td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => setEditFareStageModalOpen(true)}>
                  </i>
                </div>
              </td>
              <td>
                <div className="text-center">
                  <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"></i>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
    </table>
    </div>

    <div className="text-center col-span-2">
      <button 
          type="button" 
          className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
          onClick={() => {setFareStageSectionOpen(false); setRouteModalOpen(true);}}
          >
          Back to Routes
      </button>
    </div>

  </div>
    
    
    ) : (

<div className="bg-white/[.20] p-8 ml-12 rounded-lg">       {/*Route list section rendering*/}
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
    <div className="flex flex-row justify-center items-center"> {/* Add New Route Button */}
      <button 
        type="button" 
        className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
        onClick={() => setAddRouteModalOpen(true)}
        >
        <i className="fi fi-rs-price-add mr-6"></i>
        Add Route
      </button>
    </div>
  </div>

  

    <div className="flex gap-10 relative container mx-auto overflow-x-auto rounded-lg  sm:rounded-lg justify-around">{/*rendering route table*/}
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
              Route No
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3 w-6">
              View
            </th>
            <th scope="col" className="px-6 py-3 w-6">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 w-6">
              Delete
            </th>

          </tr>
        </thead>
        <tbody >
          {[
            {
              id: 1,
              routeNo: 3,
              description: "Colombo-Kandy-Express"
            },
            {
              id: 2,
              routeNo: 4,
              description: "Colombo-Kegalle-Express"
            },
            {
              id: 3,
              name: "Magic Mouse 2",
              color: "Black",
              category: "Accessories"
            },
            {
              id: 4,
              name: "Apple Watch",
              color: "Silver",
              category: "Accessories"
            },
            {
              id: 5,
              name: "iPad",
              color: "Gold",
              category: "Tablet"
            },
            {
              id: 6,
              name: 'Apple iMac 27"',
              color: "Silver",
              category: "PC Desktop"
            },
          ].map((route) => (
            <tr
            key={route.id}
            className="bg-white/[.6] border-b  hover:bg-gray-50 "
            >
              <td className="w-4 p-4">
                <div className="flex items-center">

                  <label
                    htmlFor={`checkbox-table-search-${route.id}`}
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
                {route.routeNo}
              </th>
              <td className="px-6 py-4">{route.description}</td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-eye hover:text-orange-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => setFareStageSectionOpen(true)}>
                  </i>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => setEditRouteModalOpen(true)}>
                  </i>
                </div>
              </td>
              <td>
                <div className="text-center">
                  <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"></i>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
    </table>
    </div>

  </div>

  )}

  {/*add route modal*/}
  <Modal 
  isOpen={isAddRouteModalOpen}
  onRequestClose={() => setAddRouteModalOpen(false)}
      contentLabel="Add New Price Opportunity"
      className="flex  rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
    >
    <h2 className="text-xl font-semibold m-6">Add New Route</h2>
    <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
      <form action="">
      <label className="block text-white mb-1">Route No</label>
          <input
            type="text"
            name="routeNo"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter route number"
            onChange={handleRouteInputChange}
            />
          <label className="block text-white mb-1">Previous Price</label>
          <input
            type="text"
            name="description"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter route description"
            onChange={handleRouteInputChange}
            />
            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={handleCreateRouteInfo}
              >
                {/*<i className="fi fi-rs-user-add mr-6"></i>*/}
                Add Route
          </button>
          <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearRouteInfo}
              >
                Clear All
          </button>
            </div>
      </form>
    </div>
    </Modal>

    {/*edit route modal*/}
    <Modal 
      isOpen={isEditRouteModalOpen}
      onRequestClose={() => setEditRouteModalOpen(false)}
      contentLabel="Edit Route"
      className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
    >
      <h2 className="text-xl font-semibold m-6">Edit Route</h2>
      <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
        <form action="">
          <label className="block text-white mb-1">Route Number</label>
          <input
            type="text"
            name="routeNo"  
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter route number"
            value={routeInfo.routeNo}
            onChange={handleRouteInputChange}
          />

          <label className="block text-white mb-1">Route Description</label>
          <input
            type="text"
            name="description"  
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter route description"
            value={routeInfo.description}
            onChange={handleRouteInputChange}
          />

          <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={handleRouteUpdateInfo}
            >
              <i className="fi fi-rs-user-add mr-6"></i>
              Edit Route
            </button>
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearRouteInfo}
            >
              <i className="fi fi-rs-user-add mr-6"></i>
              Clear All
            </button>
          </div>
        </form>
      </div>
    </Modal>

    
      {/*add fare stage modal*/}
      <Modal 
      isOpen={isAddFareStageModalOpen}
      onRequestClose={() => setAddFareStageModalOpen(false)}
      contentLabel="Add New Fare Stage for Colomob-Kandy-Express"
      className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
    >
    <h2 className="text-xl font-semibold m-6">Add New Fare Stage</h2>
    <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
      <form action="">
      <label className="block text-white mb-1">Fare Stage No</label>
          <input
            type="text"
            name="fareStage"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter fare stage No"
            onChange={handleFareStageInputChange}
            />
          <label className="block text-white mb-1">Stage Price</label>
          <input
            type="text"
            name="price"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter stage price"
            onChange={handleFareStageInputChange}
            />
          <label className="block text-white mb-1">Stage City</label>
          <input
            type="text"
            name="city"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter stage city"
            onChange={handleFareStageInputChange}
            />
            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={handleCreateFareStageInfo}
              >
                {/*<i className="fi fi-rs-user-add mr-6"></i>*/}
                Add Fare Stage
          </button>
          <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearFareStageInfo}
              >
                Clear All
          </button>
            </div>
      </form>
    </div>
    </Modal>

     {/*edit fare stage modal*/}
  <Modal 
    isOpen={isEditFareStageModalOpen}
    onRequestClose={() => setEditFareStageModalOpen(false)}
    contentLabel="Edit Fare Stage for Colombo-Kandy-Express"
    className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
  >
    <h2 className="text-xl font-semibold m-6">Edit Fare Stage for Colombo-Kandy-Express</h2>
    <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
      <form action="">
        <label className="block text-white mb-1">Fare Stage</label>
        <input
          type="text"
          name="fareStage"  
          className="w-full p-2 rounded-md border-none focus:outline-none"
          placeholder="Enter fare stage"
          value={fareStageInfo.fareStage}
          onChange={handleFareStageInputChange}
        />

        <label className="block text-white mb-1">Stage City</label>
        <input
          type="text"
          name="city"  
          className="w-full p-2 rounded-md border-none focus:outline-none"
          placeholder="Enter current name"
          value={fareStageInfo.city}
          onChange={handleFareStageInputChange}
        />

        <label className="block text-white mb-1">Stage price</label>
        <input
          type="text"
          name="price"  
          className="w-full p-2 rounded-md border-none focus:outline-none"
          placeholder="Enter new price"
          value={fareStageInfo.price}
          onChange={handleFareStageInputChange}
        />

        <div className="flex flex-row text-center m-6">
          <button 
            type="button" 
            className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
            onClick={handleFareStageUpdateInfo}
          >
            <i className="fi fi-rs-user-add mr-6"></i>
            Edit Price
          </button>
          <button 
            type="button" 
            className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
            onClick={handleClearFareStageInfo}
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
};

export default RoutesSection;
