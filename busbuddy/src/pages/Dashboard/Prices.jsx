import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function Prices() {

  const [isAddPriceModelOpen, setAddPriceModalOpen] = useState(false); //state for add price modal
  const [isEditPriceModelOpen, setEditPriceModalOpen] = useState(false); //state for edit price modal

  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [viewPriceList, setViewPriceList] = useState([]); // For loading price data into the table
  const [addPrice, setAddPrice] = useState({     // Price info state
    id: null,
    milestone: '',
    oldPrice: null,
    newPrice: null
  });

  const [editPrice, setEditPrice] = useState({     // Price info state
    id: null,
    milestone: '',
    oldPrice: null,
    newPrice: null
  });

    useEffect(() => {
      loadPriceList();
    }, []);
  
    // Fetch price list from API
    const loadPriceList = async () => {
      try {
        const result = await axios.get('http://localhost:8081/api/prices');
        setViewPriceList(result.data);
      } catch (error) {
        console.error('Error fetching all price data hmm:', error);
      }
    };

      // Add a new price
  const addPrices = async () => {
    try {
      console.log("new price added: addprices triggered");
      await axios.post('http://localhost:8081/api/prices', addPrice);
      setAddPriceModalOpen(false);
      loadPriceList();
      handleClearInfo();
    } catch (error) {
      console.error('Error creating prices:', error);
    }
  };
  
  // Loading price data into edit modal's textboxes when table row is clicked
  const loadEditPrices = async (priceId) => {
    try {
      const result = await axios.get(`http://localhost:8081/api/prices/${priceId}`);
      console.log(result.data);
      setEditPrice(result.data);
      setSelectedPriceId(priceId);
      setEditPriceModalOpen(true);
    } catch (error) {
      console.error('Error loading price data for edit:', error);
    }
  };
  
  //updating the finilazed edit data via the api
  const editPrices = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/prices/${selectedPriceId}`, editPrice);
      setEditPriceModalOpen(false);
      loadPriceList();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const deletePrice = async (priceId) => {
    try {
      console.log("Price Deletion target: "+priceId);
      await axios.delete(`http://localhost:8081/api/prices/${priceId}`);
      loadPriceList(); // Reload the price list after deleting
    } catch (error) {
      console.error('Error deleting price:', error);
    }
  };


  // Handler for add price info form changes
  const handleAddInputChange = (e) => {
    const { name, value} = e.target;
    setAddPrice({ ...addPrice, [name]: value });
  };
  // Handler for edit price info form changes
  const handleEditInputChange = (e) => {
    const { name, value} = e.target;
    setEditPrice({ ...editPrice, [name]: value });
  };

    const handleClearInfo = () => {        // Handler to clear price info form
      console.log("clear info triggered");
      setAddPrice({
        milestone: '',
        oldPrice: '',
        newPrice: ''
      });
      setEditPrice({
        milestone: '',
        oldPrice: '',
        newPrice: ''
      });
    };


    return (
    <>
    <div className="bg-white/[.20] p-8 ml-12 rounded-lg">

      <h1 className="text-2xl font-bold mb-4">Bus Fare Amendment(Interterms)</h1>
        <p className="text-gray-700 mb-6">
          Average bus fare charging cycle
        </p>



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
    <div className="flex flex-row justify-center items-center"> {/* Add Price Button */}
      <button 
        type="button" 
        className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
        onClick={() => setAddPriceModalOpen(true)}
        >
        <i className="fi fi-rs-price-add mr-6"></i>
        Add Price
      </button>
    </div>
  </div>


  <div className="flex gap-10 relative container mx-auto overflow-x-auto rounded-lg  sm:rounded-lg justify-around">
      {/*left section*/}
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
              Fee Opportunity
            </th>
            <th scope="col" className="px-6 py-3">
              Current Price
            </th>
            <th scope="col" className="px-6 py-3">
              New Price
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>

          </tr>
        </thead>
        <tbody >
          {viewPriceList.map((price) => (
            <tr key={price.id}
            className="bg-white/[.6] border-b  hover:bg-gray-50 "
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <label
                    htmlFor={`checkbox-table-search-${price.id}`}
                    className="sr-only">checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                {price.milestone}
              </th>
              <td className="px-6 py-4">{price.oldPrice}</td>
              <td className="px-6 py-4">{price.newPrice}</td>
              <td className="px-6 py-4">
                <div className="text-center">
                  <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10" 
                     onClick={() => loadEditPrices(price.id)}>
                  </i>
                </div>
              </td>
              <td>
                <div className="text-center">
                  <i 
                    className="fi fi-rs-trash hover:text-red-600 hover:font-bold hover:rounded-full w-10"
                    onClick={() => deletePrice(price.id)}>
                  </i>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
    </table>
    </div>
  </div>



      {/*add price modal*/}
      <Modal 
      isOpen={isAddPriceModelOpen}
      onRequestClose={() => setAddPriceModalOpen(false)}
      contentLabel="Add New Price Opportunity"
      className="flex  rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
    >
    <h2 className="text-xl font-semibold m-6">Add New Price Opportunity</h2>
    <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
      <form action="">
      <label className="block text-white mb-1">Price Opportunity</label>
          <input
            type="text"
            name="milestone"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter price opportunity"
            value={addPrice.milestone}
            onChange={handleAddInputChange}
            />
          <label className="block text-white mb-1">Previous Price</label>
          <input
            type="number"
            name="oldPrice"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter current price"
            value={addPrice.oldPrice}
            onChange={handleAddInputChange}
            />
          <label className="block text-white mb-1">Current Price</label>
          <input
            type="number"
            name="newPrice"
            className="w-full p-2 rounded-md border-none focus:outline-none"
            placeholder="Enter new price"
            value={addPrice.newPrice}
            onChange={handleAddInputChange}
            />
            <div className="flex flex-row text-center m-6">
            <button 
              type="button" 
              className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
              onClick={addPrices}
              >
                {/*<i className="fi fi-rs-user-add mr-6"></i>*/}
                Add Price
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
                setAddPriceModalOpen(false);
                handleClearInfo();
              }}
          >
              Cancel
          </button>
        </div>
      </form>
    </div>
    </Modal>


 {/*edit price modal*/}
<Modal 
  isOpen={isEditPriceModelOpen}
  onRequestClose={() => setEditPriceModalOpen(false)}
  contentLabel="Add New Price Opportunity"
  className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
>
  <h2 className="text-xl font-semibold m-6">Edit Price</h2>
  <div className="bg-black/[.40] p-8 w-1/3 rounded-md">
    <form action="">
      <label className="block text-white mb-1">Fee Opportunity</label>
      <input
        type="number"
        name="milestone"  
        className="w-full p-2 rounded-md border-none focus:outline-none"
        placeholder="Enter price opportunity"
        value={editPrice.milestone}
        onChange={handleEditInputChange}
      />

      <label className="block text-white mb-1">Current Price</label>
      <input
        type="number"
        name="oldPrice"  
        className="w-full p-2 rounded-md border-none focus:outline-none"
        placeholder="Enter current name"
        value={editPrice.oldPrice}
        onChange={handleEditInputChange}
      />

      <label className="block text-white mb-1">New Price</label>
      <input
        type="number"
        name="newPrice"  
        className="w-full p-2 rounded-md border-none focus:outline-none"
        placeholder="Enter new price"
        value={editPrice.newPrice}
        onChange={handleEditInputChange}
      />

      <div className="flex flex-row text-center m-6">
        <button 
          type="button" 
          className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
          onClick={editPrices}
        >
          <i className="fi fi-rs-user-add mr-6"></i>
          Edit Price
        </button>
        <button
          type="button"
          className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-400/80 rounded-md border border-red-400 hover:text-white hover:border-red-500 focus:outline-none"
          onClick={() => {
            setEditPriceModalOpen(false);
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
  
  );}
  
  export default Prices;
  