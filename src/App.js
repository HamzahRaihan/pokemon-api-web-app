import './App.css';
import Pokemon from './components/Pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Detail from './pages/Detail';
import PokemonSearch from './components/PokemonSearch';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <div className="App d-flex flex-column">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<PokemonSearch />} />
        </Routes>
        <div className="Pokedex">
          <Routes>
            <Route path="/" element={<Pokemon />} />
            <Route path="/detail/">
              <Route path=":id" element={<Detail />} />
              <Route path=":name" element={<Detail />} />
              <Route path="/detail/" element={<NotFound />} />
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </div>
      <footer className="footer  pt-3">
        <div></div>
      </footer>
    </>
  );
}

export default App;
