import React, { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    id?: string;
    className?: string;
    children: ReactNode;
    loading?: boolean;
    error?: string;
}

const Button: FC<ButtonProps> = ({
    type = 'button',
    onClick,
    id,
    className = '',
    children,
    loading = false,
    error = ''
}) => {
    return (
        <div className="flex flex-col text-center gap-4">
            <button
                className={`w-full py-2 px-4 font-bold text-white bg-black rounded focus:outline-none focus:shadow-outline ${className}`}
                type={type}
                onClick={onClick}
                disabled={loading}
                id={id}
            >
                {loading ? "Logging in..." : children}
            </button>
            <div className="text-sm">
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Button;
