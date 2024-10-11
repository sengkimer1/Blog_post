'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import img from '@/images/background.png';
import Card from '@/components/Card';
import dayjs from 'dayjs';

interface BlogData {
  thumbnail: string;
  title: string;
  desc: string;
  _id:string;
  createdBy: {
    avatar: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
}

export default function Home() {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setBlogData(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setError('Failed to fetch blog data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData('https://students-hackaton.vercel.app/blog/get-all-blogs');
  }, []);

  return (
    <div className="h-[500px] max-sm:h-[650px] bg-cover bg-center"
      style={{
        backgroundImage: `URL(${img.src})`,
      }}
    >
      <Header />
      <div className='flex max-sm:flex-col max-sm:mt-[20%]'>
        <div className='flex-1 h-[415px] flex ml-[80px] mt-5 max-sm:ml-[20px] items-center'>
          <h1 className='text-[3rem] max-sm:text-[28px] text-white font-bold uppercase'>
            Behind the Scenes: <br />How We Made Blog <br /> Post Work for Us
          </h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='w-[75%] max-sm:w-[90%] mt-10'>
            <p className='text-[20px] text-white max-sm:text-[18px]'>
              Ready to dive into a world where ideas come alive and curiosity never sleeps?
              Whether you're here for a dose of inspiration, practical tips, or just a few moments of fun,
              you’re in the right place. Get cozy, grab your favorite drink,
              and let’s explore a story that’s bound to leave you thinking long after you’ve finished reading.
              Let’s make this time together unforgettable!
            </p>
            <div className='flex fixed top-0 w-[20%]'>
            <button
              onClick={() => fetchBlogData('https://students-hackaton.vercel.app/blog/get-all-blog-public')}
              className='w-[150%] py-2 text-white font-bold mt-10 rounded border-white hover:bg-blue-800'
            >
              GET ALL PUBLIC BLOGS
            </button>
            <button
              onClick={() => fetchBlogData('https://students-hackaton.vercel.app/blog/get-all-blogs')}
              className='w-[100%] py-2 text-white font-bold mt-10 rounded  border-white hover:bg-blue-800 ml-3'
            >
              GET ALL BLOGS
            </button>
            </div>
            
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-800 bg-opacity-75 text-white">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      )}
      {error && !loading && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
      <div className='grid grid-cols-5 mt-[5%] gap-5 container mx-auto max-sm:mt-[15.5%] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3'>
        {blogData.map((blog, index) => (
          <div key={index} className="flex justify-center">
            <Card
              image={blog.thumbnail}
              title={blog.title.substring(0, 20)}
              description={blog.desc.substring(0, 100)}
              image1={blog.createdBy.avatar}
              firstname={blog.createdBy.firstName}
              lastname={blog.createdBy.lastName.substring(0, 7)}
              date={dayjs(blog.createdBy.createdAt).format('YYYY-MM-DD')} id={blog._id}            />
          </div>
        ))}
      </div>
    </div>
  );
}

