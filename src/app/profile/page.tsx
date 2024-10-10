"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import img from '@/images/background.png';
import Button from '@/components/Button';
import axios from "axios";


const ProfilePage = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState(''); // Add state for bio
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    // Fetch user data from API
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            try {
                const response = await fetch('https://students-hackaton.vercel.app/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();

                setProfileImage(data.avatar);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber || '');
                setBio(data.bio || ''); 

            } catch (err) {
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('Logging out...');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Logged out successfully');
            localStorage.removeItem('token');
            router.push('/login');
        } catch (err) {
            setError('Logout failed.');
            console.error('Logout failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://students-hackaton.vercel.app/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    bio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedData = await response.json();
            setFirstName(updatedData.firstName);
            setLastName(updatedData.lastName);
            setEmail(updatedData.email);
            setPhoneNumber(updatedData.phoneNumber || '');
            setBio(updatedData.bio || ''); 
            setIsEditing(false);
            router.push('/profile'); 
        } catch (err) {
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setError(null);
    
        const token = localStorage.getItem('token');
        const file = event.target.files?.[0]; 
    
        if (!file) {
            setLoading(false);
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await axios.post("https://students-hackaton.vercel.app/upload/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("Image uploaded successfully:", response.data);

            const avatarUrl = response.data.url; 
    
            const updateResponse = await fetch('https://students-hackaton.vercel.app/user/change-profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ avatar: avatarUrl }),
            });
    
            if (!updateResponse.ok) {
                throw new Error('Failed to update profile');
            }
            setProfileImage(avatarUrl);
        } catch (err) {
            setError('Failed to upload and update image.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${img.src})`,
            }}
        >
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center border-4 border-gray-400">
                                <span className="text-gray-700">No Image</span>
                            </div>
                        )}
                    </div>
                    <label htmlFor="profileImage" className="cursor-pointer text-blue-600 hover:underline">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="flex w-full space-x-12 p-5 border border-gray-300 rounded-lg shadow-md bg-white mt-4 items-center justify-center">
                    <div className="text-gray-600 font-semibold w-full">
                        <h4 className="mb-2">First Name</h4>
                        <h4 className="mb-2">Last Name</h4>
                        <h4 className="mb-2">Email</h4>
                        <h4 className="mb-2">Phone Number</h4>
                        <h4 className="mb-4">Bio</h4> 
                    </div>
                    <div className="text-gray-800">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={!isEditing}
                            className="border-b-2 border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!isEditing}
                            className="border-b-2 border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="border-b-2 border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={!isEditing}
                            className="border-b-2 border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
                        />
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            disabled={!isEditing}
                            className="border-b-2 border-gray-300 mb-4 focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Write a short bio..."
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="flex space-x-4 mt-4">
                    {isEditing ? (
                        <Button
                            type="button"
                            onClick={handleUpdateProfile}
                            className="bg-green-500 text-white"
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={toggleEditMode}
                            className="bg-blue-500 text-white"
                        >
                            Edit
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={handleLogout}
                        loading={loading}
                        className="bg-red-500 text-white"
                    >
                        {loading ? 'Logging out...' : 'Logout'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
