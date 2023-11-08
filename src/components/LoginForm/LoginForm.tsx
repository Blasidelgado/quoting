import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import InputField from './LoginInputField';
import { loginUser } from '../../../helpers';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const router = useRouter();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            const loginRes = await loginUser({ name, password });

            if (loginRes && !loginRes.ok) {
                setSubmitError(loginRes.error || '');
            } else {
                router.push('/');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMsg = error.response?.data?.error;
                setSubmitError(errorMsg);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleLogin} className="max-w-xs">
                <InputField
                    id="login-username"
                    placeholder="Name"
                    type="text"
                    icon={AiOutlineMail}
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <InputField
                    id="login-password"
                    className="mt-2"
                    placeholder="Password"
                    type="password"
                    icon={AiOutlineUnlock}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <button
                    id="login-submit"
                    type="submit"
                    title="Login"
                    disabled={loading}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
            </form>
        </>
    );
};

export default LoginForm;
