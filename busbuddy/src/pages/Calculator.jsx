import React, { useState } from "react";
import source from '../assets/source.png';
import destination from '../assets/destination.png';

function Calculator() {
  const [serviceType, setServiceType] = useState(""); // State for service type
  const [isFareLoaded, setIsFareLoaded] = useState(false); //State for calculated fare content loading

  const toggleFareLoad = () => {          //toggle conditional rendering for calculated fare loading 
    setIsFareLoaded((prev) => !prev);
  };

  return (
    <div>

      <div className="flex justify-evenly items-center my-32 ">
        {/* Left Section */}
        <div className=" p-10 rounded-lg  bg-black/[.40] ">
          <div className="flex flex-col gap-4 w-72">

            {/*input fields*/}
              <div className="flex place-items-center justify-between">
                <img className="w-12 h-12 mr-5" src={source} alt="Source" />
                  {/* Origin Input */}
                  <div className="grow">
                    <label className="block text-white mb-1">Origin</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md border-none focus:outline-none"
                      placeholder="Enter origin"
                      />
                  </div>
                </div>

                <div className= "flex place-items-center justify-between">
                  <img className="w-8 h-8 mr-8" src={destination} alt="Destination" />
                  {/* Destination Input */}
                  <div className="grow">
                    <label className="block text-white mb-1">Destination</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md border-none focus:outline-none"
                      placeholder="Enter destination"
                      />
                  </div>
                </div>



            {/* Service Type Selection */}
            <div className="mt-4">
              <span className="block text-white mb-2">Service Type</span>
              <div className="grid grid-cols-2 gap-2">

                <button 
                    type="button" 
                    className={`${ serviceType === "Normal" ? "text-white bg-[#FF9119]/80 hover:bg-[#FF9119]/80 focus:outline-none focus:ring-1 focus:ring-[#FF9119]/80 border border-yellow-700 rounded-md px-5 py-2.5 me-2 mb-2"  :  "py-2.5 px-5 me-2 mb-2 text-gray-200 bg-black/[.30] rounded-md border border-gray-600 hover:bg-black/[.50] hover:text-yellow-200"

                    }`}
                    onClick={() => setServiceType("Normal")}
                    >
                    Normal
                </button>

                <button 
                    type="button" 
                    className={`${ serviceType === "Semi Luxury" ? "text-white bg-[#FF9119]/80 hover:bg-[#FF9119]/80 focus:outline-none focus:ring-1 focus:ring-[#FF9119]/80 border border-yellow-700 rounded-md px-5 py-2.5 me-2 mb-2"  :  "py-2.5 px-5 me-2 mb-2 text-gray-200 bg-black/[.30] rounded-md border border-gray-600 hover:bg-black/[.50] hover:text-yellow-200"

                    }`}
                    onClick={() => setServiceType("Semi Luxury")}
                    >
                    Semi Luxury
                </button>


                <button 
                    type="button" 
                    className={`${ serviceType === "Luxury" ? "text-white bg-[#FF9119]/80 hover:bg-[#FF9119]/80 focus:outline-none focus:ring-1 focus:ring-[#FF9119]/80 border border-yellow-700 rounded-md px-5 py-2.5 me-2 mb-2"  :  "py-2.5 px-5 me-2 mb-2 text-gray-200 bg-black/[.30] rounded-md border border-gray-600 hover:bg-black/[.50] hover:text-yellow-200"

                    }`}
                    onClick={() => setServiceType("Luxury")}
                    >
                    Luxury
                </button>

                <button 
                    type="button" 
                    className={`${ serviceType === "VIP" ? "text-white bg-[#FF9119]/80 hover:bg-[#FF9119]/80 focus:outline-none focus:ring-1 focus:ring-[#FF9119]/80 border border-yellow-700 rounded-md px-5 py-2.5 me-2 mb-2"  :  "py-2.5 px-5 me-2 mb-2 text-gray-200 bg-black/[.30] rounded-md border border-gray-600 hover:bg-black/[.50] hover:text-yellow-200"

                    }`}
                    onClick={() => setServiceType("VIP")}
                    >
                    VIP
                </button>

              </div>
            </div>

          <div className="flex flex-col mt-5">
            {/* Calculate Fare Button */}
            <button type="button" 
              className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-[#FF9119]/80 rounded-md border border-orange-400 hover:text-white hover:border-orange-700 focus:outline-none"
              onClick={toggleFareLoad}  //conditional rendering toggle for fare calcualtion was implemented here
            >
              Calculate Fare
            </button>
            {/* Calculate Fare Button */}
            <button type="button" className="h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:border-orange-700 focus:outline-none">
              Clear
            </button>
          </div>
            
          </div>
        </div>


        {/* Right Section */}
        <div className="p-6rounded-md flex justify-center items-center">
          {/*conditional rendering for calculated fare information after data loading and calculated button evt*/}
          {isFareLoaded && 
          <div className="text-gray-100 p-10 rounded-lg  bg-black/[.40] ">

            <form className="grid grid-cols-2 gap-4 h-80 min-h-full">
              <div className="font-semibold text-xl">Origin:</div>
              <div className="text-xl">Colombo</div>

              <div className="font-semibold text-xl">Destination:</div>
              <div className="text-xl">Kandy</div>

              <div className="font-semibold text-xl">Route Number(s):</div>
              <div className="text-xl">234</div>

              <div className="font-semibold text-xl">Service Type:</div>
              <div className="text-xl">VIP/Luxury</div>

              <div className="font-semibold text-xl">Approved Fare:</div>
              <div className="text-xl">Rs/- 3,700</div>
            </form>

            
          </div>}
          {!isFareLoaded && <div>Something went wrong</div>}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
