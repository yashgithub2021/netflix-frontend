import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import useAuthStore from '../store/authStore';
import { isTokenExpired } from '../utils/checkToken';

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const { verifyOtp, email, isVerifyingOtp } = useAuthStore()
    const navigate = useNavigate()
    const handleOtpSubmit = async () => {
        const result = await verifyOtp(
            {
                otp: parseInt(otp),
                email
            }
        )
        if (result.success) {
            navigate('/')
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
                        Verify OTP
                    </h1>
                    <div className='flex justify-center items-center'>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            renderSeparator={
                                <span
                                >
                                    {"-"}
                                </span>
                            }
                            inputType='tel'
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                border: "1px solid transparent",
                                borderRadius: "8px",
                                width: "54px",
                                height: "54px",
                                fontSize: "2.5rem",
                                color: "white",
                                fontWeight: "400",
                                borderColor: "white",
                            }}
                            containerStyle={{ justifyContent: 'space-evenly', width: '100%' }}
                            focusStyle={{
                                border: "1px solid white",
                                outline: "none"
                            }}
                        />
                    </div>
                    <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700' onClick={handleOtpSubmit}>{isVerifyingOtp ? 'Loading' : 'Verify OTP'}</button>
                    <div className='text-center test-gray-400'>
                        <Link to='/signup' className='text-red-500 hover:underline ml-4'>Resend OTP</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpPage