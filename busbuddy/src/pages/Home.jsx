import { Link } from 'react-router-dom';
import dd from '../assets/dd.png';
import emb from '../assets/emb.png';
import sltb from '../assets/sltb.png';

function Home() {
  return (
    <div>
      <div className="container px-6 py-32 my-5 mx-auto text-center">
        <div className="max-w-lg mx-auto">
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

      <div className="container px-36 -mt-20 mx-auto rounded-md">
        <section className="bg-black/[.25] rounded-lg text-white">
          <div className="container px-6 py-10 mx-auto">
            <div className="xl:flex xl:items-center xl:-mx-4">
              <div className="xl:w-1/2 xl:mx-4">
                <h1 className="text-2xl font-semibold text-white-800 capitalize lg:text-3xl">Our Partnerships</h1>

                <p className="max-w-2xl mt-4 text-white/[.4]">
                  We partner with various government and public transportation agencies to provide accurate, real-time bus routes, schedules, and fare information. This collaboration ensures that your commute with Bus Buddy is always reliable and efficient.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-12 mt-8 md:grid-cols-3 ml-24">
                <div className="flex justify-center items-center">
                  <img className="w-auto h-24" src={emb} alt="Emb Logo" />
                </div>

                <div className="flex justify-center items-center">
                  <img className="w-auto h-12" src={sltb} alt="SLTB Logo" />
                </div>

                <div className="flex justify-center items-center">
                  <img className="w-auto h-24" src={dd} alt="DD Logo" />
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
