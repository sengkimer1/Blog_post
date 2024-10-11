import React from 'react';
import CardButton from './CardButton';

interface CardProps {
  image: string;
  title: string;
  image1: string;
  description: string;
  firstname: string;
  lastname: string;
}

const Card: React.FC<CardProps> = ({ image, image1, firstname, lastname, title, description }) => {
  return (
    <div className="w-full h-[100%] shadow-lg bg-white">
      <div className='flex'>
        <div className='flex-1'>
          <img className="object-cover" src={image1} alt={title} />
        </div>
        <div className='flex-1'>
          <div className='flex gap-5 mt-6 justify-start'>
            <p>{firstname}</p>
            <p>{lastname}</p>
          </div>

        </div>
      </div>
      <div className='w-full p-5'>
        <img className="object-cover" src={image} alt={title} />
      </div>

      <div className="px-6 py-6">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mt-2">
          {description}
        </p>
      </div>
      <div className='flex gap-10 p-5'>
        <CardButton label='Update' className='bg-transparent border-2 border-green-500' />
        <CardButton label='Delete' className='bg-transparent border-2 border-red-500' />
      </div>
    </div>
  );
};

export default Card;
