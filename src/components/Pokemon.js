import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import CardPokemon from './CardPokemon';

export const Pokemon = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

  const getPokemonList = async () => {
    setLoading(true);

    const res = await axios.get(url);
    // return res.data.results;
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    // console.log(pokeData);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        return state;
      });
    });
  };

  useEffect(() => {
    getPokemonList();
  }, [url]);

  return (
    <div>
      <div className="wrapper">
        <div className="pokemon-list">
          <CardPokemon pokemon={pokeData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
