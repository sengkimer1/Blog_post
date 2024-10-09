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
      <div className="bg-white shadow-lg rounded-lg p-10 w-[500px] h-[660px] max-sm:w-[400px] ">
        <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>
        <h3 className="text-5 mb-10 text-center">Let’s get a start Create account with Name for using</h3>

        <form className="space-y-[10%]" onSubmit={handleSubmit}>
        <div className="relative ">
        <FaUser className="absolute left-3 top-5 transform -translate-y-1/2 text-black" />
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="LAST NAME"
            className="my-custom-class"
          /></div>
             <div className="relative ">
             <FaRegUser className="absolute left-3 top-5 transform -translate-y-1/2 text-black" />
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="FIRST NAME"
            className="my-custom-class"
          /></div>
            <div className="relative ">
            <FaVoicemail className="absolute left-3 top-5 transform -translate-y-1/2 text-black" />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="EMAIL"
            className="my-custom-class"
          /></div>
          <div className="relative ">
          <FaLock className="absolute left-3 top-5 transform -translate-y-1/2 text-black" />
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            className="my-custom-class"
          /></div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create New Account'}
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
