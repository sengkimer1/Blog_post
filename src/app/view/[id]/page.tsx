"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js's useRouter
import { useParams } from 'react-router-dom'; 

interface IblogData{
  thumbnail:string,
  title:string,
  desc:string
}

function View({ params }: { params: { id: string } }) {
   
  const [blogData, setBlogData] = useState<IblogData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!params.id) return; 
      try {
        const response = await fetch(`https://students-hackaton.vercel.app/blog/get-blog/${params.id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const data = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (err) {
        console.error(err); 
        setLoading(false);
      }
    };
  
    fetchBlogData(); // Fetch blog data when component mounts or 'id' changes
  }, [params.id, token]); // Ensure you pass the token as a dependency if it changes
  



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className='text-2xl'>View information</h2>
        <div className="flex flex-col items-center text-center space-y-6">

          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-96 object-cover"
              src={blogData?.thumbnail || "https://via.placeholder.com/400"}
              alt={blogData?.title || "Blog Image"}
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{blogData?.title || 'Title'}</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {blogData?.desc || 'This is a sample description text.'}
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default View;
