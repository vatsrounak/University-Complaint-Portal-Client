"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '@/config';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: '',
    place: '',
  });
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${config.baseURL}/api/users/profile`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setProfile(response.data);
      setFormData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

    fetchProfile();
  }, []);

  
  
  const getToken = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      .split('=')[1];

    return token;
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsSaving(true);
    e.preventDefault();
    try {
      const response = await axios.put(`${config.baseURL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setProfile(response.data);
      setIsSaving(false);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form className='bg-white rounded shadow p-5' onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="mobile">
            Mobile
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
            id="mobile"
            name="mobile"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="flex justify-end">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" type="submit">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
