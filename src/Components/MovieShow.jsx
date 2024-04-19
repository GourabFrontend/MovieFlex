import { useRef } from "react";
import noresults from "../Img/noresults.png";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import WatchList from "./WatchList";
import noposter from '../Img/no-poster.png'
import { useState } from "react";

const Image_url = "https://image.tmdb.org/t/p/original";
const MovieShow = ({ searchResults, movieref, WatchCard }) => {
  const [hoveritemid, setHoveritemid] = useState(null);
  const elementRef = useRef(null);
  const slideRight = (element) => {
    element.scrollLeft += 800;
  }
  const slideLeft = (element) => {
    element.scrollLeft -= 800;
  }
  return (
    <>
      {searchResults.length === 0 ?
        (
          <>
            <h3 className="m-2 text-xl text-slate-300 uppercase font-bold">Top Rated Movies</h3>
            <img src={noresults} alt="gg" className="max-w-none rounded h-full w-32 md:w-48 lg:w-60 z-10 border-2 border-slate-600" />
          </>
        )
        :
        (
          <div ref={movieref} className="pt-4"><h3 className="m-2 text-xl text-slate-300 uppercase font-bold">Movies</h3>
            <div className="relative">
              <div className="flex w-full overflow-x-auto scrollbar-none scroll-smooth gap-3 p-2" ref={elementRef}>
                {searchResults.map((element) => (
                  <div className="relative p-1 pb-3 pt-3" key={element.id} >
                    <div className="max-w-none rounded h-56 md:h-72 lg:h-96 w-32 md:w-44 lg:w-64 z-10 object-fit hover:border-[4px] border-[2px] border-slate-600 hover:scale-105 transition-all duration-150 ease-in" onMouseEnter={() => setHoveritemid(element.id)} onMouseLeave={() => setHoveritemid(null)}>
                      <Link to={`/movieshow/${element.id}`} key={element.id} >
                        {element.poster_path ?
                          (<img
                            src={Image_url + element.poster_path}
                            alt={element.original_title}
                            className="h-full w-full"
                          />) :
                          (
                           
                              <img src={noposter} alt="" className="h-full w-full"/>
                            )}

                      </Link>
                      {hoveritemid === element.id && <WatchList id={element} WatchCard={WatchCard} />}
                    </div>
                  </div>

                ))}
              </div>
              {searchResults.length > 5 ? (<>
                <HiChevronLeft
                  className="absolute top-[50%] left-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
                  onClick={() => slideLeft(elementRef.current)}
                />
                <HiChevronRight
                  className="absolute top-[50%]  right-[30px] w-[40px] h-[40px] cursor-pointer bg-gradient-to-t from-black from-[30%] rounded-full z-30"
                  onClick={() => slideRight(elementRef.current)}
                />
              </>) : (null)}
            </div>
          </div>)}
    </>
  )
}


export default MovieShow;