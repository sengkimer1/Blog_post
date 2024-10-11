"use client";

import { useState } from 'react';
import axios from 'axios';
import img from '@/images/background.png';
import Button from '@/components/Button'
import { useRouter } from 'next/navigation';


const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

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
    const handleBack = () => {
        router.push('/');
      };
    return (
        <div
        className="flex items-center justify-center bg-cover bg-center "
        style={{
            backgroundImage: `url(${img.src})`,
        }}
    >
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl ">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Blog Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4  ">
                    {error && <div className="text-red-500">{error}</div>}
                    {successMessage && <div className="text-green-500">{successMessage}</div>}

                    <div>
                        <label htmlFor="title" className="block text-sm  font-bold">
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
                        <label htmlFor="thumbnail" className="block text-sm font-bold">
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
                        <label htmlFor="desc" className="block text-sm font-bold">
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
                <div className="flex justify-start mt-4 max-w-5xl ">
    <Button onClick={handleBack} loading={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
     Back
    </Button>
  </div>

            </div>
        </div>
         </div>
    );
};

export default BlogForm;
