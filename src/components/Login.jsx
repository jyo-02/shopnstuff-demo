import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../connectServer/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError('');
        setLoading(true);
        try {
            const response = await authService.login(data);
            console.log('Login Response:', response); // Log the entire response
    
            // Access tokens from the response
            const { accessToken, refreshToken } = response.data; // Update this line
    
            // Store tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
    
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
    
            const userData = await authService.getCurrentUser();
            if (userData) dispatch(authLogin({ userData }));
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-12 m-6 mb-28 border border-bg-[#35455f]">
                <div className="mb-2 flex justify-center">
                    <span className="w-full max-w-[150px] flex items-center justify-center">
                        <Logo width="150px" height="auto" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base ">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: "Email is required",
                                validate: {
                                    matchPattern: value =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address',
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
