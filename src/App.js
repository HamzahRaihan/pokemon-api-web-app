import './App.css';
import Pokemon from './components/Pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Detail from './pages/Detail';
import PokemonSearch from './components/PokemonSearch';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonSearch />} />
      </Routes>
      <div className="Pokedex">
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/detail/">
            <Route path=":id" element={<Detail />} />
          </Route>
        </Routes>
      </div>
      <footer>
        <div className="footer"></div>
      </footer>
    </div>
  );
}

export default App;
