"use client";
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
interface ICreatedBy {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

interface IblogData {
  thumbnail: string;
  title: string;
  desc: string;
  createdBy: ICreatedBy;
}

function View({ params }: { params: { id: string } }) {
  const [blogData, setBlogData] = useState<IblogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBlogData = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`https://students-hackaton.vercel.app/blog/get-blog/${params.id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }

        const data = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div>
       <div className="flex justify-center mt-4 max-w-5xl ">
    <Button onClick={handleBack} loading={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
      Back
    </Button>
  </div>
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white p-12 rounded-lg shadow-xl max-w-4xl w-full">
      <h2 className="text-4xl font-bold text-center mb-4">View Information</h2>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full h-[500px] rounded-lg shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={blogData?.thumbnail || "https://via.placeholder.com/400"}
            alt={blogData?.title || "Blog Image"}
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{blogData?.title || 'Title'}</h2>
        <p className="text-lg text-gray-600 max-w-3xl">
          {blogData?.desc || 'This is a sample description text.'}
        </p>
        <p className="text-gray-600 text-lg">
          {`Author: ${blogData?.createdBy?.firstName || 'Unknown'} ${blogData?.createdBy?.lastName || ''}`}
        </p>
      </div>
    </div>
  </div>
 
</div>

  );
}

export default View;
