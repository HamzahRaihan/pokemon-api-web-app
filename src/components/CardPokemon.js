import React from 'react';
import { Card, Button, Col, Row, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export const CardPokemon = ({ pokemon, loading }) => {
  console.log(pokemon);
  return (
    <div>
      <div className="wrapper">
        <Container fluid>
          <Row>
            {loading ? (
              <Loading />
            ) : (
              pokemon.map((item) => (
                <Col className="pt-3" sm={6} md={3}>
                  <Card>
                    <Card.Img variant="top" src={item.sprites.front_default} style={{ width: '10rem' }} />
                    <Card.Body>
                      <Card.Title>
                        {item.id}. {item.species.name}
                      </Card.Title>
                      <Card.Text>
                        {item.abilities.map((ability) => (
                          <Badge className="me-2" pill bg="danger" key={ability.ability.name}>
                            {ability.ability.name}
                          </Badge>
                        ))}
                      </Card.Text>
                      <Button size="sm" variant="danger">
                        <Link className="link" to={`/detail/${item.id}`}>
                          Detail
                        </Link>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CardPokemon;
