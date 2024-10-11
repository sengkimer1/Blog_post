import React from 'react';
import Link from 'next/link'; // Import Link component

interface CardProps {
  image: string;
  title: string;
  image1: string;
  description: string;
  firstname: string;
  lastname: string;
  date: string;
  id: string; // Add ID to props
}

const Card: React.FC<CardProps> = ({ image, date, image1, firstname, lastname, title, description, id }) => {
  return (
    <Link href={`/view/${id}`} className="w-full h-[100%] shadow-lg bg-white"> 
      <div className='w-full p-5'>
        <img className="object-cover" src={image} alt={title} />
      </div>

      <div className="px-6 py-6">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mt-2">
          {description}
        </p>
      </div>
      <div className='flex'>
        <div className='flex-2 p-5 '>
          <img className="object-cover w-[60px] h-[60px]" src={image1} alt={title} />
        </div>
        <div className='flex-1'>
          <h5 className='mt-8'>Author</h5>
          <div className='flex gap-2 text-blue-600 justify-start'>
            <p>{firstname}</p>
            <p>{lastname}</p>
          </div>
        </div>
        <div className='flex-1 flex justify-center items-center mt-4'>
          <div className='text-[12px] bg-slate-300 py-2 px-2 rounded'>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
