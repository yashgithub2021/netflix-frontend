import axios from "axios";
import { create } from "zustand";
import { variables } from '../utils/constants'
import toast from "react-hot-toast";

const useMoviesStore = create((set, get) => ({
    isLoading: false,
    key: 'movie',

    setKey: (data) => set({ key: data }),

    getAllMovies: async (categories) => {
        set({ isLoading: true })
        const key = get().key
        try {
            const response = await axios.get(`${variables.BACKEND_URL}/videos/get-all-videos/${key}/${categories}`)
            set({ isLoading: false })
            return { success: true, movies: response.data }
        } catch (error) {
            toast.error("Something went wrong!")
            return { success: false }
        }
    },

    getTrendingVideo: async () => {
        set({ isLoading: true })
        const key = get().key
        try {
            const response = await axios.get(`${variables.BACKEND_URL}/videos/get-trending-video/${key}`)
            set({ isLoading: false })
            return { success: true, movie: response.data.data }
        } catch (error) {
            toast.error("Something went wrong!")
            return { success: false }
        }
    }
}))

export default useMoviesStore