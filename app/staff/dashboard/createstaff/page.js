"use client"

import { useState } from "react";
import axios from "axios";
import config from "@/config";
import Cookies from "js-cookie";

const CreateStaffPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleIsVerifiedChange = (e) => {
        setIsVerified(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
      
        try {
          const token = Cookies.get("token");
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.post(
            `${config.baseURL}/api/admin/createstaff`,
            {
              name,
              email,
              password,
              isVerified,
            },
            { headers }
          );
          console.log(response.data);
          // Clear form fields
          setName("");
          setEmail("");
          setPassword("");
          setIsVerified(false);
          // Show success message or redirect to staff list page
          alert("Staff Created Successfully");
          // ...
        } catch (error) {
          setError("Failed to create staff. Please try again.");
        }
      
        setIsLoading(false);
      };
      

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Create Staff</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="isVerified"
                            checked={isVerified}
                            onChange={handleIsVerifiedChange}
                            className="form-checkbox h-5 w-5 text-red-500"
                        />
                        <span className="ml-2 text-center text-gray-700">Is Verified</span>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        {isLoading ? "Creating Staff..." : "Create Staff"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStaffPage;
