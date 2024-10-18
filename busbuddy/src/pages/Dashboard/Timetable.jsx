import { useState } from "react";
import Modal from 'react-modal';

function TimeTable() {

  const [isTimetableSectionOpen, setTimetableSectionOpen] = useState(false); // state for view timetable section

  const [isAddTurnForCity1ModalOpen, setAddTurnForCity1ModelOpen] = useState(false); //state for add turn for city table's modal
  const [isEditTurnForCity1ModalOpen, setEditTurnForCity1ModalOpen] = useState(false); //state for edit turn for city1 table'smodal

  const [isAddTurnForCity2ModalOpen, setAddTurnForCity2ModalOpen] = useState(false); //state for add turn for city2 table'smodal
  const [isEditTurnForCity2ModalOpen, setEditTurnForCity2ModalOpen] = useState(false); //state for edit turn for city2 table'smodal

  return (
    <>
      {isTimetableSectionOpen ? (
        <>
      <h1 className="text-2xl font-bold">Timetable for Colombo-Kandy-Express(001)</h1>

          <div className="">
            <div className="p-4 w-full bg-transparent flex justify-center">
              {/*searchbar*/}
              <label htmlFor="table-search" className="sr-only">Search</label>
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
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>



            <div className="grid grid-cols-2 gap-4 relative container mx-auto overflow-x-auto sm:rounded-lg">
              {/*Table for City 01*/}

              <div className="flex flex-row justify-center items-center gap-20 mb-2 col-span-2"> {/* Add turn for city 1 Button */}
              <button 
                type="button" 
                className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
                onClick={() => setAddTurnForCity1ModelOpen(true)} //opens add modal for route description
                >
                <i className="fi fi-rs-price-add mr-6"></i>
                Add Turn for city o1
              </button>

              <button 
                type="button" 
                className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
                onClick={() => setAddTurnForCity2ModalOpen(true)} //opens add modal for route description
                >
                <i className="fi fi-rs-price-add mr-6"></i>
                Add Turn for city o2
              </button>

            </div>


              <div>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">Turn No</th>
                      <th scope="col" className="px-6 py-3">From City 01</th>
                      <th scope="col" className="px-6 py-3">To City 02</th>
                      <th scope="col" className="px-6 py-3">Edit</th>
                      <th scope="col" className="px-6 py-3">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*City 01 Table Data */}
                    {[
                      {
                        id: 1,
                        turnNo: 2,
                        departureTime: "9.00am",
                        arrivalTime: "10.30pm"
                      },
                      {
                        id: 2,
                        turnNo: 4,
                        departureTime: "11.00am",
                        arrivalTime: "1.00pm"
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
                    ].map((city1) => (
                      <tr key={city1.id} className="bg-white/[.6] border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <label htmlFor={`checkbox-table-search-${city1.id}`} className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {city1.turnNo}
                        </th>
                        <td className="px-6 py-4">{city1.arrivalTime}</td>
                        <td className="px-6 py-4">{city1.departureTime}</td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10"></i>
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

              {/* Table for city 02*/}
              <div>
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-white/[.3] rounded-lg">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">Turn No</th>
                      <th scope="col" className="px-6 py-3">From City 02</th>
                      <th scope="col" className="px-6 py-3">To City 01</th>
                      <th scope="col" className="px-6 py-3">Edit</th>
                      <th scope="col" className="px-6 py-3">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* City 02 Table Data */}
                    {[
                      {
                        id: 1,
                        turnNo: 2,
                        departureTime: "3.00am",
                        arrivalTime: "11.50pm"
                      },
                      {
                        id: 2,
                        turnNo: 4,
                        departureTime: "3.00am",
                        arrivalTime: "4.00pm"
                      },
                      {
                        id: 9,
                        name: "Logitech Mouse",
                        color: "White",
                        category: "Accessories"
                      },
                      {
                        id: 10,
                        name: "Samsung Galaxy Tab",
                        color: "Black",
                        category: "Tablet"
                      },
                      {
                        id: 11,
                        name: "HP Envy",
                        color: "Silver",
                        category: "Laptop"
                      },
                      {
                        id: 12,
                        name: 'Asus ZenBook 14"',
                        color: "Blue",
                        category: "Laptop"
                      },
                    ].map((city2) => (
                      <tr key={city2.id} className="bg-white/[.6] border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <label htmlFor={`checkbox-table-search-${city2.id}`} className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {city2.turnNo}
                        </th>
                        <td className="px-6 py-4">{city2.arrivalTime}</td>
                        <td className="px-6 py-4">{city2.departureTime}</td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <i className="fi fi-rs-edit hover:text-blue-600 hover:font-bold hover:rounded-full w-10"></i>
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
                  className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-transparent focus:border-transparent"
                  onClick={() => {setTimetableSectionOpen(false);}}
                >
                  Back to Routes
                </button>
              </div>
            </div>
          </div>
        </>


      ) : (


      <div className="p-8 ml-12">       {/*Route list section rendering*/}
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

      {/* <!--add new route button is unnecessary for this tab-->
    <div className="flex flex-row justify-center items-center">
      <button 
        type="button" 
        className="mt-3 h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-yellow-500 focus:outline-none"
        onClick={() => setAddRouteModalOpen(true)}
        >
        <i className="fi fi-rs-price-add mr-6"></i>
        Add Route
      </button>
    </div>
        */}

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
            <th scope="col" className="px-6 py-3 w-30 text-center">
              View Timetable
            </th>
            {/*
            <th scope="col" className="px-6 py-3 w-6">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 w-6">
              Delete
            </th>
            */}

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
                     onClick={() => setTimetableSectionOpen(true)}>
                  </i>
                </div>
              </td>
              {/*
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
              */}

            </tr>
          ))}
        </tbody>
    </table>
    </div>

  </div>
        
        



      )}
    </>
  );
}

export default TimeTable;
