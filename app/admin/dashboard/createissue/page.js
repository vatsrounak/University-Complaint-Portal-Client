"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import { useRouter } from "next/navigation";

import React from 'react'
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    place: "",
    issueDetails: "",
  });

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(`${config.baseURL}/api/users/issue`, formData, { headers });
      // Reset the form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        place: "",
        issueDetails: "",
      });

      alert("Response submitted successfully");
      // Fetch the updated list of issues
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </header>

        {/* Create Issue Form */}
        <div className="bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Create Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form inputs */}
            <div>
              <label htmlFor="name" className="block font-bold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-bold mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="department" className="block font-bold mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="place" className="block font-bold mb-1">
                Place
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="issue" className="block font-bold mb-1">
                Issue
              </label>
              <textarea
                id="issue"
                name="issueDetails" // Updated name attribute here
                value={formData.issueDetails}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
