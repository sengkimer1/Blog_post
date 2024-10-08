import React from 'react';
interface CardProps {
    image: string;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
    return (
        <div className="w-2/12 rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base mt-2">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
