import React, { useState, useEffect } from "react";
import source from "../assets/source.png";
import destination from "../assets/destination.png";

function Calculator() {
  const [serviceType, setServiceType] = useState("");
  const [isFareLoaded, setIsFareLoaded] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [originMilestone, setOriginMilestone] = useState(null);
  const [destinationMilestone, setDestinationMilestone] = useState(null);
  const [cost, setCost] = useState(null); // State to hold the calculated cost

  useEffect(() => {
    fetch("http://localhost:8081/api/maps")
      .then((response) => response.json())
      .then((data) => setMapData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e, setField) => {
    const value = e.target.value;
    setField(value);
    const filteredSuggestions = mapData.filter((item) =>
      item.info.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion, setField, setMilestone) => {
    setField(suggestion.info);
    setMilestone(suggestion.milestone);
    setShowSuggestions(false);
  };

  const toggleFareLoad = () => {
    setIsFareLoaded((prev) => !prev);
    if (originMilestone !== null && destinationMilestone !== null) {
      const milestoneDifference = Math.abs(destinationMilestone - originMilestone);
      fetch(`http://localhost:8081/api/prices/milestone?milestone=${milestoneDifference}`)
        .then((response) => response.json())
        .then((data) => {
          setCost(data.newPrice); // Set cost with the new price from the response
          console.log(`Milestone Difference: ${milestoneDifference}`);
        })
        .catch((error) => console.error("Error fetching price:", error));
    } else {
      console.log("Please select both origin and destination to calculate the milestone difference.");
    }
  };

  return (
    <div>
      <div className="flex justify-center content-start mt-20">
        <div className="p-10 rounded-lg bg-black/[.40] mr-5">
          <div className="flex flex-col gap-4 w-72">
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
                        onClick={() => handleSuggestionClick(suggestion, setOrigin, setOriginMilestone)}
                      >
                        {suggestion.info} (Milestone: {suggestion.milestone})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

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
                        onClick={() => handleSuggestionClick(suggestion, setDestinationInput, setDestinationMilestone)}
                      >
                        {suggestion.info} (Milestone: {suggestion.milestone})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

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
                  setOriginMilestone(null);
                  setDestinationMilestone(null);
                  setCost(null);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

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
                <div className="text-xl">{cost !== null ? `${cost} LKR` : "Loading..."}</div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
