import React, { ChangeEvent } from 'react';

interface InputProps {
    label?: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    placeholder = '', 
    className = '' 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-semibold mb-1" htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 py-2 text-black bg-transparent border-b border-black placeholder-black focus:outline-none focus:border-black"
                />
        </div>
    );
};

export default Input;
