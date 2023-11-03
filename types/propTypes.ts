import { IconType } from "react-icons";

export interface NavLinkProps {
    route: string;
    children: React.ReactNode;
    color?: string;
    large?: boolean;
    onClick?: React.MouseEventHandler<Element>;
}

export interface InputProps {
    id: string,
    placeholder: string;
    icon: IconType;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export interface ButtonProps {
    id: string,
    title: string;
    type: 'submit' | 'button' | 'reset'
    disabled?: boolean
}