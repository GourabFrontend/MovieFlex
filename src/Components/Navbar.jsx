import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { RiSlideshow3Line } from "react-icons/ri";
import { MdOutlineMovie } from "react-icons/md";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = ({ tvref, movieref, scrollToSection, searchref, setSearchclick, searchclick, sliderref, watchlistarr, tvwatchlist }) => {
  const [toggle, setToggle] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    });
    return () => unsubscribe();
  }, []);


  const logout = async () => {
    try {
      await signOut(auth);
      !auth.currentUser && toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <nav className="flex fixed h-[80px] w-full justify-evenly bg-gradient-to-b from-black from-[10%] z-50 ">
        <section className="flex  w-[80%] justify-evenly cursor-pointer font-semibold uppercase text-xs md:text-sm lg:text-lg">
          <Link to="/" className="flex gap-1.5 items-center hover:underline
    underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in" onClick={() => scrollToSection(sliderref)}> <GoHomeFill color="white" size="20" />Home</Link>
          <div className="flex gap-1.5 items-center hover:underline
    underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in" onClick={() => {
              setTimeout(() => { searchref?.current?.focus() }, 1)
              setSearchclick(!searchclick)
            }
            }><BiSearch color="white" size="20" />Search </div>
          <div className="flex gap-1.5 items-center hover:underline
    underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in" onClick={() => scrollToSection(movieref)}><MdOutlineMovie color="white" size="20" />Movies</div>

          <div className="flex gap-1.5 items-center hover:underline
    underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in" onClick={() => scrollToSection(tvref)}><RiSlideshow3Line color="white" size="20" />Tv Shows</div>
          <div className="flex gap-1.5 items-center">
            <Link to="/watchlist" className="flex gap-1.5 items-center hover:underline
    underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in"> <FaPlus color="white" size="20" />WatchList</Link><sup><span className="text-yellow-300">{(watchlistarr.length + tvwatchlist.length) >0 &&(watchlistarr.length + tvwatchlist.length)}</span></sup></div>

          {toggle ? (
            <div className="flex gap-1.5 items-center hover:underline
            underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in" onClick={logout}>
              <AiOutlineLogout color="white" size="20" />Log out
            </div>
          ) : <Link to="/login" className="flex gap-1.5 items-center hover:underline
          underline-offset-[10px] hover:scale-105 transition-all duration-150 ease-in"><CgProfile color="white" size="20" />Log In</Link>}
        </section>
      </nav>
      
    </>
  );
};

export default Nav;
