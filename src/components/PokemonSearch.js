import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import Loading from './Loading';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState({});
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      console.log(res.data);
      setPokemon(res.data);
      console.log(res.data.abilities);
      setAbilities(res.data.abilities);
    });
    setLoading(true);
  };

  return (
    <div>
      <div className="TitleSection">
        <h1>Pokemon App</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>

      <div className="results">
        <Container fluid>
          <Row>
            {!loading ? (
              <div>
                <h4>Your pokemon search results will be here</h4>
              </div>
            ) : (
              <>
                {pokemon && pokemon.name ? (
                  <Col className="pt-3" sm={6} md={3}>
                    <Card>
                      <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} style={{ width: '10rem' }} />
                      <Card.Body>
                        <Card.Title>
                          {pokemon.id}. {pokemon.name}
                        </Card.Title>
                        <Card.Text>
                          {abilities &&
                            abilities.map((ability) => (
                              <Badge className="me-2" pill bg="danger" key={ability.ability.name}>
                                {ability.ability.name}
                              </Badge>
                            ))}
                        </Card.Text>
                        <Button size="sm" variant="danger">
                          <Link className="link" to={`/detail/${pokemon.id}`}>
                            Detail
                          </Link>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : (
                  <div>No data</div>
                )}
              </>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PokemonSearch;
