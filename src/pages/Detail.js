import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Alert } from '@mui/material';

const getPokemonSpecies = async (id) => {
  const pokeID = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  console.log(pokeID.data.flavor_text_entries);
  const flavorText = pokeID.data.flavor_text_entries.find((entry) => entry.language.name === 'en');
  return flavorText ? flavorText.flavor_text : '';
  // return pokeID.data.flavor_text_entries;
};
const getPokemonDetailByID = async (id) => {
  const pokeDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  console.log(pokeDetail.data);
  return pokeDetail.data;
};

export const Detail = () => {
  const [pokeDetail, setPokeDetail] = useState({});
  const [pokeSpecies, setPokeSpecies] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonSpecies(id).then((res) => {
      setLoading(true);
      setPokeSpecies(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getPokemonDetailByID(id).then((res) => {
      setLoading(true);
      setPokeDetail(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {pokeDetail && pokeDetail.name ? (
            <div className="wrapper pt-5">
              <Container fluid>
                <Row>
                  <Col sm={12} md={3}>
                    <div className="pokemon-picture">
                      <Image className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`} />
                    </div>
                  </Col>
                  <Col>
                    <div className="pokemon-desc">
                      <div className="pokename">
                        <h1>{pokeDetail.name}</h1>
                        <h5>{pokeSpecies}</h5>
                      </div>
                      <Row>
                        <Col sm={4}>
                          <div className="stats">
                            <h5>Stats: </h5>
                            {pokeDetail.stats.map((i) => (
                              <p>
                                {i.stat.name}: {i.base_stat}
                              </p>
                            ))}
                            <p>height: {pokeDetail.height}</p>
                            <p>weight: {pokeDetail.weight}</p>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="abilities">
                            <h5>Abilities:</h5>
                            {pokeDetail.abilities.map((i) => (
                              <p>{i.ability.name}</p>
                            ))}
                            <div className="weakness">{}</div>
                          </div>
                        </Col>
                        <Col>
                          <div className="type">
                            <h5>Types:</h5>
                            {pokeDetail.types.map((i) => (
                              <p>{i.type.name}</p>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <Container>
              <Alert severity="error">No Pokemon Found!</Alert>
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
