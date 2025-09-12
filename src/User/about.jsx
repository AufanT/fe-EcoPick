import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const mentors = [
    { name: "Rizki Dafa Naldi", role: "Machine Learning", image: "/public/fotodafa.jpg" },
    { name: "Annisa Syahbania A.", role: "Web Programming", image: "/public/fotokaknisa.jpg" },
  ];

  const projectManager = [
    { name: "M. Dawi Syauqi", role: "Machine Learning", image: "/public/fotodawi.jpg" },
  ];

  const members = [
    { name: "Alya Salsa Nabila", role: "UI/UX", image: "/public/fotoalya.jpg" },
    { name: "Alvina Roslinda", role: "Web Programming", image: "/images/avatar.png" },
    { name: "Laila Qadriyah", role: "Web Programming", image: "/public/fotolaila.jpg" },
    { name: "Aufan T.", role: "Web Programming", image: "/images/avatar.png" },
    { name: "Izzatul Mahdiyah", role: "Network Engineering", image: "/public/fotoimah.jpg" },
    { name: "Alif Ilham P.", role: "Network Engineering", image: "/images/avatar.png" },
    { name: "Dea Arlia", role: "Machine Learning", image: "/public/fotodea.jpg" },
    { name: "Fathurrahman A.", role: "Machine Learning", image: "/public/fotofathur.jpg" },
    { name: "Hanaviz", role: "Machine Learning", image: "/public/fotohanaviz.jpg" },
    { name: "Kevin Rahmat I.", role: "Machine Learning", image: "/public/fotokevin.jpg" },
    { name: "M. Aulia Jabbar", role: "Machine Learning", image: "/public/fotojabbar.jpg" },
    { name: "Jiyad Rifqi P.", role: "Machine Learning", image: "/images/avatar.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Button Back to Dashboard */}
      <div className="px-6 pt-10 pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 
                     hover:shadow-md hover:border-green-400 transition-all duration-300 group w-fit"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">
            Back to Dashboard
          </span>
        </Link>
      </div>

      <div className="pt-5">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-100 via-[#C5FFDB] to-green-200 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              About <span className="text-green-600">EcoPick</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make sustainable living accessible, affordable, and effortless
              for everyone. 🌍✨ <br />
              Join us in creating a greener future, one product at a time.
            </p>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="text-green-600">Team</span>
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                The passionate individuals behind EcoPick's mission to make sustainability
                accessible.
              </p>
            </div>

            <div className="space-y-20">
              {/* Mentor */}
              <div>
                <h2 className="text-center text-2xl font-bold mb-10">Mentor</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center">
                  {mentors.map((member, idx) => (
                    <div
                      key={idx}
                      className="text-center transform transition duration-300 hover:scale-105"
                    >
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Manager */}
              <div>
                <h2 className="text-center text-2xl font-bold mb-10">Project Manager</h2>
                <div className="flex justify-center">
                  {projectManager.map((member, idx) => (
                    <div
                      key={idx}
                      className="text-center transform transition duration-300 hover:scale-105"
                    >
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden shadow-md">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members */}
              <div>
                <h2 className="text-center text-2xl font-bold mb-10">Members</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
                  {members.map((member, idx) => (
                    <div
                      key={idx}
                      className="text-center transform transition duration-300 hover:scale-105"
                    >
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden shadow-md">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                      <p className="text-gray-600 text-xs">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
