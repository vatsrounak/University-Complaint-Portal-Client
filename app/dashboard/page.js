"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
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
    otherIssue: ""
  });
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let departmentValue = formData.department;
    if (formData.department === "other") {
      departmentValue = formData.otherDepartment;
    }

    let issueValue = formData.issueDetails;
    if (formData.issueDetails === "other") {
      issueValue = formData.otherIssue;
    }

    const updatedFormData = {
      ...formData,
      department: departmentValue,
      issueDetails: issueValue,
    };

    const response = await axios.post(
      `${config.baseURL}/api/users/issue`,
      updatedFormData,
      { headers }
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      place: "",
      issueDetails: "",
      otherDepartment: "",
      otherIssue: "",
    });
    router.push("/dashboard/issues");
  } catch (error) {
    console.error("Error creating issue:", error);
  }
};

const getToken = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1];

  return token;
};

  return (
    <div className="flex h-screen">
      <main className="flex-grow p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
        </header>
        <div className="bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Create Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="other">Other</option>
              </select>
              {formData.department === "other" && (
                <div>
                  <label htmlFor="otherDepartment" className="block font-bold mb-1">
                    Other Department
                  </label>
                  <input
                    type="text"
                    id="otherDepartment"
                    name="otherDepartment"
                    value={formData.otherDepartment}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              )}
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
              <select
                id="issue"
                name="issueDetails"
                value={formData.issueDetails}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Issue</option>
                <option value="issue1">Issue 1</option>
                <option value="issue2">Issue 2</option>
                <option value="other">Other</option>
              </select>
              {formData.issueDetails === "other" && (
                <div>
                  <label htmlFor="otherIssue" className="block font-bold mb-1">
                    Other Issue
                  </label>
                  <input
                    type="text"
                    id="otherIssue"
                    name="otherIssue"
                    value={formData.otherIssue}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
