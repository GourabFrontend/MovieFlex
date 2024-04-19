
import { FaHeartCirclePlus } from "react-icons/fa6";
const WatchList = ({ id, tvid, WatchCard }) => {
    return (
        <>

            <button className="flex flex-col justify-center items-center  absolute bottom-[0%] w-full h-[20%] bg-gradient-to-t from-black from-[30%] rounded"  ><FaHeartCirclePlus size="40" className="text-slate-300 hover:text-blue-300" onClick={() => WatchCard(id, tvid)} /> <p className="text-slate-300">watchlist</p></button>

        </>
    )
}
export default WatchList;