import React from 'react';
import Card from '@/components/Card';


const Profile: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>

      <Card
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhc2hssispbO3zF1kKTZVveE66UrAymcuXWw&s" 
        title="My Profile Card"
        description="This is a description for the profile card."
      />
    </div>
  );
};

export default Profile;
