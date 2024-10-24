import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Timetable() {
  const [viewTurntableList, setViewTurntableList] = useState([]); // For loading id-filtered turntable data
  const [viewIncomingTurntableList, setViewIncomingTurntableList] = useState([]); // For loading incoming-filtered turntable data
  const [viewOutgoingTurntableList, setViewOutgoingTurntableList] = useState([]); // For loading outgoing-filtered turntable data
  const [tableSearch, setTableSearch] = useState(''); // Store only the search value

  // Search input change handler
  const handleSearchbarInputChange = (e) => {
    const value = e.target.value;
    setTableSearch(value); // Update the search term state
  };

  // Fetches turntable list and filters data based on the routeId
  const loadTurntableList = async (routeName) => {
    console.log('Loading loadTurntableList with Route ID: ' + routeName); // For testing
    try {
      const result = await axios.get('http://localhost:8081/api/turns');
      console.log("raw data:");
      console.log(result.data); // For testing
  
      // Filter data based on schemaMap.id (the routeId)
      const filteredData = result.data.filter((item) => item.schemaMapName == routeName);
      console.log("filtered data:");
      console.log(filteredData); // For testing filtered data
      setViewTurntableList(filteredData); // Update the state with filtered data
  
      // Filter incoming and outgoing data based on "type" (correctly accessing "type" directly from item)
      const filteredIncomingData = filteredData.filter((item) => item.type === 'return');
      console.log("incoming filtered data:");
      console.log(filteredIncomingData); // For testing filtered data
      setViewIncomingTurntableList(filteredIncomingData);
      
      const filteredOutgoingData = filteredData.filter((item) => item.type === 'going');
      console.log("outgoing filtered data:");
      console.log(filteredOutgoingData); // For testing filtered data
      setViewOutgoingTurntableList(filteredOutgoingData);
  
      console.log("Incoming Data:");
      console.log(filteredIncomingData);
      
      console.log("Outgoing Data:");
      console.log(filteredOutgoingData);
  
    } catch (error) {
      console.error('Error fetching turntable data: ', error);
    }
  };


  //an alternate search method that gives suggessing search results instead of matching the whole word
  /*

  // Fetch and filter data based on the routeName
  const loadTurntableList = async (routeName) => {
    console.log('Loading loadTurntableList with Route Name: ' + routeName); // For testing
    try {
      const result = await axios.get('http://localhost:8081/api/turns');
      console.log("raw data:", result.data); // For testing

      // Filter data based on schemaMapName (the routeName)
      const filteredData = result.data.filter((item) =>
        item.schemaMapName.toLowerCase().includes(routeName.toLowerCase()) // Match routeName (case-insensitive)
      );
      console.log("filtered data:", filteredData); // For testing filtered data
      setViewTurntableList(filteredData); // Update the state with filtered data

      // Filter incoming and outgoing data based on "type"
      const filteredIncomingData = filteredData.filter((item) => item.type === 'return');
      setViewIncomingTurntableList(filteredIncomingData);

      const filteredOutgoingData = filteredData.filter((item) => item.type === 'going');
      setViewOutgoingTurntableList(filteredOutgoingData);

      console.log("Incoming Data:", filteredIncomingData);
      console.log("Outgoing Data:", filteredOutgoingData);
    } catch (error) {
      console.error('Error fetching turntable data:', error);
    }
  };
  
  */







  // Use effect to trigger loadTurntableList when tableSearch changes
  useEffect(() => {
    if (tableSearch !== '') {
      loadTurntableList(tableSearch); // Fetch data when user types
    }
  }, [tableSearch]); // Re-run when tableSearch changes

  return (
    <>
      <div className="my-20">
        <div className="p-4 w-full bg-transparent flex justify-center">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 text-center">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
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
              id="tableSearch"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter route here"
              value={tableSearch}
              onChange={handleSearchbarInputChange} // Trigger search input change
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative container mx-auto overflow-x-auto sm:rounded-lg">
          <div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Route Info
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Destination Arrival
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Origin Departure
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewIncomingTurntableList.map((list) => (
                  <tr key={list.id} className="bg-white/[.6] border-b hover:bg-gray-50">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <label htmlFor={`checkbox-table-search-${list.id}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {list.turnNo}
                    </th>
                    <td className="px-6 py-4">{list.origin}</td>
                    <td className="px-6 py-4">{list.departure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Route Info
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Destination Arrival
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Origin Departure
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewOutgoingTurntableList.map((item) => (
                  <tr key={item.id} className="bg-white/[.6] border-b hover:bg-gray-50">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <label htmlFor={`checkbox-table-search-${item.id}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.turnNo}
                    </th>
                    <td className="px-6 py-4">{item.origin}</td>
                    <td className="px-6 py-4">{item.departure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Timetable;
