import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { variables } from "../utils/constants";
import useMoviesStore from "../store/moviesStore";

const MovieSlider = ({ category }) => {
    const sliderRef = useRef(null);
    const { key, getAllMovies } = useMoviesStore()
    const [showArrows, setShowArrows] = useState(false);
    const [content, setContent] = useState([])

    const formattedCategoryName = category.replaceAll('_', ' ')[0].toUpperCase() + category.replaceAll('_', ' ').slice(1)
    const formatedContentType = key == 'movie' ? 'Movies' : 'TV Shows'
    useEffect(() => {
        const fetchAllVideos = async () => {
            const result = await getAllMovies(category)
            if (result.success) {
                setContent(result.movies.data.results)
            }
        }
        fetchAllVideos()
    }, [key, category]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    };

    return (
        <>
            {content &&
                <div
                    className='bg-black text-white relative px-5 md:px-20'
                    onMouseEnter={() => setShowArrows(true)}
                    onMouseLeave={() => setShowArrows(false)}
                >
                    <h2 className='mb-4 text-2xl font-bold'>
                        {formattedCategoryName} {formatedContentType}
                    </h2>

                    <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
                        {content.map((item) => (
                            <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                                <div className='rounded-lg overflow-hidden'>
                                    <img
                                        src={variables.SMALL_IMG_BASE_URL + item.backdrop_path}
                                        alt='Movie image'
                                        className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                                    />
                                </div>
                                <p className='mt-2 text-center'>{item.title || item.name}</p>
                            </Link>
                        ))}
                    </div>

                    {showArrows && (
                        <>
                            <button
                                className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
                                onClick={scrollLeft}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
                                onClick={scrollRight}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            }
        </>
    );
};
export default MovieSlider;
