import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 px-2 md:px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* LEFT SIDE: Title, Description, and Highlight */}
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Amplify Opportunity
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-xl">
              Explore opportunities from across the globe to grow, showcase skills, gain
              CV points & get hired by your dream company.
            </p>

            {/* Highlight badge */}
            <div className="inline-block">
              <div className="bg-violet-100 px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="bg-violet-500 text-white p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0116 2v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0V7h-3a1 1 0 110-2h3V2a1 1 0 011-1zm-7 4a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0V9H3a1 1 0 010-2h1V6a1 1 0 011-1z"
                    />
                  </svg>
                </span>
                <span className="text-violet-800 font-medium">Just Went Pro!</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 2x2 Grid Cards */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-3">
              
              {/* Card 1: Resume */}
              <Link to="/resume-templates">
                <div className="container1 bg-blue-100 rounded-lg p-3 flex flex-col min-h-[120px]">
                  <h3 className="text-sm md:text-base font-semibold text-blue-800 mb-1">Build Resume</h3>
                  <p className="text-xs md:text-sm text-blue-700">Gain Practical Experience</p>
                  <div className="flex-grow" />
                  <div className="mt-2 flex justify-end">
                    <img
                      src="https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Internships"
                      className="h-12 md:h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </Link>

              {/* Card 2: Portfolio */}
              <Link to="/portfolio" className="hover:text-blue-600">
                <div className="bg-orange-100 rounded-lg p-3 flex flex-col min-h-[120px]">
                  <h3 className="text-sm md:text-base font-semibold text-orange-800 mb-1">Make Portfolio</h3>
                  <p className="text-xs md:text-sm text-orange-700">Guidance From Top Mentors</p>
                  <div className="flex-grow" />
                  <div className="mt-2 flex justify-end">
                    <img
                      src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Mentorships"
                      className="h-12 md:h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </Link>

              {/* Card 3: Projects */}
              <Link to="/projects" className="hover:text-blue-600">
                <div className="bg-blue-100 rounded-lg p-3 flex flex-col min-h-[120px]">
                  <h3 className="text-sm md:text-base font-semibold text-blue-800 mb-1">Projects</h3>
                  <p className="text-xs md:text-sm text-blue-700">Explore Diverse Careers</p>
                  <div className="flex-grow" />
                  <div className="mt-2 flex justify-end">
                    <img
                      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Jobs"
                      className="h-12 md:h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </Link>

              {/* Card 4: More */}
              <div className="bg-green-100 rounded-lg p-3 flex flex-col min-h-[120px]">
                <h3 className="text-sm md:text-base font-semibold text-green-800 mb-1">More</h3>
                <p className="text-xs md:text-sm text-green-700">Refine Skills Daily</p>
                <div className="flex-grow" />
                <div className="mt-2 flex justify-end">
                  <img
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Practice"
                    className="h-12 md:h-16 object-cover rounded-lg"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
