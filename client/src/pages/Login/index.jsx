import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginRegisterLayout from '../../layout/LoginRegisterLayout'

function Login() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/hero');
        }
    }, []);



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        try {
            const response = await fetch('https://mercedesamgf1service.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('userId', data.user._id);
                localStorage.setItem('token', data.token);
                navigate('/hero')
            } else if (response.status === 401) {
                const data = await response.json();
                setError(data.message);
            } else {
                setError("Oops! Something went wrong.")
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Registration failed', error);
            setError(error.message);
        }
    };

    return (
        <LoginRegisterLayout>
            <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-black sm:px-6 lg:px-8">
                <div className="w-full max-w-md text-white">
                    <h1 className='py-6 text-5xl font-extrabold border-b-[0.2px] border-neutral-700 text-gray-50'>Account</h1>
                    <div className='flex mt-6 gap-x-4'>
                        <h2 className="text-2xl font-extrabold cursor-pointer">Login</h2>
                        <Link to="/register" className="text-2xl font-extrabold cursor-pointer text-neutral-500 hover:text-white">Create Account</Link>
                    </div>
                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="flex flex-col gap-y-4">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none appearance-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="relative block w-full px-4 py-3 bg-black border-[0.2px] rounded-none appearance-none placeholder-neutral-500 text-neutral-300 border-neutral-700 focus:outline-none focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <p className='text-sm text-red-500'>{error && error}</p>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-thin text-black bg-white border border-transparent rounded-sm text-sm focus:outline-none hover:border-b-4 border-b-4 border-white hover:border-b-[#00f5d0] hover:bg-neutral-200"
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </LoginRegisterLayout>
    );
}

export default Login;
