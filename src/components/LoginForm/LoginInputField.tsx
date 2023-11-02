import React, { useState } from 'react';
import { InputProps } from '../../../types/propTypes';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function InputField ({ placeholder, icon: Icon, type, required, value, onChange }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordIcon = () => {
        setShowPassword(!showPassword);
    }

    const renderPasswordIcon = () => {
        if (showPassword) {
            return <BsEye onClick={togglePasswordIcon} />;
        } else {
            return <BsEyeSlash onClick={togglePasswordIcon} />;
        }
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="mt-2">
            {Icon && <Icon />} {/* Render the icon if it's provided */}
            <input
                type={inputType}
                placeholder={placeholder}
                name="first-name"
                id="first-name"
                required={required}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={value}
                onChange={onChange}
            />

            {type === 'password' && renderPasswordIcon()}
        </div>
    );
}
