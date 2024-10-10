"use client";

import { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const file = event.target.files?.[0]; 

    if (!file) {
      setLoading(false);
      return;
    }

    // File validation (example: only allow images)
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF).');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file); 

      const response = await axios.post('https://students-hackaton.vercel.app/upload/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadedImageUrl = response.data.url;
      setThumbnail(uploadedImageUrl); 
      console.log('Image uploaded successfully:', uploadedImageUrl);
    } catch (err) {
      setError('Failed to upload image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    const newPost = {
      title,
      thumbnail,
      desc,
    };

    try {
      const response = await axios.post('https://students-hackaton.vercel.app/blog/create-blog', newPost, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Blog post created successfully!');
        setTitle('');
        setThumbnail('');
        setDesc('');
      } else {
        setError('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium">
          Thumbnail Image
        </label>
        <input
          type="file"
          id="thumbnail"
          onChange={handleImageChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
        {thumbnail && (
          <img src={thumbnail} alt="Thumbnail Preview" className="mt-2 h-20 w-20 object-cover" onError={(e) => { e.currentTarget.src = 'fallback-image-url'; }} />
        )}
      </div>

      <div>
        <label htmlFor="desc" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Blog Post'}
      </button>
    </form>
  );
};

export default BlogForm;
