import React, { useState, useEffect } from "react";
import source from "../assets/source.png";
import destination from "../assets/destination.png";

function Calculator() {
  const [serviceType, setServiceType] = useState(""); // State for service type
  const [isFareLoaded, setIsFareLoaded] = useState(false); // State for calculated fare content loading
  const [mapData, setMapData] = useState([]); // State to hold API data
  const [origin, setOrigin] = useState(""); // State for selected origin
  const [destinationInput, setDestinationInput] = useState(""); // State for selected destination
  const [suggestions, setSuggestions] = useState([]); // State for suggestions based on input
  const [showSuggestions, setShowSuggestions] = useState(false); // State to show/hide suggestions

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:8081/api/maps")
      .then((response) => response.json())
      .then((data) => setMapData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter suggestions based on input
  const handleInputChange = (e, setField) => {
    const value = e.target.value;
    setField(value);

    // Filter suggestions based on input
    const filteredSuggestions = mapData.filter((item) =>
      item.info.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion, setField) => {
    setField(suggestion.info);
    setShowSuggestions(false); // Hide suggestions once an item is selected
  };

  // Toggle fare calculation loading
  const toggleFareLoad = () => {
    setIsFareLoaded((prev) => !prev);
    console.log(`Origin: ${origin}, Destination: ${destinationInput}, Service Type: ${serviceType}`);
  };

  return (
    <div>
      <div className="flex justify-center content-start mt-20">
        {/* Left Section */}
        <div className="p-10 rounded-lg bg-black/[.40] mr-5">
          <div className="flex flex-col gap-4 w-72">
            {/* Origin Input */}
            <div className="flex place-items-center justify-between">
              <img className="w-12 h-12 mr-5" src={source} alt="Source" />
              <div className="grow">
                <label className="block text-white mb-1">Origin</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md border-none focus:outline-none"
                  placeholder="Enter origin"
                  value={origin}
                  onChange={(e) => handleInputChange(e, setOrigin)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="bg-white border border-gray-300 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion, setOrigin)}
                      >
                        {suggestion.info} (Milestone: {suggestion.milestone})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Destination Input */}
            <div className="flex place-items-center justify-between">
              <img className="w-8 h-8 mr-8" src={destination} alt="Destination" />
              <div className="grow">
                <label className="block text-white mb-1">Destination</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md border-none focus:outline-none"
                  placeholder="Enter destination"
                  value={destinationInput}
                  onChange={(e) => handleInputChange(e, setDestinationInput)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="bg-white border border-gray-300 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion, setDestinationInput)}
                      >
                        {suggestion.info} (Milestone: {suggestion.milestone})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Service Type Selection */}
            <div className="mt-4">
              <span className="block text-white mb-2">Service Type</span>
              <div className="grid grid-cols-2 gap-2">
                {["Normal", "Semi Luxury", "Luxury", "VIP"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${
                      serviceType === type
                        ? "text-white bg-[#FF9119]/80 focus:outline-none border border-yellow-700 rounded-md px-5 py-2.5"
                        : "py-2.5 px-5 text-gray-200 bg-black/[.30] rounded-md border border-gray-600 hover:bg-black/[.50] hover:text-yellow-200"
                    }`}
                    onClick={() => setServiceType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate and Clear Buttons */}
            <div className="flex flex-col mt-5">
              <button
                type="button"
                className="h-10 px-4 py-2 m-1 text-white bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-orange-700 focus:outline-none"
                onClick={toggleFareLoad}
              >
                Calculate Fare
              </button>
              <button
                type="button"
                className="h-10 px-4 py-2 m-1 text-gray-600 bg-white rounded-md border border-gray-400 hover:text-black hover:border-orange-700 focus:outline-none"
                onClick={() => {
                  setOrigin("");
                  setDestinationInput("");
                  setServiceType("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 rounded-md flex justify-start content-start">
          {isFareLoaded && (
            <div className="text-gray-100 p-10 rounded-lg bg-black/[.20]">
              <form className="grid grid-cols-2 gap-4">
                <div className="font-semibold text-xl">Origin:</div>
                <div className="text-xl">{origin}</div>

                <div className="font-semibold text-xl">Destination:</div>
                <div className="text-xl">{destinationInput}</div>

                <div className="font-semibold text-xl">Service Type:</div>
                <div className="text-xl">{serviceType}</div>

                <div className="font-semibold text-xl">Approved Fare:</div>
                <div className="text-xl">{}</div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
