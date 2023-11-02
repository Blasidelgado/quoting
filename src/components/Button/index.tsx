import React from 'react'
import { ButtonProps } from '../../../types/propTypes'

const Button = ({ title, type}: ButtonProps) => {
    return (
        <button type={type}>
            {title}
        </button>
    )
}

export default Button