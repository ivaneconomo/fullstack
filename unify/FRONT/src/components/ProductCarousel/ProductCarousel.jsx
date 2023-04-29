import Carousel from 'react-bootstrap/Carousel';

function ProductCarousel({images}) {

  return (
      <Carousel indicators={false}>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={images[0]}
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={images[1]}
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={images[2]}
            alt='First slide'
          />
        </Carousel.Item>
      </Carousel>
  );
}

export default ProductCarousel;
