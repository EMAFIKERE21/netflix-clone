
import React,{useState,useEffect} from 'react'
import './Row.css'
import axios from 'axios'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
const base_url='https://image.tmdb.org/t/p/original/'

function Row2({title,fetchUrl,isLargeRow=false}) {
const [movies, setMovies] = useState([]);
const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay:1 ,
      },
    };
	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.original_name || movie?.title || "")
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					console.log(urlParams.get("v"))
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};

useEffect(() => {
async function changer(){
const request=await axios.get(fetchUrl)
setMovies(request.data.results)
return request;
}
changer()
}, [fetchUrl])

console.log(movies)
  return (
	<div className='row'>
	<h1>{title}</h1>
	  <div className="row__posters">
         {movies.map(movie =>(
         <img onClick={()=>handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow?movie.poster_path : movie.backdrop_path}`} alt=''/>
        ))}
       
     </div>
	 <div >
	 {trailerUrl &&<Youtube className="row__youTube"  videoId={trailerUrl} opts={opts} ></Youtube>}
	 </div>
     </div>
  )
}

export default Row2



