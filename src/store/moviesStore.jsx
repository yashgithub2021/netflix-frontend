import axios from "axios";
import { create } from "zustand";
import { variables } from '../utils/constants'
import toast from "react-hot-toast";

const useMoviesStore = create((set, get) => ({
    isLoading: false,
    key: 'movie',
    setKey: (data) => { set({ key: data }) },
    getAllVideos: async (category) => {
        set({ isLoading: true })
        try {
            const key = get().key
            const response = await axios.get(`${variables.BACKEND_URL}/videos/get-all-videos/${key}/${category}`)
            set({ isLoading: false })
            return { success: true, movies: response.data.data.results }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!")
            return { success: false }
        }
    },

    getTrendingVideo: async () => {
        set({ isLoading: true })
        try {
            const key = get().key
            const response = await axios.get(`${variables.BACKEND_URL}/videos/get-trending-video/${key}`)
            set({ isLoading: false })
            return { success: true, data: response.data }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong!")
            return { success: false }
        }
    }
}))

export default useMoviesStore