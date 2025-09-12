import React, { useState, useEffect, useRef } from 'react';
import { HiUser } from "react-icons/hi2";
import Sidebar from '../Components/Sidebar';
import { FooterAdmin } from '../Components/FooterAdmin';
import Header from '../Components/Header';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: ""
  });

  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const savedData = localStorage.getItem("adminData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        name: parsed.full_name || "",
        username: parsed.username || "",
        email: parsed.email || "",
        phoneNumber: parsed.phoneNumber || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("adminData", JSON.stringify(formData));
    alert("Profile updated!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <div className="bg-white border-t-4 border-black shadow-md p-3">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

      {/* Konten kanan */}
      <div className="flex flex-col flex-1">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex">
            {/* Foto profile */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-50 h-80">
              <div className="bg-gray-300 h-28 w-28 mt-13 flex items-center justify-center rounded-full overflow-hidden">
                {photo ? (
                  <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <HiUser className="text-7xl text-white" />
                )}
              </div>

              {/* Input file hidden */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={handleEditClick}
                className="bg-black text-white text-center rounded-md w-20 mt-4 cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Form data */}
            <div className="ml-6 flex-1">
              <div className="bg-white shadow-md rounded-2xl p-8 w-full">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-0.5">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-8 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-0.5">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full h-8 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-0.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-8 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-0.5">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full h-8 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 items-center">
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white px-4 py-1 rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer selalu di bawah */}
        <FooterAdmin />
      </div>
      </div>   
    </div>
  );
};

export default EditProfile;
