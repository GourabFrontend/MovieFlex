import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import TrailerYt from "./TrailerYt";
import nosresults from '../Img/noresults.png';
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Footer from "./Footer";
import noposter from '../Img/no-poster.png'
import WatchList from "./WatchList";
const MovieUrl = 'https://api.themoviedb.org/3';
const apiKey = 'e93d7bfeef7de70a7dc2636083797c77';

const MovieShowInfo = ({ WatchCard }) => {

  const { Id } = useParams();
  const [homecard, setHomecard] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [hoveritemid, setHoveritemid] = useState(null);
  const elementRef = useRef(null);
  const slideRight = (element) => {
    element.scrollLeft += 800;
  }
  const slideLeft = (element) => {
    element.scrollLeft -= 800;
  }

  useEffect(() => {
    const fetchCardShowDetails = async () => {
      try {
        const response = await axios.get(`${MovieUrl}/movie/${Id}?api_key=${apiKey}`);
        setHomecard(response.data);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }

    };
    fetchCardShowDetails();
  }, [Id]);



  useEffect(() => {
    const fetchCardSimilarDetails = async () => {
      try {
        const response = await axios.get(`${MovieUrl}/movie/${Id}/similar?api_key=${apiKey}`);

        setSimilar(response.data.results);

      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }

    };
    fetchCardSimilarDetails();
  }, [Id]);


  return (
    <>
      {homecard && similar ? (<>
        <div style={{
          backgroundImage: `linear-gradient(to right,rgba(0,0,0,7),rgba(0,0,0,0.1)),url(https://image.tmdb.org/t/p/original${homecard.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }} className='min-w-full h-[300px] object-cover object-top lg:h-[600px] md:h-[400px] flex justify-center items-end' >
          <div className=" w-4/5 h-4/5 flex flex-col justify-evenly text-start mb-2">
            <h1 className='text-slate-300  font-bold text-xl md:text-2xl lg:text-4xl'>{homecard.original_title}</h1>
            <p className="text-slate-300 uppercase font-bold text-xs md:text-sm lg:text-lg">{homecard.release_date}</p>
            <p className=" font-bold text-xs md:text-sm lg:text-lg text-slate-300"><span className="text-yellow-600 text-xl">&#9733;</span> <b className="uppercase">{homecard.vote_average}</b></p>
            <h1 className='text-slate-300 text-xs md:text-sm lg:text-base'>{homecard.overview.slice(0, 300)}</h1>
            <h1 className='text-yellow-500 font-bold text-lg md:text-xl lg:text-3xl'>Language - {homecard.original_language}</h1>
            <TrailerYt Id={homecard.id} />
          </div>
        </div>


        <p className="m-2 text-xl text-slate-300 uppercase font-bold">Similar Movies</p>
        {similar && similar.length > 0 ? (
          <div className="relative">
          <div className="flex w-full overflow-x-auto scrollbar-none scroll-smooth gap-3" ref={elementRef}>
            {similar.map((element) => (
              <div className="relative  p-1 pt-3 pb-3" key={element.id}>
                <div className="max-w-none rounded h-56 md:h-72 lg:h-96 w-32 md:w-44  lg:w-64 z-10  object-fit  hover:border-[4px] border-[2px] border-slate-600 hover:scale-105 transition-all duration-150 ease-in" onMouseEnter={() => setHoveritemid(element.id)} onMouseLeave={() => setHoveritemid(null)}>
                  <Link to={`/movieshow/${element.id}`} key={element.id} >
                    {element.poster_path ?
                      (<img
                        src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
                        alt={element.original_title}
                        className="h-full w-full"
                        key={element.id}
                      />) :
                      (<img src={noposter} alt="" className="h-full w-full"/>)}

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
              className="absolute top-[50%] right-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
              onClick={() => slideRight(elementRef.current)}
            />
          </div>
        )
          :
          (
            <p><img src={nosresults} alt="nothing" className="max-w-none rounded w-32 md:w-48 lg:w-64 z-10" /></p>
          )}
        <Footer />
      </>
      )

        : (<div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">

          <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>

          <span className="text-white text-3xl font-bold">Loading...</span>

        </div>)
      }
    </>
  )
}

export default MovieShowInfo;