import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCarousel from '../ProductCarousel/ProductCarousel';
import AppLoader from '../AppLoader/AppLoader';
import { endPoints } from '../../utils/configs';
import { messages } from '../../utils/alerts';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { title, desc, quantity, price, img } = product;
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${URL_SERVER}${endPoints.products}${id}`
      );
      setProduct(data);
      setIsLoading(true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: messages.failGetProduct,
      }).then((result) => {
        result.isConfirmed ? navigate('/home') : navigate('/error404');
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='container vh-100'>
          <h1 className='my-4'>Product Detail</h1>
          <div className='row gap-3'>
            <div className='col-lg-6'>
              <ProductCarousel images={img} />
            </div>
            <div className='col-lg-4 flex-column justify-content-between d-flex'>
              <h2>{title}</h2>
              <p>{desc}</p>
              <p>Stock: {quantity}</p>
              <p>Price: ${price}</p>
              <div>
                <button className='btn btn-primary'>Comprar</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AppLoader />
      )}
    </>
  );
};

export default ProductDetail;
