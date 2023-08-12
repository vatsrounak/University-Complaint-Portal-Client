"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import Cookies from "js-cookie";

const StaffPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabs, setActiveTabs] = useState({});

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
        const token = Cookies.get("token"); 
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${config.baseURL}/api/admin/staff`, {
        headers,
      });
      setStaffList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const filterTasksByStatus = (tasks, status) => {
    if (status === "all") {
      return tasks;
    } else {
      return tasks.filter((task) => task.status === status);
    }
  };

  const handleTabClick = (staffId, status) => {
    setActiveTabs((prevActiveTabs) => ({
      ...prevActiveTabs,
      [staffId]: status,
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">Staff List</h2>
      {staffList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {staffList.map((staff) => (
            <div key={staff._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{staff.name}</h3>
              <p className="mb-2">Email: {staff.email}</p>
              <p className="mb-2">
                Total Tasks: {staff.totalTasks} | Completed Tasks: {staff.completedTasks}
              </p>
              <div className="mt-4">
                <ul className="flex border-b">
                  <li className="mr-4">
                    <button
                      className={`font-bold border-b-2 ${
                        activeTabs[staff._id] === "all" ? "border-red-500" : ""
                      }`}
                      onClick={() => handleTabClick(staff._id, "all")}
                    >
                      All Tasks
                    </button>
                  </li>
                  <li className="mr-4">
                    <button
                      className={`font-bold border-b-2 ${
                        activeTabs[staff._id] === "pending" ? "border-red-500" : ""
                      }`}
                      onClick={() => handleTabClick(staff._id, "pending")}
                    >
                      Pending
                    </button>
                  </li>
                  <li className="mr-4">
                    <button
                      className={`font-bold border-b-2 ${
                        activeTabs[staff._id] === "progress" ? "border-red-500" : ""
                      }`}
                      onClick={() => handleTabClick(staff._id, "progress")}
                    >
                      In Progress
                    </button>
                  </li>
                  <li className="mr-4">
                    <button
                      className={`font-bold border-b-2 ${
                        activeTabs[staff._id] === "completed" ? "border-red-500" : ""
                      }`}
                      onClick={() => handleTabClick(staff._id, "completed")}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
                <div className="mt-4">
                  {activeTabs[staff._id] === "all" && (
                    <div>
                      {staff.tasks.map((task) => (
                        <div
                          key={task._id}
                          className={`${
                            task.status === "completed" ? "bg-green-200" : "bg-red-200"
                          } p-4 rounded-lg mb-4`}
                        >
                          <p className="font-bold mb-1">Issue Number: {task.issueNumber}</p>
                          <p>Issue Details: {task.issueDetails}</p>
                          <p>Status: {task.status}</p>
                          <p>Name: {task.name}</p>
                          <p>Email: {task.email}</p>
                          <p>Phone: {task.phone}</p>
                          <p>Department: {task.department}</p>
                          <p>Place: {task.place}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTabs[staff._id] === "pending" && (
                    <div>
                      {filterTasksByStatus(staff.tasks, "pending").map((task) => (
                        <div
                          key={task._id}
                          className={`bg-red-200 p-4 rounded-lg mb-4`}
                        >
                          <p className="font-bold mb-1">Issue Number: {task.issueNumber}</p>
                          <p>Issue Details: {task.issueDetails}</p>
                          <p>Status: {task.status}</p>
                          <p>Name: {task.name}</p>
                          <p>Email: {task.email}</p>
                          <p>Phone: {task.phone}</p>
                          <p>Department: {task.department}</p>
                          <p>Place: {task.place}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTabs[staff._id] === "progress" && (
                    <div>
                      {filterTasksByStatus(staff.tasks, "progress").map((task) => (
                        <div
                          key={task._id}
                          className={`bg-red-200 p-4 rounded-lg mb-4`}
                        >
                          <p className="font-bold mb-1">Issue Number: {task.issueNumber}</p>
                          <p>Issue Details: {task.issueDetails}</p>
                          <p>Status: {task.status}</p>
                          <p>Name: {task.name}</p>
                          <p>Email: {task.email}</p>
                          <p>Phone: {task.phone}</p>
                          <p>Department: {task.department}</p>
                          <p>Place: {task.place}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTabs[staff._id] === "completed" && (
                    <div>
                      {filterTasksByStatus(staff.tasks, "completed").map((task) => (
                        <div
                          key={task._id}
                          className={`bg-green-200 p-4 rounded-lg mb-4`}
                        >
                          <p className="font-bold mb-1">Issue Number: {task.issueNumber}</p>
                          <p>Issue Details: {task.issueDetails}</p>
                          <p>Status: {task.status}</p>
                          <p>Name: {task.name}</p>
                          <p>Email: {task.email}</p>
                          <p>Phone: {task.phone}</p>
                          <p>Department: {task.department}</p>
                          <p>Place: {task.place}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No staff found.</p>
      )}
    </div>
  );
};

export default StaffPage;
