"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use Next.js's useRouter
import { useParams } from 'react-router-dom'; 

function View() {
  // const router = useRouter(); // Get the router object
  const { id } = useParams();   const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return; // Ensure we have an 'id' before fetching
      try {
        const response = await fetch(`https://students-hackaton.vercel.app/blog/get-blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const data = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchBlogData();
    console.log(fetchBlogData)
  }, [id]); // Trigger fetching when 'id' is available



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-xl max-w-4xl w-full">
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
