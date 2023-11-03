import React from 'react';
import { ButtonProps } from '../../../types/propTypes';

const Button = ({id, title, type}: ButtonProps) => {
    return (
        <button 
            id={id}
            type={type}>
                {title}
        </button>
    )
};

export default Button;