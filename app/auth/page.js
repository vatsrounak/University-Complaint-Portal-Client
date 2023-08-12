"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import config from "@/config";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post(`${config.baseURL}/api/auth`, { email });
      setIsOtpSent(true);
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }

    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.put(`${config.baseURL}/api/auth`, { email, otp });
      const token = response.data.token;
      const userEmail = email;
      router.push("/dashboard");
      Cookies.set("token", token);
      Cookies.set("userEmail", userEmail);
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <section className="hero w-full h-screen bg-cover relative" style={{ backgroundImage: 'url(/bgimage.jpeg)' }}>
      <div className="bg-black bg-opacity-50 absolute inset-0">
        
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mt-5 mb-7">Sign in to your account</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isOtpSent ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  className="border border-gray-300 px-3 py-2 rounded-md mb-6 w-full"
                />
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-red-500 text-white px-4 mt-4 py-2 rounded-md"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </>
            ) : (
              <>
                <label htmlFor="email" className="text-gray-900 dark:text-gray-900">Enter your Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Institute Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="border border-gray-300 mt-3 px-3 py-2 rounded-md mb-6 w-full"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="bg-red-500 w-full text-white px-4 py-2 rounded-md"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>

  );
};

export default LoginPage;
