import React from 'react';
interface CardProps {
    thumbnail: string;
    title: string;
    desc: string;
  }
  
  const Card: React.FC<CardProps> = ({ thumbnail, title, desc }) => (
    <div className="bg-white rounded shadow p-4">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded" />
      <h2 className="font-bold text-lg mt-2">{title}</h2>
      <p className="mt-1 text-gray-700">{desc}</p>
      
    </div>
  );
  

export default Card;
