import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import noposter from '../Img/no-poster.png'
import WatchList from "./WatchList";

const movieByGenreBaseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=e93d7bfeef7de70a7dc2636083797c77';
const Image_url = "https://image.tmdb.org/t/p/original";

const MovieByGenre = ({ WatchCard }) => {
    const genere = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },

        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ];

    const [genres, setGenre] = useState(genere[0].id);
    const [genreList, setGenreList] = useState([]);
    const elementRef = useRef(null);
    const [hoveritemid, setHoveritemid] = useState(null);
    const slideRight = (element) => {
        element.scrollLeft += 800;
    }
    const slideLeft = (element) => {
        element.scrollLeft -= 800;
    }


    useEffect(() => {
        getGenre(genres);
    }, [genres]);

    const getGenre = async (genres) => {
        try {
            const response = await axios.get(movieByGenreBaseURL + "&with_genres=" + genres);
            setGenreList(response.data.results);
        } catch (error) {
            console.error('Error fetching TV show details:', error);
        }
    };

    const Selected = (e) => {
        setGenre(e)
    }

    return (
        <>
            {genreList.length > 0 && (
                <div className="pt-4"><h3 className="m-2 text-xl text-slate-300 uppercase font-bold">Movie By Genre</h3>
                    <select name="Select" id="" className=" bg-gray-800 p-1.5 justify-start flex rounded-lg m-3 text-slate-300 uppercase font-semibold" onChange={(e) => Selected(e.target.value)}>
                        {genere.map(item => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        )
                        )}
                    </select>
                    <div className="relative">
                        <div className=" flex w-full overflow-x-auto scrollbar-none scroll-smooth gap-3 p-2" ref={elementRef}>
                            {genreList.map((element) => (
                                <div className="p-1 pt-3 pb-3" key={element.id}>
                                    <div className="relative max-w-none rounded h-56 md:h-72 lg:h-96 w-32 md:w-44 lg:w-64 z-10  object-fit  hover:border-[4px] border-[2px] border-slate-600 hover:scale-105 transition-all duration-150 ease-in" onMouseEnter={() => setHoveritemid(element.id)} onMouseLeave={() => setHoveritemid(null)}>
                                        <Link to={`/movieshow/${element.id}`} key={element.id} >
                                            {element.poster_path ?
                                                (<img
                                                    src={Image_url + element.poster_path}
                                                    alt={element.original_title}
                                                    className="h-full w-full"
                                                />) :
                                                (<img
                                                    src={noposter}
                                                    alt={element.original_title}
                                                    className="h-full w-full"
                                                />
                                                )}

                                        </Link>
                                        {hoveritemid === element.id && <WatchList id={element} WatchCard={WatchCard} />}

                                    </div>
                                </div>

                            ))}
                        </div>
                        <HiChevronLeft
                            className="absolute top-[50%] left-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
                            onClick={() => slideLeft(elementRef.current)}
                        />
                        <HiChevronRight
                            className="absolute top-[50%]  right-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
                            onClick={() => slideRight(elementRef.current)}
                        />
                    </div>
                </div>
            )}

        </>
    )
}

export default MovieByGenre;