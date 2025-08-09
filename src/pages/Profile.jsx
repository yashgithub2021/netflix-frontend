import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import { useRazorpay } from "react-razorpay";
import toast from 'react-hot-toast'

const Profile = () => {
    const { getProfile, createOrder } = useAuthStore()
    const { error, isLoading, Razorpay } = useRazorpay();
    const [profile, setProfile] = useState({})

    const fetchProfile = async () => {
        const result = await getProfile()
        if (result.success) {
            setProfile(result.user)
        }
    }
    useEffect(() => {
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setProfile({ ...profile, [e.target.name]: [e.target.value] })
    }

    const handlePayment = async () => {
        const result = await createOrder()
        const options = {
            key: "rzp_test_IzxkEJusFQPbrv",
            amount: result.amount, // Amount in paise
            currency: "INR",
            name: "Netflix",
            description: "Netflix Clone",
            order_id: result.id, // Generate order_id on server
            handler: (response) => {
                fetchProfile()
                toast.success("Payment Successful!")
            },
            prefill: {
                name: "John Doe",
                email: "john.doee@example.com",
                contact: "9999999998",
            },
            theme: {
                color: "#F37254",
            },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    };
    return (
        <div className="min-h-screen w-full hero-bg flex flex-col items-center justify-center py-10">
            {/* Netflix Logo */}
            <img src="/netflix-logo.png" alt="Netflix Logo" className="w-40 mb-8 drop-shadow-lg" />

            {/* Profile Card */}
            <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center mb-8">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/avatar2.png" alt="Avatar" className="w-24 h-24 rounded-full border-4 border-red-600 shadow-lg object-cover bg-gray-800" />
                    <span className="text-gray-400 text-sm mt-2">User Avatar</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-6 text-center tracking-wide">Profile</h2>
                <form className="w-full space-y-5">
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={profile.name}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            onChange={handleChange}
                            value={profile.phone}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition text-lg shadow-md"
                    // disabled={saving}
                    >
                        {'Save Changes'}
                    </button>
                </form>
            </div>

            {/* Payment Section */}
            <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col items-center border border-red-700">
                <h3 className="text-xl font-bold text-white mb-2">Subscription & Payment</h3>
                <p className="text-gray-300 mb-4 text-center text-sm">Manage your subscription and make payments to continue enjoying premium content.</p>
                {
                    profile.paid
                        ? <button
                            className="w-full py-2 bg-gradient-to-r bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition text-lg shadow-md"
                            disabled={true}
                        >
                            Already Subscribed !
                        </button>
                        : <button
                            className="w-full py-2 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-500 transition text-lg shadow-md"
                            // onClick={() => toast('Payment feature coming soon!', { icon: '💳' })}
                            onClick={handlePayment}
                        >
                            Make Payment
                        </button>
                }
                {/* <button
                    className="w-full py-2 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-500 transition text-lg shadow-md"
                    // onClick={() => toast('Payment feature coming soon!', { icon: '💳' })}
                    onClick={handlePayment}
                >
                    {'Make Payment'}
                </button> */}
            </div>
        </div>
    )
}

export default Profile