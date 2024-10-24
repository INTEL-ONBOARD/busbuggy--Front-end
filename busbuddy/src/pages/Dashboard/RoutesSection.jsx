
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const RoutesSection = () => {

  //for route page
  const [isRouteSectionOpen, setRouteModalOpen] = useState(false); //state for route list section table
  const [isAddRouteModalOpen, setAddRouteModalOpen] = useState(false); //state for route list add section modal(opens from route list section's add)
  const [isEditRouteModalOpen, setEditRouteModalOpen] = useState(false); //state for route list edit modal(opens from route list section's edit)
  
  //for route description page
  const [isFareStageSectionOpen, setFareStageSectionOpen] = useState(false); //state for route description section table(opens from route list section's view)
  const [isAddFareStageModalOpen, setAddFareStageModalOpen] = useState(false); //state for route description section table(opens from  route description section's edit)
  const [isEditFareStageModalOpen, setEditFareStageModalOpen] = useState(false); //state for route description edit table(opens from  route description section's edit)

  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [viewRouteList, setViewRouteList] = useState([]); // Correct initialization as an array
  const [addRoute, setAddRoute] = useState({
    id: null,
    name: '',
    routeFrom: '',
    routeTo: ''
  });

  const [editRoute, setEditRoute] = useState({
    id: null,
    name: '',
    routeFrom: '',
    routeTo: ''
  });

  useEffect(() => {
    loadRouteList();
  }, []);

  // Fetch route list from API
  const loadRouteList = async () => {
    try {
      const result = await axios.get('http://localhost:8081/api/schemas');
      console.log(result.data);
      setViewRouteList(result.data);
    } catch (error) {
      console.error('Error fetching all routes data hmm:', error);
    }
  }; 

  // Add a new route
  const addRoutes = async () => {
    try {
      console.log("new map/route added: addRoutes triggered");
      await axios.post('http://localhost:8081/api/schemas', addRoute);
      setAddRouteModalOpen(false);
      loadRouteList();
      handleClearInfo();
    } catch (error) {
      console.error('Error creating map/route: ', error);
    }
  };

    // Loading route data into edit modal's textboxes
  const loadEditRoutes = async (routeId) => {
    try {
      const result = await axios.get(`http://localhost:8081/api/schemas/${routeId}`);
      console.log(result.data)
      setEditRoute(result.data);
      setSelectedRouteId(routeId);
      setEditRouteModalOpen(true);
    } catch (error) {
      console.error('Error loading route data for edit:', error);
    }
  };
  
  //updating the finilazed edit data via the api
  const editRoutes = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/schemas/${selectedRouteId}`, editRoute);
      setEditRouteModalOpen(false);
      loadRouteList();
    } catch (error) {
      console.error('Error updating route:', error);
    }
  };
  
  const deleteRoute = async (routeId) => {
    try {
      console.log("Route Deletion target: "+routeId);
      await axios.delete(`http://localhost:8081/api/schemas/${routeId}`);
      loadRouteList(); // Reload the route list after deleting
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };


  // Handler for add route info form changes
  const handleAddRouteInputChange = (e) => {
    const { name, value} = e.target;
    setAddRoute({ ...addRoute, [name]: value });
  };
  // Handler for edit route info form changes
  const handleEditRouteInputChange = (e) => {
    const { name, value} = e.target;
    setEditRoute({ ...editRoute, [name]: value });
  };

  const handleClearInfo = () => {        // Handler to clear route info form for both add & edit
    setAddRoute({
      id: '',
      name: '',
      routeFrom: '',
      routeTo: ''
    });
    setEditRoute({
      id: '',
      name: '',
      routeFrom: '',
      routeTo: ''
    });
    setAddFareStage({
      id: '',
      schemaMap: {
          id: '',
      },
      milestone: '',
      info: ''
    });
    setEditFareStage({
      id: '',
      schemaMap: {
          id: '',
      },
      milestone: '',
      info: ''
    });
  };



//---------------------------------------------------------------


  //triggers when view button was clicked(this handle might be useful for crud in fareStage)
  const handleFareStageLoading = (currRouteName, currRouteId) => {
    //console.log("ready to fetch from routeName: "+routeName);
    //console.log(currRouteId+" YESSSS");
    setSelectedRouteId(currRouteId); //for crud operations occured in fareStage section
    setSelectedRouteName(currRouteName); //for crud operations occured in fareStage section
    loadFareStageList(currRouteName);
    setFareStageSectionOpen(true);
  }

  const [selectedRouteName, setSelectedRouteName] = useState([]); // For loading schemaMap id for cruds for loadFareStageList parameters
  const [selectedFareStageId, setSelectedFareStageId] = useState(null); //to load fareStage by id to edit textboxes
  const [viewFareStageList, setViewFareStageList] = useState([]); // For loading fareStage data into the table

  // Fetchs farestage/schema list by routeName from API under handleFareStageLoading method
  const loadFareStageList = async (routeName) => {
    try {
      const result = await axios.get('http://localhost:8081/api/maps');
      //console.log(result.data);//for testing
      //console.log(result.data[0].schemaMap.name); //for testing
    // Filter data based on routeName and schemaMap.name
    const filteredData = result.data.filter(item => item.schemaMap.name === routeName);
    console.log(filteredData); //for testing
    setViewFareStageList(filteredData);
        
    } catch (error) {
      console.error('Error fetching all farestage data hmm: ', error);
    }
  };

  const [addFareStage, setAddFareStage] = useState({     // add farestage input state
    id: null,
    schemaMap: {
        id: null,
    },
    milestone: "",
    info: ""
  });

  const [editFareStage, setEditFareStage] = useState({     // edit farestage input state
    id: null,
    schemaMap: {
        id: null,
    },
    milestone: "",
    info: ""
  });

  // Add a new fare stage
  const addFareStages = async () => {
    try {
      // Update schemaMap id with selectedRouteId
      const newFareStage = { ...addFareStage, schemaMap: { id: selectedRouteId } };
      await axios.post('http://localhost:8081/api/maps', newFareStage);
      setAddFareStageModalOpen(false);
      loadFareStageList(selectedRouteName); // Reload fare stages after addition
      handleClearInfo();
    } catch (error) {
      console.error('Error adding fare stages: ', error);
    }
  };


  // Loading price data into edit modal's textboxes when table row is clicked
  const loadEditFareStages = async (fareStageId) => {
    try {
      const result = await axios.get(`http://localhost:8081/api/maps/${fareStageId}`);
      console.log(result.data);
      setEditFareStage(result.data);
      setSelectedFareStageId(fareStageId);
      setEditFareStageModalOpen(true);
    } catch (error) {
      console.error('Error loading fareStage data for edit:', error);
    }
  };

    //updating the finilazed edit fareStage data via the api
    const editFareStages = async (e) => {
      e.preventDefault();
      try {
        // Update schemaMap id with selectedRouteId
        const newFareStage = { ...editFareStage, schemaMap: { id: selectedRouteId } };
        await axios.put(`http://localhost:8081/api/maps/${selectedFareStageId}`, newFareStage);
        setEditFareStageModalOpen(false);
        loadFareStageList(selectedRouteName); // Reload fare stages after editing
      } catch (error) {
        console.error('Error updating price:', error);
      }
    };

    const deleteFareStage = async (fareStageId) => {
      try {
        console.log("fareStage Deletion target: "+fareStageId);
        await axios.delete(`http://localhost:8081/api/maps/${fareStageId}`);
        loadFareStageList(selectedRouteName); // Reload fare stages after deleting
      } catch (error) {
        console.error('Error deleting price:', error);
      }
    };



    // Handler for add fareStage info form changes
    const handleAddFareStageInputChange = (e) => {
      console.log("add inputchange triggered");
      const { name, value} = e.target;
      setAddFareStage({ ...addFareStage, [name]: value });
    };
    // Handler for add fareStage info form changes
    const handleEditFareStageInputChange = (e) => {
      console.log("edit inputchange triggered");
      const { name, value} = e.target;
      setEditFareStage({ ...editFareStage, [name]: value });
    };

  return (
    <>

    {isFareStageSectionOpen ? 
    (//fare stage section
      <div className="bg-white/[.20] p-8 ml-12 rounded-lg">{/*Fare Stage/Route description rendering*/}
    <div className="flex flex-row justify-around  mx-52 -mb-8">
   

    <div className="container flex flex-col items-start"> {/* Align items to the left */}
          <h1 className="text-2xl font-bold mb-1">Bus Fare Amendment (Interterms)</h1> {/* Adjusted margin */}
          <p className="text-gray-700 mb-6">Average bus fare charging cycle</p>
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
      {/*fareStage table*/}
      <table className="text-sm text-left text-gray-500 rounded-lg w-2/3">
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
              Fare Stage No
            </th>
            <th scope="col" className="px-6 py-3">
              City
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
          {viewFareStageList.map((fareStage) => (
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
                {fareStage.milestone}
              </th>
              <td className="px-6 py-4">{fareStage.info}</td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => loadEditFareStages(fareStage.id)}>
                  </i>
                </div>
              </td>
              <td>
                <div className="text-center">
                  <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"
                    onClick={() => deleteFareStage(fareStage.id)}
                  ></i>
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
      //routeList section
  <div className="bg-white/[.20] p-8 ml-12 rounded-lg">      
    <div className="flex flex-row justify-around mx-52 -mb-8">

    <div className="container flex flex-col items-start"> {/* Align items to the left */}
          <h1 className="text-2xl font-bold mb-1">Manage routes</h1> {/* Adjusted margin */}
          <p className="text-gray-700 mb-6">Average bus fare charging cycle</p>
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
      <table className="text-sm text-left text-gray-500 rounded-lg w-2/3">
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
          {viewRouteList.map((route) => (
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
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                {route.name}
              </th>
              <td className="px-6 py-4">{route.routeFrom}-{route.routeTo}</td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-eye hover:text-orange-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() =>{ 
                      console.log(route.id);
                      handleFareStageLoading(route.name, route.id);
                     }}>
                  </i>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => loadEditRoutes(route.id)}>
                  </i>
                </div>
              </td>
              <td>
                <div className="text-center">
                  <i className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"
                    onClick={() => deleteRoute(route.id)}
                  ></i>
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
            name="name"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter route number"
            value={addRoute.name}
            onChange={handleAddRouteInputChange}
            />
      <label className="block text-white mb-1">From</label>
          <input
            type="text"
            name="routeFrom"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter where from"
            value={addRoute.routeFrom}
            onChange={handleAddRouteInputChange}
            />
      <label className="block text-white mb-1">To</label>
          <input
            type="text"
            name="routeTo"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter where to"
            value={addRoute.routeTo}
            onChange={handleAddRouteInputChange}
          />
            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={addRoutes}
              >
                {/*<i className="fi fi-rs-user-add mr-6"></i>*/}
                Add Route
          </button>
          <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearInfo}
              >
                Clear All
          </button>
          <button
              type="button"
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
              onClick={() =>{ 
                setAddRouteModalOpen(false);
                handleClearInfo();
              }}
          >
              Cancel
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
            name="name"  
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter route number"
            value={editRoute.name}
            onChange={handleEditRouteInputChange}
          />

          <label className="block text-white mb-1">Where from</label>
          <input
            type="text"
            name="routeFrom"  
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter where from"
            value={editRoute.routeFrom}
            onChange={handleEditRouteInputChange}
          />

          <label className="block text-white mb-1">Where to</label>
          <input
            type="text"
            name="routeTo"  
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter where to"
            value={editRoute.routeTo}
            onChange={handleEditRouteInputChange}
          />

          <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={editRoutes}
            >
              <i className="fi fi-rs-user-add mr-6"></i>
              Edit Route
            </button>
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearInfo}
            >
              <i className="fi fi-rs-user-add mr-6"></i>
              Clear All
            </button>
            <button
              type="button"
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
              onClick={() => {
                setEditRouteModalOpen(false);
                handleClearInfo();
              }}
            >
          Cancel
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
            name="milestone"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter fare stage No"
            value={addFareStage.milestone}
            onChange={handleAddFareStageInputChange}
            />

          <label className="block text-white mb-1">Stage City</label>
          <input
            type="text"
            name="info"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter city"
            value={addFareStage.info}
            onChange={handleAddFareStageInputChange}
            />
            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={addFareStages}
              >
                {/*<i className="fi fi-rs-user-add mr-6"></i>*/}
                Add Fare Stage
          </button>
          <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-gray-600 focus:outline-none"
              onClick={handleClearInfo}
              >
                Clear All
          </button>
          <button
              type="button"
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
              onClick={() => {
                setAddFareStageModalOpen(false);
                handleClearInfo();
              }}
          >
              Cancel
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
          name="milestone"
          className="w-full p-2 rounded-md border-none focus:outline-none"
          placeholder="Enter fare stage"
          value={editFareStage.milestone}
          onChange={handleEditFareStageInputChange}
        />

        <label className="block text-white mb-1">Stage City</label>
        <input
          type="text"
          name="info"  
          className="w-full p-2 rounded-md border-none focus:outline-none"
          placeholder="Enter city name"
          value={editFareStage.info}
          onChange={handleEditFareStageInputChange}
        />

        <div className="flex flex-row text-center m-6">
          <button 
            type="button" 
            className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
            onClick={editFareStages}
          >
            <i className="fi fi-rs-user-add mr-6"></i>
            Edit Price
          </button>
          <button
            type="button"
            className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
            onClick={() => {
              setEditFareStageModalOpen(false);
              handleClearInfo();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </Modal>
    
    </>
  );
};

export default RoutesSection;
