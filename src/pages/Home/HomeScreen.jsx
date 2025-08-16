import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import MovieSlider from "../../components/MoviesSlider";
import useMoviesStore from "../../store/moviesStore";
import { variables } from "../../utils/constants";

function HomeScreen() {
    const [trendingContent, setTrendingContent] = useState(null);
    const { getTrendingVideo, key } = useMoviesStore();

    useEffect(() => {
        const fetchTrendingVideo = async () => {
            const data = await getTrendingVideo();
            if (data?.success) {
                setTrendingContent(data.data.data);
            }
        };
        fetchTrendingVideo();
    }, [key]);

    return (
        <>
            <div className='relative h-screen text-white'>
                <Navbar />

                {trendingContent && (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/original${trendingContent.backdrop_path}`}
                            alt='Hero img'
                            className='absolute top-0 left-0 w-full h-full object-cover'
                        />

                        <div className='absolute top-0 left-0 w-full h-full bg-black/50' />

                        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
                            <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

                            <div className='max-w-2xl'>
                                <h1 className='mt-4 text-6xl font-extrabold text-balance'>
                                    {trendingContent.original_title || trendingContent.name}
                                </h1>
                                <p className='mt-2 text-lg'>
                                    {trendingContent.release_date?.split("-")[0]} | PG-13
                                </p>

                                <p className='mt-4 text-lg'>
                                    {trendingContent.overview?.length > 200
                                        ? trendingContent.overview.slice(0, 200) + "..."
                                        : trendingContent.overview}
                                </p>
                            </div>

                            <div className='flex mt-8'>
                                <Link
                                    to={`/watch/${trendingContent.id}`}
                                    className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'
                                >
                                    <Play className='size-6 mr-2 fill-black' />
                                    Play
                                </Link>

                                <Link
                                    to={`/watch/${trendingContent.id}`}
                                    className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
                                >
                                    <Info className='size-6 mr-2' />
                                    More Info
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className='flex flex-col gap-10 bg-black py-10'>
                {key == 'movie'
                    ? variables.MOVIE_CATEGORIES.map((category) => (<MovieSlider key={category} category={category} />))
                    : variables.TV_CATEGORIES.map((category) => (<MovieSlider key={category} category={category} />))
                }
            </div>
        </>
    );
}

export default HomeScreen;
