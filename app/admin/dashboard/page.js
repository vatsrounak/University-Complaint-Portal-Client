"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import config from "@/config";
import Cookies from "js-cookie";

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [staffMembers, setStaffMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
    fetchStaffMembers();
  }, []);

  const fetchIssues = async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await axios.get(`${config.baseURL}/api/admin/issues`, { headers });
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await axios.get(`${config.baseURL}/api/admin/staff`, { headers });
      setStaffMembers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  const handleUpdateStatus = async (issueId, status) => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await axios.put(
        `${config.baseURL}/api/admin/issue/status`,
        {
          issueId,
          status
        },
        { headers }
      );
      console.log("Issue status updated:", response.data);
      fetchIssues(); // Fetch updated issues after status update
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };

  const handleAssignStaff = async (issueId, event) => {
    try {
      const selectedStaffId = event.target.value;
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = {
        issueId,
        staffId: selectedStaffId,
      };
      const response = await axios.put(
        `${config.baseURL}/api/admin/issue/assign`,
        body,
        { headers }
      );
      alert("Issue assigned to staff");
      console.log(response.data);
      // Fetch the updated list of issues
      fetchIssues();
    } catch (error) {
      alert("Failed to assigned to staff. Please try again!");
      console.error("Error assigning staff to issue:", error);
    }
  };




  const filterIssuesByStatus = (status) => {
    setSelectedTab(status);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  let filteredIssues = issues;
  if (selectedTab !== "all") {
    filteredIssues = issues.filter((issue) => issue.status === selectedTab);
  }

  return (
    <div>
      <h1 className="font-bold mt-4 text-5xl mb-7">Admin Dashboard</h1>
      <h1 className="font-bold text-3xl mb-5">Issues</h1>
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
        <ul className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <li key={issue._id} className="mb-4">
              <div className="bg-white p-6 m-2 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Issue Number: {issue.issueNumber}</h3>
                <p className="mb-2">Issue Details: {issue.issueDetails}</p>
                <p className="mb-2">Name: {issue.name}</p>
                <p className="mb-2">Email: {issue.email}</p>
                <p className="mb-2">Phone: {issue.phone}</p>
                <p className="mb-2">Department: {issue.department}</p>
                <p className="mb-2">Place: {issue.place}</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
                      Status
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="status"
                      name="status"
                      value={issue.status}
                      onChange={(e) => handleUpdateStatus(issue._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="staff">
                      Assign to Staff
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                      id="staff"
                      name="staff"
                      value={issue.assigned || ""}
                      onChange={(e) => handleAssignStaff(issue._id, e)}
                    >
                      <option value="">Select Staff</option>
                      {staffMembers.map((staff) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
