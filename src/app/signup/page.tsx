'use client'
import React, { useState } from 'react';
import Input from '@/components/input'

const CreateAccountForm: React.FC = () => {
  const [formData, setFormData] = useState({
    lastname: '',
    fristname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome</h2>
        <h3 className='text-1xl font-bold mb-4 text-center'>Create New Account</h3>
        <div className="border-t border-gray-300 my-4"></div>

        <form className="space-y-4">

          <Input
            label="Last Name"
            name="last name"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="my-custom-class"
          />
          <Input
            label="First Name"
            name="first name"
            value={formData.fristname}
            onChange={handleChange}
            placeholder="Enter your frist name"
            className="my-custom-class"
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="my-custom-class"
          />
          <Input
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="my-custom-class"
          />

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors">
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <a href="#" className="text-indigo-600 font-medium hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
