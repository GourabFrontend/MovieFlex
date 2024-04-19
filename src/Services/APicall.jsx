import axios from "axios";
const MovieUrl = "https://api.themoviedb.org/3";
const apiKey = "e93d7bfeef7de70a7dc2636083797c77";

const APicall = {
  Upcoming: axios.get(`${MovieUrl}/movie/upcoming?api_key=${apiKey}`),
  Movies: axios.get(`${MovieUrl}/trending/movie/day?api_key=${apiKey}`),
  TvShows: axios.get(`${MovieUrl}/trending/tv/day?api_key=${apiKey}`)
};

export default APicall;

