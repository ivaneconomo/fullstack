import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar/AppNavbar';
import AppFooter from './components/AppFooter/AppFooter';
import Home from './pages/Home';
import Product from './pages/Product';
import AppLoader from './components/AppLoader/AppLoader';
import Error404 from './pages/Error404';
import Register from './pages/Register';

function App() {
  const isLog = true;
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='*' element={<Error404 />} />
        <Route path='/' element={<Home />} />
        <Route
          path='/product/:id'
          element={isLog ? <Product /> : <AppLoader />}
        />
        <Route path='/register' element={<Register />} />
      </Routes>
      <AppFooter />
    </>
  );
}

export default App;
