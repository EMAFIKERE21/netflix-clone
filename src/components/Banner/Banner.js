import React,{useState,useEffect} from 'react'
import requests from '../Request/Request'
import './Banner.css'
import {base_url} from '../Request/Request'
import Youtube from 'react-youtube'

import movieTrailer from 'movie-trailer'
function Banner() {
const[movies,setMovies]=useState([])
const [trailerUrl, setTrailerUrl] = useState("");
const [moreInfo, setMoreInfo] = useState("");
    const opts = {
      height: '390',
      width: '500px',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay:1 ,
      },
    };
const moreInfoClick=()=>{
if (moreInfo) {
	setMoreInfo('')
} else {
	setMoreInfo(movies.overview)
}
}
console.log(movies)
		const handleClick = (movies) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movies?.original_name || movies?.title || "")
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					console.log(urlParams.get("v"))
					setTrailerUrl(urlParams.get("v"));
					
				})
				.catch((error) => alert('the video does not have a trailer,refresh to get another one or look below'));
		}
	};
useEffect(() => {
    fetch(requests.fetchNetflixOriginals)
	.then((resp)=>resp.json())
	.then((data)=>{
         let fetchedMovies= data.results
         setMovies(fetchedMovies[Math.floor(Math.random()*fetchedMovies.length)])
    })
}, [])

const truncate=(string,number)=>string?.length>number?string?.substr(0,number)+'...':string
	return (
		<section 
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("${base_url}${movies?.backdrop_path}")`,
				backgroundPosition: "center",
			}}>
			 <div >
	
	 </div>
			<div className="banner__contents">
			
				<h1 className="banner__title">
					{movies?.title || movies?.name || movies?.original_name}
				</h1>
				
				<div className="banner__buttons">
					<button onClick={()=>handleClick(movies)}   className="banner__button">Play/stop</button>
					<button onClick={()=>moreInfoClick(moreInfo)} className="banner__button">More Info</button>
				</div>
				<h1 className="banner__description">
					{truncate(movies?.overview, 150)}
				</h1>
			</div>
			 {trailerUrl &&<Youtube style={{
				position: "fixed",
				right:"0",
				top:"30px",
				backgroundColor:"blue"

			}}  className="banner__youTube"   videoId={trailerUrl} opts={opts} ></Youtube>}
			 {moreInfo && <div className="banner__moreInfo"><i>I-released date is---</i>{movies?.release_date ||movies?.first_air_date
}<br></br><i>II-popularity is--</i>-{movies.popularity}<br></br><i>III-vote average---</i>-{movies.vote_average
}</div>}
			<div className="banner__fadeBottom"></div> 
			
		</section>
	);
}

export default Banner