'use client'

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import img from '@/images/background.png';
import Card from '@/components/Card';
import CardButton from '@/components/CardButton';

interface BlogData {
  thumbnail: string;
  title: string;
  desc: string;
  createdBy: {
  avatar: string;
  firstName: string;
  lastName: string;
  };
  
}


export default function Home() {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(blogData, '===hello world')

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const token = localStorage.getItem('token');
        const res1 = await fetch(
          'https://students-hackaton.vercel.app/blog/get-all-blog-public',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res1.ok) {
          throw new Error('Network response was not ok');
        }

        const data1 = await res1.json();
        console.log('API response:', data1.blogs);
        setBlogData(data1.blogs || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to fetch blog data');
      } finally {
        setLoading(false);
      }
    }
    fetchBlogData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="h-[500px] max-sm:h-[650px] bg-cover bg-center "
      style={{
        backgroundImage: `URL(${img.src})`,
      }}
    >
      <Header />
      <div className='flex max-sm:flex-col max-sm:mt-[20%]'>
        <div className=' flex-1 h-[415px] flex ml-[80px] max-sm:ml-[20px] items-center'>
          <h1 className='text-[3rem] max-sm:text-[28px] text-white font-bold uppercase '>
            Behind the Scenes: <br />How We Made Blog <br /> Post Work for Us
          </h1>
        </div>
        <div className='flex-1 flex justify-center items-center '>
          <div className='w-[75%] max-sm:w-[90%] mt-5'>
            <p className='text-[20px] text-white max-sm:text-[18px]'>
              Ready to dive into a world where ideas come alive and curiosity never sleeps?
              Whether you're here for a dose of inspiration, practical tips, or just a few moments of fun,
              you’re in the right place. Get cozy, grab your favorite drink,
              and let’s explore a story that’s bound to leave you thinking long after you’ve finished reading.
              Let’s make this time together unforgettable!
            </p>
            <button className=' w-[50%] py-2 text-white font-bold mt-5 rounded-full border-solid border-2 border-white hover:bg-blue-800'>
              Begin the Journey
            </button>
          </div>
        </div>
      </div>
      

      <div className='grid grid-cols-5 mt-[5%] gap-5 container mx-auto max-sm:mt-[15.5%] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3'>
        {blogData.map((blog, index) => {
          return (
            <div key={index} className="flex justify-center">
              <Card
                image={blog.thumbnail}
                title={blog.title}
                description={blog.desc}
                image1={blog.createdBy.avatar}
                firstname={blog.createdBy.firstName}
                lastname={blog.createdBy.lastName}
              />
            </div>
          );
        })}
      </div>

    </div>
  )
}

