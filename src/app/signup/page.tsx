'use client';
import React, { useState } from 'react';
import Input from '@/components/input';
import img from '@/images/background.png';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock,FaVoicemail,FaRegUser} from 'react-icons/fa';


const CreateAccountForm: React.FC = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://students-hackaton.vercel.app/user/sign-up", {
        lastName: formData.lastName,
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("time", new Date().getTime().toString());

      router.push("/"); 
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `URL(${img.src})`,
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome to Blog Post</h2>
        <h3 className="text-1xl font-bold mb-6 text-center">Create New Account</h3>

        <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="relative ">
        <FaUser className="absolute left-3 top-11 transform -translate-y-1/2 text-black" />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="my-custom-class"
          /></div>
             <div className="relative ">
             <FaRegUser className="absolute left-3 top-11 transform -translate-y-1/2 text-black" />
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="my-custom-class"
          /></div>
            <div className="relative ">
            <FaVoicemail className="absolute left-3 top-11 transform -translate-y-1/2 text-black" />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="my-custom-class"
          /></div>
          <div className="relative ">
          <FaLock className="absolute left-3 top-11 transform -translate-y-1/2 text-black" />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="my-custom-class"
          /></div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link href="/login" className="text-indigo-600 ml-3 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
