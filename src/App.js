
import React, { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Navbar';
import Slider from './Components/Slider';
import "./App.css"
import Signin from './Components/Login';
import MovieShowInfo from './Components/MovieShowInfo';
import TvShowInfo from './Components/TvShowInfo';
import AllCards from './Components/AllCards';
import MovieByGenre from './Components/MovieByGenre';
import Footer from './Components/Footer';
import WatchListShow from './Components/WatchListShow';
import { ToastContainer, toast } from 'react-toastify';



function App() {
  const sliderref = useRef(null);
  const movieref = useRef(null);
  const searchref = useRef(null);
  const tvref = useRef(null);


  const [searchclick, setSearchclick] = useState(false);
  const [watchlistarr, setWatchlistarr] = useState([]);
  const [tvwatchlist, setTvwatchlist] = useState([]);
  const WatchCard = (items, tvitems) => {
   
    if (items) {
      
      const isItemInWatchlist = watchlistarr.some((product) => product.id === items.id);
  
      
      if (!isItemInWatchlist) {
        setWatchlistarr([...watchlistarr, items]);
        toast.success("successfully Added in watchlist")
      }
      else{
        toast.warning("Already Added in watchlist");
      }
    }
  
    if (tvitems) {
      
      const isTvItemInWatchlist = tvwatchlist.some((tvProduct) => tvProduct.id === tvitems.id);
      if (!isTvItemInWatchlist) {
        setTvwatchlist([...tvwatchlist, tvitems]);
        toast.success("successfully Added in watchlist");

      }
      else{
        toast.warning("Already Added in watchlist");
      }
    }
    
  }

  const Moviedeleted = (Id) => {
    setWatchlistarr(() => {
        return watchlistarr.filter((e) => e.id !== Id);
    });
    toast.success("Watchlist Removed")
};
const tvdeleted=(Id) => {
  setTvwatchlist(() => {
      return tvwatchlist.filter((e) => e.id !== Id);
  });
  toast.success("Watchlist Removed")
};
  // console.log(watchlistarr);
  // console.log(tvwatchlist);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef?.current?.offsetTop,
      behavior: 'smooth',
    })
  }
  return (
    <div className="App">
      <Nav tvref={tvref} movieref={movieref} sliderref={sliderref} scrollToSection={scrollToSection} searchref={searchref} searchclick={searchclick} setSearchclick={setSearchclick}  watchlistarr={watchlistarr} tvwatchlist={tvwatchlist}/>
      <Routes>
        <Route path="/" element={<Home tvref={tvref} movieref={movieref} sliderref={sliderref} searchref={searchref} searchclick={searchclick} WatchCard={WatchCard}  />} />
        <Route path="/tvshow/:Id" element={<TvShowInfo WatchCard={WatchCard}/>} />
        <Route path='/movieshow/:Id' element={<MovieShowInfo WatchCard={WatchCard}/>} />
        <Route path='/login' element={<Signin />} />
        <Route path='/watchlist' element={<WatchListShow watchlistarr={watchlistarr} tvwatchlist={tvwatchlist} Moviedeleted={Moviedeleted} tvdeleted={tvdeleted}/>} />
      </Routes>
     <ToastContainer autoClose={2000} className='mt-20' />
    </div>
  );
}


const Home = ({ sliderref, tvref, movieref, searchref, searchclick, WatchCard }) => (
  <div>
    <Slider sliderref={sliderref} />
    <AllCards tvref={tvref} movieref={movieref} searchref={searchref} searchclick={searchclick} WatchCard={WatchCard} />
    <MovieByGenre WatchCard={WatchCard} />
   
    <Footer />
   
  </div>
);

export default App;
