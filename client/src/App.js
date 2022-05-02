import Play from './components/play'
import Menu from './components/menu';
import About from './components/about';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HowToPlay from './components/howToPlay';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Menu></Menu>} />
        <Route path='/play' element={<Play></Play>} />
        <Route path='/about' element={<About></About>} />
        <Route path='/how-to-play' element={<HowToPlay></HowToPlay>} />
      </Routes>
    </div>
  );
}

export default App;
