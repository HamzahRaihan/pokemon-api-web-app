import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Col, Container, Image, Row } from 'react-bootstrap';

const getPokemonDetailByID = async (id) => {
  const pokeID = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  console.log(pokeID.data);
  return pokeID.data;
};
const getPokemonImage = async (id) => {
  const pokeImage = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  console.log(pokeImage.data);
  return pokeImage.data;
};

export const Detail = () => {
  const [pokeDetail, setPokeDetail] = useState({});
  const [pokeImg, setPokeImg] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonImage(id).then((res) => {
      setLoading(true);
      setPokeImg(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getPokemonDetailByID(id).then((res) => {
      setPokeDetail(res);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <Container fluid>
            <Row>
              <Col sm={12} md={3}>
                <div className="pokemon-picture">
                  <Image className="pokemon-image" src={pokeImg.sprites.front_default} />
                </div>
              </Col>
              <Col>
                <div className="pokemon-desc">
                  <h1>{pokeDetail.name}</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Detail;
