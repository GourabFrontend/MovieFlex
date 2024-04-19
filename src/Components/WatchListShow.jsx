import { Link } from "react-router-dom";
import { FaHeartCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import noposter from '../Img/no-poster.png'


const Image_url = "https://image.tmdb.org/t/p/original";
const WatchListShow = ({ watchlistarr, tvwatchlist,Moviedeleted,tvdeleted }) => {
    const [hoveritemid,setHoveritemid]=useState(null);

    return (
        <>

            {watchlistarr.length > 0 ?
                (<div className="pt-20">
                    <p className="m-2 text-xl text-slate-300 uppercase font-bold text-start">Movie Watchlist</p>
                    <div className="relative grid grid-cols-6 gap-3">

                        {watchlistarr.map((element) => (
                            <div className="relative z-30 p-1" key={element?.id}>
                                <div className="hover:border-[4px] border-[2px] border-slate-600 hover:scale-105 transition-all duration-150 ease-in" onMouseEnter={()=>setHoveritemid(element.id) } onMouseLeave={()=>setHoveritemid(null)}>
                                <Link to={`/movieshow/${element?.id}`} key={element?.id} >
                                   {element.poster_path?(<img src={Image_url + element?.poster_path} alt="movie" className="rounded object-fit w-full h-40 md:h-56 lg:h-72 " />):(<img src={noposter} alt={element.original_title} className="rounded object-fit w-full h-40 md:h-56 lg:h-72 " />)} 
                                    
                                </Link>
                                {hoveritemid ===element.id && <button className="flex flex-col justify-center items-center  absolute bottom-[0%] w-[100%] h-[20%] bg-gradient-to-t from-black from-[30%] rounded"><FaHeartCircleXmark size="40" className="text-slate-200 hover:text-red-300" onClick={() => Moviedeleted(element.id)} /><p className="text-slate-300">Remove</p></button> }
                               
                                </div> 
                            </div>
                        ))}
                    </div>
                </div>):(<div className="pt-20"><p className="m-2 text-xl text-slate-300 uppercase font-bold text-start">Movie Watchlist</p>
                <p>Nothing in WatchList</p></div>)
            }

            {tvwatchlist.length > 0 ?
                (<div className="pt-20">
                    <p className="m-2 text-xl text-slate-300 uppercase font-bold text-start">Tv Watchlist</p>
                    <div className="relative grid grid-cols-6 gap-3">
                        {tvwatchlist.map((element) => (
                            <div className="relative z-30 p-1" key={element?.id}>
                                <div className="hover:border-[4px] border-[2px] border-slate-600 hover:scale-105 transition-all duration-150 ease-in" onMouseEnter={()=>setHoveritemid(element.id) } onMouseLeave={()=>setHoveritemid(null)}>
                                <Link to={`/tvshow/${element?.id}`} key={element?.id} >
                                   {element.poster_path?( <img src={Image_url + element?.poster_path} alt="Tv" className="rounded object-fit w-full h-40 md:h-56 lg:h-72 " />):( <img src={noposter} alt={element.name} className="rounded object-fit w-full h-40 md:h-56 lg:h-72 " />)}

                                </Link>
                                {hoveritemid ===element.id &&
                                <button className="flex flex-col justify-center items-center  absolute bottom-[0%] w-[100%] h-[20%] bg-gradient-to-t from-black from-[30%] rounded"  ><FaHeartCircleXmark size="40" className="text-slate-200 hover:text-red-300" onClick={()=>tvdeleted(element.id)} /><p className="text-slate-300">Remove</p></button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>):(<div className="pt-20"><p className="m-2 text-xl text-slate-300 uppercase font-bold text-start">Tv Watchlist</p>
                <p>Nothing in WatchList</p></div>)
            }
        </>
    )
}

export default WatchListShow;