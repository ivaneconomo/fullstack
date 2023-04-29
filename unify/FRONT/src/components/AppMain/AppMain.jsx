import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppCard from '../AppCard/AppCard';
import { endPoints } from '../../utils/configs';
import AppLoader from '../AppLoader/AppLoader';
import { customAlert, messages } from '../../utils/alerts';
import { useNavigate } from 'react-router-dom';

const AppMain = () => {
  const [products, setProducts] = useState([]);
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${URL_SERVER}${endPoints.products}`);
      setProducts(data);
    } catch (error) {
      customAlert(
        messages.errorTitle,
        messages.failureGetProductsText,
        messages.errorIcon,
        () => {
          navigate('/error404');
        }
      );
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center my-5'>Bienvenido a Software Store</h1>
      <div className='row gap-3 justify-content-center align-items-center'>
        {products.length >= 1 ? (
          products.map((product) => (
            <AppCard product={product} key={product.id} />
          ))
        ) : (
          <AppLoader />
        )}
      </div>
    </div>
  );
};

export default AppMain;
