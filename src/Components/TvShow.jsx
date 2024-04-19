
import { Link } from "react-router-dom"
import noresults from "../Img/noresults.png"
import WatchList from "./WatchList";
import noposter from '../Img/no-poster.png'
import { useState } from "react"

const Image_url = "https://image.tmdb.org/t/p/original"
const TvShow = ({ searchResults1, tvref, WatchCard }) => {
  const [hoveritemid, setHoveritemid] = useState(null);
  return (
    <div >
      {searchResults1 && searchResults1.length > 0 ? (
        <div ref={tvref} className="pt-4">
          <p className="p-2 text-xl text-slate-300 uppercase font-bold">Tv Shows</p>
          <div className="relative grid grid-cols-5 gap-3 p-2" >
            {searchResults1.map((element) => (
              <div className="relative z-30 p-1 pt-3 pb-3" key={element.id}>
                <div className=" rounded h-56 md:h-72 lg:h-96 w-full z-10 object-fit hover:border-[4px] border-[2px] border-slate-600 hover:scale-105 transition-all duration-150 ease-in" onMouseEnter={() => setHoveritemid(element.id)} onMouseLeave={() => setHoveritemid(null)}>
                  <Link to={`/tvshow/${element.id}`} key={element.id} >
                    {element.poster_path?(<img
                      src={Image_url + element.poster_path}
                      alt={element.name}
                     className="h-full w-full"
                    />):(<img
                      src={noposter}
                      alt={element.name}
                      className="h-full w-full"
                    />)}
                    
                  </Link>
                  {hoveritemid === element.id && <WatchList tvid={element} WatchCard={WatchCard} />}
                </div>
              </div>

            ))}
          </div>
        </div>
      ) : (<>
        <p className="m-2 text-xl text-slate-300 uppercase font-bold">Tv Shows</p>
        <img src={noresults} alt="gg" className="max-w-none rounded h-full w-32 md:w-48 lg:w-60 z-10 border-2 border-slate-600" />
      </>)} </div>
  )
}

export default TvShow;