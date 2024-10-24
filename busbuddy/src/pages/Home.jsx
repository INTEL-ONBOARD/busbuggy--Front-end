import { Link } from 'react-router-dom';

import phone from '../assets/mockup 1.png';


function Home() {
  return (
    <div>
      <div className="container px-6 py-16 mb-24  mx-auto text-center z-40  ">
        <div className="max-w-lg mx-auto z-40">
          <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
            Explore, Ride, Save with <br />
            <span className="text-orange-400 font-bold">
              Bus <span className="text-black font-bold">Buddy</span>
            </span>
          </h1>

          <p className="mt-6 text-gray-500">
            Your go-to platform for finding bus routes and calculating trip costs with ease. Plan your journey and travel smart with BusBuddy!
          </p>

          <div className="w-full max-w-sm mx-auto mt-6 bg-transparent rounded-md">
            <button type="button" className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-transparent border border-orange-400 hover:text-orange-400 hover:border-orange-400 focus:outline-none focus:bg-transparent">
              Calculate Fare
            </button>
            <button type="button" className="h-10 px-4 py-2 m-1 border border-black text-black transition-colors duration-300 transform rounded-md hover:bg-white hover:border-white focus:outline-none focus:bg-white-400">
              View Timetable
            </button>
          </div>
        </div>
      </div>

      <div className="container px-36 -mt-32 mx-auto rounded-md ">
        <section className="bg-black/[.25] rounded-lg text-white">
          <div className=" px-12 mx-auto  min-h-24 ">
            <div className="xl:flex xl:items-center xl:-mx-4 ">
              <div className=" xl:mx-4 px-12 ">
                <h1 className="text-2xl font-semibold text-white-800 capitalize lg:text-3xl">Our Partnerships</h1>

                <p className=" mt-4 text-white/[.4]">
                  We partner with various government and public transportation agencies to provide accurate, real-time bus routes, schedules, and fare information. This collaboration ensures that your commute with Bus Buddy is always reliable and efficient.
                </p>
              </div>

              <div className="z-30">
                <div className="flex justify-center items-center -mr-12">
                  <img className="w-auto size-full -mt-32" src={phone} alt="Emb Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
