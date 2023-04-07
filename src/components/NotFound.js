import { Alert, Container } from 'react-bootstrap';

export const NotFound = () => {
  return (
    <div className="wrapper pt-3">
      <Container>
        <Alert severity="error">Nothing Here!</Alert>
      </Container>
    </div>
  );
};

export default NotFound;
