"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import config from "@/config";
import Cookies from "js-cookie";

const StaffDashboard = () => {
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  const fetchAssignedIssues = async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${config.baseURL}/api/staff/tasks/assigned`, { headers });
      setAssignedIssues(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching assigned issues:", error);
    }
  };

  const filterIssuesByStatus = (status) => {
    setSelectedTab(status);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  let filteredIssues = assignedIssues;
  if (selectedTab !== "all") {
    filteredIssues = assignedIssues.filter((issue) => issue.status === selectedTab);
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">Assigned Issues</h1>
      <div className="mb-5">
        <ul className="flex border-b">
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                selectedTab === "all" ? "bg-red-600" : ""
              }`}
              onClick={() => filterIssuesByStatus("all")}
            >
              All
            </button>
          </li>
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                selectedTab === "pending" ? "bg-red-600" : ""
              }`}
              onClick={() => filterIssuesByStatus("pending")}
            >
              Pending
            </button>
          </li>
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                selectedTab === "progress" ? "bg-red-600" : ""
              }`}
              onClick={() => filterIssuesByStatus("progress")}
            >
              In Progress
            </button>
          </li>
          <li className="mr-3">
            <button
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                selectedTab === "completed" ? "bg-red-600" : ""
              }`}
              onClick={() => filterIssuesByStatus("completed")}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
      {filteredIssues.length > 0 ? (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <li key={issue._id}>
              <div className="border bg-white border-gray-200 rounded-md p-4">
                <h3 className="text-lg font-semibold mb-2">Issue Number: {issue.issueNumber}</h3>
                <p className="mb-2">Issue Details: {issue.issueDetails}</p>
                <p className="mb-2">Status: {issue.status}</p>
                <p className="mb-2">Name: {issue.name}</p>
                <p className="mb-2">Email: {issue.email}</p>
                <p className="mb-2">Phone: {issue.phone}</p>
                <p className="mb-2">Department: {issue.department}</p>
                <p className="mb-2">Place: {issue.place}</p>
                {/* Add any additional issue details you want to display */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assigned issues found.</p>
      )}
    </div>
  );
};

export default StaffDashboard;
