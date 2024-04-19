
import React, { useEffect, useState } from "react";
import APicall from "../Services/APicall";
import SearchContainer from "./SearchContainer"
import TvShow from "./TvShow";
import MovieShow from "./MovieShow";

const AllCards = ({tvref,movieref,searchref,searchclick,WatchCard}) => {
  const [home, setHome] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [tv, setTv] = useState([]);
  const [searchResults1, setSearchResults1] = useState([]);

  useEffect(() => {
    getHome();
  }, []);

  const getHome = () => {
    APicall.Movies.then((res) => {
      setHome(res.data.results);
      setSearchResults(res.data.results);
    });
  };

  useEffect(() => {
    getTvshows();
  }, []);

  const getTvshows = () => {
    APicall.TvShows.then((res) => {
      setTv(res.data.results);
      setSearchResults1(res.data.results);
    });
  };

  const handleSearch = (search) => {
    let filterData = home.filter((element) =>
      element.original_title?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterData);
    let filterData1 = tv.filter((element) =>
      element.original_name?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults1(filterData1);
  };
  return (
    <>
      {tv.length > 0 && home.length > 0 ? (<>
        <SearchContainer handleChange={handleSearch} home={home} tv={tv} searchref={searchref} searchclick={searchclick}/>
        <MovieShow searchResults={searchResults} movieref={movieref} WatchCard={WatchCard}/>
        <TvShow searchResults1={searchResults1} tvref={tvref} WatchCard={WatchCard}/>
      </>) : (<p>{null}</p>)}
    </>
  );
};

export default AllCards;
