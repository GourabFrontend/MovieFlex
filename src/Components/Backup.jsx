import noposter from '../Img/no-poster.png'
const Backup =()=>{
  return(<div style={{
    backgroundImage: `linear-gradient(to right,rgba(0,0,0,7),rgba(0,0,0,0.1)),url(${noposter})`,  backgroundSize: "cover"
  }} className='min-w-full h-[300px]  lg:h-[600px] md:h-[400px] flex justify-center items-end' >
    <div className=" w-4/5 h-4/5 flex flex-col justify-evenly text-start mb-2">
      <h1 className='text-slate-300  font-bold text-xl md:text-2xl lg:text-4xl'>name</h1>
      <p className="text-slate-300 uppercase font-bold text-xs md:text-sm lg:text-lg">.first_air_date</p>
      <p className=" font-bold text-xs md:text-sm lg:text-lg text-slate-300"><span className="text-yellow-600 text-xl">&#9733;</span> <b className="uppercase">vote_average</b></p>
      <h1 className='text-slate-300 text-xs md:text-sm lg:text-base'>gg</h1>
      <h1 className='text-yellow-500 font-bold text-lg md:text-xl lg:text-3xl'>Language - </h1>
      {/* <TrailerYt CardId={Id} /> */}
    </div>
  </div>)
}
export default Backup;
