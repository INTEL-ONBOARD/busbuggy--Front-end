function Timetable() {
  return (

    <>
        
    <div className="my-20">
        <div className="p-4 w-full bg-transparent flex justify-center"> {/*searchbar*/}
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


      <div className="grid grid-cols-2 gap-4 relative container mx-auto overflow-x-auto  sm:rounded-lg ">
        <div>
        <div className="">
        <table className="w-full text-sm text-left text-gray-500 ">
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
                Origin Departure
              </th>
              <th scope="col" className="px-6 py-3">
                Destination Arrival
              </th>
              <th scope="col" className="px-6 py-3">
                Route Info
              </th>

            </tr>
          </thead>
          <tbody >
            {[
              {
                id: 1,
                name: 'Apple MacBook Pro 17"',
                color: "Silver",
                category: "Laptop",
                price: "$2999",
              },
              {
                id: 2,
                name: "Microsoft Surface Pro",
                color: "White",
                category: "Laptop PC",
                price: "$1999",
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
            ].map((item) => (
              <tr
              key={item.id}
              className="bg-white/[.6] border-b  hover:bg-gray-50 "
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">

                    <label
                      htmlFor={`checkbox-table-search-${item.id}`}
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
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.color}</td>
                <td className="px-6 py-4">{item.category}</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

        </div>

        <div>

        <div className="  ">
        <table className="w-full text-sm text-left text-gray-500 ">
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
                Origin Departure
              </th>
              <th scope="col" className="px-6 py-3">
                Destination Arrival
              </th>
              <th scope="col" className="px-6 py-3">
                Route Info
              </th>

            </tr>
          </thead>
          <tbody >
            {[
              {
                id: 1,
                name: 'Apple MacBook Pro 17"',
                color: "Silver",
                category: "Laptop",
                price: "$2999",
              },
              {
                id: 2,
                name: "Microsoft Surface Pro",
                color: "White",
                category: "Laptop PC",
                price: "$1999",
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
            ].map((item) => (
              <tr
              key={item.id}
              className="bg-white/[.6] border-b  hover:bg-gray-50 "
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">

                    <label
                      htmlFor={`checkbox-table-search-${item.id}`}
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
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.color}</td>
                <td className="px-6 py-4">{item.category}</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

        </div>

      </div>


     
    </div>
    </>
  );
}

export default Timetable;
