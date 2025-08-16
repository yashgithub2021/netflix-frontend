import { create } from 'zustand'
import { variables } from '../utils/constants'
import axios from 'axios'
import toast from 'react-hot-toast'

const useAuthStore = create((set) => ({
    isSigningUp: false,
    email: "",
    isVerifyingOtp: false,
    signUpMessage: "",
    token: "",
    isLogging: false,
    isLoading: false,

    signUp: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post(`${variables.BACKEND_URL}/users/register`, credentials);
            set({ isSigningUp: false, email: credentials.email });
            toast.success("OTP Sent to your email");
            return { success: true }
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({ isSigningUp: false, signUpMessage: "" });
        }
    },

    verifyOtp: async (otp) => {
        set({ isVerifyingOtp: true })
        try {
            const response = await axios.post(`${variables.BACKEND_URL}/users/verify-otp`, otp);
            set({ isVerifyingOtp: false, email: "" });
            localStorage.setItem('token', response.data.token)
            toast.success("OTP Verified Successfully");
            return { success: true, token: response.data.token }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Signup failed");
            set({ isVerifyingOtp: false, token: "", });
        }
    },

    login: async (data) => {
        set({ isLogging: true })
        try {
            const response = await axios.post(`${variables.BACKEND_URL}/users/login`, data)
            set({ isLogging: false, email: data.email })
            toast.success("OTP Sent to your email");
            return { success: true }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!")
            set({ isLogging: false, email: "" })
        }
    },

    getProfile: async (token) => {
        set({ isLogging: true })
        try {
            const response = await axios.get(`${variables.BACKEND_URL}/users/profile`, { headers: { 'Authorization': token } })
            set({ isLogging: false })
            return { success: true, user: response?.data.user }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!")
            set({ isLogging: false })
        }
    },

    updateProfile: async (data, token) => {
        set({ isLoading: true })
        try {
            const response = await axios.patch(`${variables.BACKEND_URL}/users/profile`, data, { headers: { 'Authorization': token } })
            set({ isLoading: false })
            toast.success(response.data.message);
            return { success: true, user: response?.data.user }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!")
            set({ isLoading: false })
        }
    },

    createOrder: async (data, token) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${variables.BACKEND_URL}/payments/create-order`, data, { headers: { 'Authorization': token } })
            set({ isLoading: false })
            toast.success(response.data.message);
            return { success: true, response: response?.data.response }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!")
            set({ isLoading: false })
        }
    }
}))

export default useAuthStore;