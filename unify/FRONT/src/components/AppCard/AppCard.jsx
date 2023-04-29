import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const AppCard = (props) => {
  const { icon, title, id, price, quantity } = props.product;
  const navigate = useNavigate();

  return (
    <Card className='p-0' style={{ width: '18rem' }}>
      <Card.Img variant='top' src={icon} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{`Quantity: ${quantity}`}</Card.Text>
        <Button variant='primary' onClick={() => navigate(`/product/${id}`)}>
          Comprar ${price}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppCard;
