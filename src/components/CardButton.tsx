import React from 'react';

interface CardProps {
    label: string;
    className?: string;
}

const CardButton: React.FC<CardProps> = ({ label, className = '' }) => {
    return (
        <div>
            <button
                className={`px-4 py-2 text-black font-bold shadow-lg rounded ${className} transform transition-transform hover:-rotate-2`}
            >
                {label}
            </button>
        </div>
    );
};

export default CardButton;
