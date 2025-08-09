import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { isTokenExpired } from '../utils/checkToken'

const SignUpPage = () => {
    const { signUp, isSigningUp, success } = useAuthStore()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        const result = await signUp({ email, name })
        if (result.success)
            navigate('/verify-otp')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            navigate('/');
        }
    }, []);

    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl flex justify-between items-center p-4 mx-auto'>
                <Link to='/'>
                    <img src="./netflix-logo.png" alt="" className='w-52' />
                </Link>
            </header>
            <div className='flex items-center justify-center mt-40 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-center text-white- font-bold text-2xl'>
                        Sign Up
                    </h1>
                    <form className='space-y-4'>
                        <div>
                            <label className='text-m font-medium text-gray-300 block'>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder='you@domain.com'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='text-m font-medium text-gray-300 block'>
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder='John Doe'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700' onClick={handleSignUp}>{isSigningUp ? "Loading..." : "Sign Up"}</button>
                    </form>
                    <div className='text-center test-gray-400'>
                        Already an Account?
                        <Link to='/login' className='text-red-500 hover:underline ml-4'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage