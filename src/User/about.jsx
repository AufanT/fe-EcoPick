import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const About = () => {
  // Data Team
  const mentors = [
    { name: "Rizki Dafa Nadi", role: "Machine Learning", image: "/images/avatar.png" },
    { name: "Annisa Syahbania A.", role: "Web Programming", image: "/images/avatar.png" },
  ];

  const projectManager = [
    { name: "M. Davi Syauqi", role: "Machine Learning", image: "/images/avatar.png" },
  ];

  const members = [
    { name: "Alya Sofisa Nabiela", role: "UI/UX", image: "/images/avatar.png" },
    { name: "Alvina Rostinda", role: "Web Programming", image: "/images/avatar.png" },
    { name: "Leila Qadriyah", role: "Web Programming", image: "/images/avatar.png" },
    { name: "Aulian T.", role: "Web Programming", image: "/images/avatar.png" },
    { name: "Izzatul Mahliyah", role: "Network Engineering", image: "/images/avatar.png" },
    { name: "Alif Ilham P.", role: "Network Engineering", image: "/images/avatar.png" },
    { name: "Dea Arlia", role: "Machine Learning", image: "/images/avatar.png" },
    { name: "Fathurrahman A.", role: "Machine Learning", image: "/images/avatar.png" },
    { name: "Hanavik", role: "Machine Learning", image: "/images/avatar.png" },
    { name: "Kevin Rahmat I.", role: "Machine Learning", image: "/images/avatar.png" },
    { name: "M. Aulia Jabbar", role: "Machine Learning", image: "/images/avatar.png" },
    { name: "Jiyad Rifqi P.", role: "Machine Learning", image: "/images/avatar.png" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Button Back to Dashboard */}
      <div className="px-6 pt-10 pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300 group w-fit"
        >
          <svg
            className="w-4 h-4 text-gray-600 group-hover:text-green-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">
            Back to Dashboard
          </span>
        </Link>
      </div>

      <div className="pt-5">
        {/* Hero Section */}
        <section className="relative bg-[#C5FFDB] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-green-600">EcoPick</span>
              </h1>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                We're on a mission to make sustainable living accessible, affordable, and effortless for everyone. Join us in creating a greener future, one product at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                The passionate individuals behind EcoPick's mission to make sustainability accessible.
              </p>
            </div>

            {/* Team Section */}
            <section className="py-20 bg-white">
              <div className="max-w-5xl mx-auto px-4 space-y-16">

                {/* Mentor */}
                <div>
                  <h2 className="text-center text-2xl font-bold mb-10">Mentor</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-lg mx-auto">
                    {mentors.map((member, idx) => (
                      <div key={idx} className="text-center">
                        <div className="w-25 h-25 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                        <p className="text-gray-700 text-xs">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Project Manager */}
                <div>
                  <h2 className="text-center text-2xl font-bold mb-10">Project Manager</h2>
                  <div className="flex justify-center">
                    {projectManager.map((member, idx) => (
                      <div key={idx} className="text-center">
                        <div className="w-25 h-25 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                        <p className="text-gray-700 text-xs">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Member Section */}
                <div>
                  <h2 className="text-center text-2xl font-bold mb-8">Member</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 justify-items-center">
                    {members.map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="w-25 h-25 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                        <p className="text-gray-700 text-xs">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;

