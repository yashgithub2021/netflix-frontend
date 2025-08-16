import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../utils/checkToken'
import useAuthStore from '../store/authStore'

const LoginPage = () => {
    const navigate = useNavigate()
    const { login, isLogging } = useAuthStore()
    const [email, setEmail] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        const result = await login({ email })
        if (result.success) {
            navigate('/verify-otp')
        }
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
                        Login
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
                        <button className='w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700' onClick={handleLogin}>{isLogging ? 'Loading...' : 'Login'}</button>
                    </form>
                    <div className='text-center test-gray-400'>
                        Dont Have an Account?
                        <Link to='/signup' className='text-red-500 hover:underline ml-4'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage