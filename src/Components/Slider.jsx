
import React, { useEffect, useState } from "react";
import APicall from "../Services/APicall";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import TrailerYt from "./TrailerYt";

const Slider = ({ sliderref }) => {
    const [movies, setMovies] = useState([]);
    const [activeitem, setActiveitem] = useState(0);

    useEffect(() => {
        GetTrending();
    }, []);

    useEffect(() => {
        const time = setInterval(() => {
            scroll("right");
        }, 3000);
        return () => clearInterval(time);
    }, [activeitem]);

    const GetTrending = () => {
        APicall.Upcoming.then((res) => {
            setMovies(res.data.results);
        });
    }

    const scroll = (direction) => {
        if (direction === "right") {
            setActiveitem(index => {
                if (index === movies.length - 1) return 0
                return index + 1
            })
        }
        else {
            setActiveitem(index => {
                if (index === 0) return movies.length - 1
                return index - 1
            })
        }
    }
    return (
        <div >
            {movies.length > 0 ? (
                <div className="relative overflow-hidden">
                    <div className=" flex" ref={sliderref} style={{
                        transition: "transform 0.5s ease",
                        transform: `translateX(-${activeitem * 100}%)`
                    }}>
                        {movies.map((movies) => (
                            <div style={{ backgroundImage: `linear-gradient(to right,rgba(0,0,0,7),rgba(0,0,0,0.1)),url(https://image.tmdb.org/t/p/original${movies.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="min-w-full h-[300px] object-cover object-top lg:h-[600px] md:h-[400px] flex justify-center items-end ">
                                <div className="w-4/5 h-4/5 flex flex-col justify-evenly text-start mb-2">
                                    <h1 className="text-slate-300 font-bold text-xl md:text-2xl lg:text-4xl">{movies.original_title}</h1>
                                    <p className="text-slate-300 uppercase font-bold text-xs md:text-sm lg:text-lg">{movies.release_date}</p>
                                    <p className="font-bold text-xs md:text-sm lg:text-lg text-slate-300">
                                        <span className="text-yellow-600 text-xl">&#9733;</span> <b className="uppercase">{movies.vote_average}</b>
                                    </p>
                                    <h1 className="text-slate-300 text-xs md:text-sm lg:text-base">{movies.overview.slice(0, 300)}</h1>
                                    <h1 className="text-yellow-500 font-bold text-lg md:text-xl lg:text-3xl">Language - {movies.original_language}</h1>
                                    <TrailerYt SliderId={movies.id} />
                                </div>
                            </div>))}
                    </div>

                    <HiChevronLeft
                        className="absolute top-[50%] left-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
                        onClick={() => scroll("left")}
                    />
                    <HiChevronRight
                        className="absolute top-[50%] right-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
                        onClick={() => scroll("right")}
                    />
                </div>

            ) : (
                <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
                    <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-white text-3xl font-bold">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default Slider;




