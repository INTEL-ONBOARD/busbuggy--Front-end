import React, { useState } from "react";

function Calculator() {
  const [serviceType, setServiceType] = useState(""); // State for service type

  return (
    <div>

      <div className="flex justify-center items-center my-32    bg-transparent">
        {/* Left Section */}
        <div className=" p-6 rounded-lg ">
          <div className="flex flex-col gap-4 w-72">
            {/* Origin Input */}
            <div>
              <label className="block text-white mb-1">Origin</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter origin"
              />
            </div>

            {/* Destination Input */}
            <div>
              <label className="block text-white mb-1">Destination</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border-none focus:outline-none"
                placeholder="Enter destination"
              />
            </div>

            {/* Service Type Selection */}
            <div className="mt-4">
              <span className="block text-white mb-2">Service Type</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`p-2 rounded-md text-white ${
                    serviceType === "Normal" ? "bg-pink-700" : "bg-pink-600"
                  }`}
                  onClick={() => setServiceType("Normal")}
                >
                  Normal
                </button>
                <button
                  className={`p-2 rounded-md text-white ${
                    serviceType === "Semi Luxury" ? "bg-pink-700" : "bg-pink-600"
                  }`}
                  onClick={() => setServiceType("Semi Luxury")}
                >
                  Semi Luxury
                </button>
                <button
                  className={`p-2 rounded-md text-white ${
                    serviceType === "Luxury" ? "bg-pink-700" : "bg-pink-600"
                  }`}
                  onClick={() => setServiceType("Luxury")}
                >
                  Luxury
                </button>
                <button
                  className={`p-2 rounded-md text-white ${
                    serviceType === "Super Luxury" ? "bg-yellow-400" : "bg-pink-600"
                  }`}
                  onClick={() => setServiceType("Super Luxury")}
                >
                  Super Luxury
                </button>
              </div>
            </div>

            {/* Calculate Fare Button */}
            <button className="mt-6 bg-white text-black font-bold p-2 rounded-full">
              Calculate Fare
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className=" p-6 rounded-lg    ml-4 w-1/2  flex justify-center items-center">
          <div className="text-xl">~ No Information ~</div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
