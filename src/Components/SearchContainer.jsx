

const SearchContainer = ({ handleChange,tv,home,searchref,searchclick }) => {

  return (<>
  {tv.length>0 && home.length>0 ?(
    
    <div className="flex pl-[10%] ">
      {searchclick && <input
      ref={searchref}
        type="text"
        placeholder="Search for Movies And Tv Shows ..."
        onChange={(e) => handleChange(e.target.value)}
        className="text-white bg-gray-800 border-none outline-none pl-4 w-[40%] rounded-lg mt-4 p-[10px] placeholder:text-center placeholder:text-slate-300 lg:placeholder:text-base md:placeholder:text-sm placeholder:text-xs z-30"
      />}
    </div>):( <p>{null}</p> )
    }
    </>
  );
};

export default SearchContainer;







