
import './App.css';
import Homescreen from './components/Homescreen';
import {Route,Routes} from 'react-router-dom' 

import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="App">
    <Nav></Nav>
<Routes>
<Route path='/' exact element={<Homescreen></Homescreen>}></Route>
</Routes>

    </div>
  );
}

export default App;
