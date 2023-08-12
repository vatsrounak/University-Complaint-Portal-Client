"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import config from "@/config";
import Cookies from "js-cookie";

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    place: "",
    issueDetails: ""
  });
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const token = getToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await axios.get(`${config.baseURL}/api/users/issues`, { headers });
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };
  
  const getToken = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      .split('=')[1];

    return token;
  };

  const filterIssuesByStatus = (status) => {
    setSelectedTab(status);
  };

  const filteredIssues = selectedTab === "all" ? issues : issues.filter((issue) => issue.status === selectedTab);

  const handleEditIssue = (issue) => {
    setSelectedIssue(issue);
    setFormData({
      name: issue.name,
      phone: issue.phone,
      department: issue.department,
      place: issue.place,
      issueDetails: issue.issueDetails
    });
  };

  const handleCancelEdit = () => {
    setSelectedIssue(null);
    setFormData({
      name: "",
      phone: "",
      department: "",
      place: "",
      issueDetails: ""
    });
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveEdit = async () => {
    if (!selectedIssue) return;
    setIsSaving(true);
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await axios.put(
        `${config.baseURL}/api/users/issue/${selectedIssue._id}`,
        formData,
        { headers }
      );
      console.log("Issue updated:", response.data);
      setSelectedIssue(null);
      setFormData({
        name: "",
        phone: "",
        department: "",
        place: "",
        issueDetails: ""
      });
      setIsSaving(false);
      fetchIssues();
    } catch (error) {
      console.error("Error updating issue:", error);
      setIsSaving(false);
      alert("Failed to save the issue");
    }
  };


  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">My Issues</h1>
      <div className="mb-5">
        <ul className="flex border-b">
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${selectedTab === "all" ? "bg-red-600" : ""
                }`}
              onClick={() => filterIssuesByStatus("all")}
            >
              All
            </button>
          </li>
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${selectedTab === "pending" ? "bg-red-600" : ""
                }`}
              onClick={() => filterIssuesByStatus("pending")}
            >
              Pending
            </button>
          </li>
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${selectedTab === "progress" ? "bg-red-600" : ""
                }`}
              onClick={() => filterIssuesByStatus("progress")}
            >
              In Progress
            </button>
          </li>
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${selectedTab === "completed" ? "bg-red-600" : ""
                }`}
              onClick={() => filterIssuesByStatus("completed")}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
      {filteredIssues.length > 0 ? (
        <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <li key={issue._id} className="mb-4">
              {selectedIssue && selectedIssue._id === issue._id ? (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Editing Issue Number: {issue.issueNumber}</h3>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="department">
                      Department
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="department"
                      name="department"
                      type="text"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="place">
                      Place
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="place"
                      name="place"
                      type="text"
                      value={formData.place}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="issueDetails">
                      Issue Details
                    </label>
                    <textarea
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="issueDetails"
                      name="issueDetails"
                      value={formData.issueDetails}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={handleSaveEdit}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>

                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 m-2 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Issue Number: {issue.issueNumber}</h3>
                  <p className="mb-2">Issue Details: {issue.issueDetails}</p>
                  <p className="mb-2">Status: {issue.status}</p>
                  <p className="mb-2">Name: {issue.name}</p>
                  <p className="mb-2">Email: {issue.email}</p>
                  <p className="mb-2">Phone: {issue.phone}</p>
                  <p className="mb-2">Department: {issue.department}</p>
                  <p className="mb-2">Place: {issue.place}</p>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditIssue(issue)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
};

export default IssuesPage;
