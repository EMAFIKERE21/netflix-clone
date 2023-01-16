import React from 'react'
import Banner from './Banner/Banner'
import requests from './Request/Request'
import Nav from './nav/Nav'
import Row from './Row/Row'
function Homescreen() {
  return (
    <div>
<Banner />
<Row title='NetflixOriginals' fetchUrl={requests.fetchNetflixOriginals} isLargeRow></Row>
 <Row title='Trending Now' fetchUrl={requests.fetchTrending} ></Row>
   <Row title='Top rated' fetchUrl={requests.fetchTopRated} ></Row>
   <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} ></Row>
   <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} ></Row>
   <Row title='Horror Movies' fetchUrl={requests.fetchNetflixOriginals} ></Row>
   <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} ></Row>
  <Row title='Documentary Movies' fetchUrl={requests.fetchDocumentaries} ></Row>
    </div>
  )
}

export default Homescreen