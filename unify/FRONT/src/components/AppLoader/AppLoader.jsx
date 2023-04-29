import Spinner from 'react-bootstrap/Spinner';

function AppLoader() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Spinner animation="grow" variant="primary" />
      <span className='text-secondary fs-4'>Loading...</span>
    </div>
  );
}

export default AppLoader;