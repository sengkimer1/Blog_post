'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaVoicemail, FaLock } from 'react-icons/fa';
import axios from "axios";
import Button from "@/components/Button";
import img from '@/images/background.png';
import Image from 'next/image';
import profile from '@/images/profile.png'

interface UserFormInput {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<UserFormInput>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://students-hackaton.vercel.app/user/sign-in", {
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
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
        <div className="w-[500px] h-[660px] max-sm:w-[400px] p-10 space-y-[10%] bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black">LOGIN</h2>
          </div>
          <div className="flex items-center justify-center">
          <Image
            src={profile}
            alt="A description of the image"
            width={200}
            height={300} 
            quality={75} 
            className="rounded-full"
          />
          </div>
          

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mb-10">
              <FaVoicemail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                name="email"
                placeholder="EMAIL"
                onChange={handleInputChange}
                value={formData.email}
                className="w-full pl-10 py-2 text-black bg-transparent border-b border-black placeholder-black focus:outline-none focus:border-black"
              />
            </div>
            <div className="relative mb-12">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                onChange={handleInputChange}
                value={formData.password}
                className="w-full pl-10 py-2 text-black bg-transparent border-b border-black placeholder-black focus:outline-none focus:border-black"
              />
            </div>
            <Button onClick={handleLogin} loading={loading} error={error}>
              Login
            </Button>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-black underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
