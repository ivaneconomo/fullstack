import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FORM_REGEX } from '../../utils/regex';
import { customAlert, messages } from '../../utils/alerts';
import { useNavigate } from 'react-router-dom';
import { endPoints } from '../../utils/configs';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const { name, lastName, age, email, password, passwordCheck } = formData;
  const { EMAIL_REGEX, PASSWORD_REGEX, FULLNAME_REGEX } = FORM_REGEX;
  const URL_SERVER = import.meta.env.VITE_URL_SERVER_C8;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FULLNAME_REGEX.test(formData.name)) {
      alert('Formato no válido.');
      return;
    }
    if (!FULLNAME_REGEX.test(formData.lastName)) {
      alert('Formato no válido.');
      return;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      alert('Formato de email no válido.');
      return;
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      alert('Formato de contraseña no válido');
      return;
    }
    if (formData.password !== formData.passwordCheck) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log(formData);

    try {
      const response = await axios.post(
        `${URL_SERVER}${endPoints.users}/create-user`,
        formData
      );

      customAlert(
        response.data,
        messages.registerSuccessText,
        messages.successIcon,
        () => {
          console.log(response);
          //navigate('/');
        }
      );
    } catch (error) {
      let errorMsg = '';
      error.response.data.errors.forEach((err) => {
        errorMsg += err.msg + '\n';
      });
      customAlert(
        messages.registerFailureTitle,
        errorMsg,
        messages.errorIcon,
        () => {
          console.log(error);
          //navigate('/error404');
        }
      );
    }
  };

  return (
    <Container className='vh-100'>
      <Row className='justify-content-center'>
        <Col md={6} lg={5} className='mt-5'>
          <Form
            className='p-3 border rounded shadow d-flex flex-column gap-3'
            onSubmit={handleSubmit}
          >
            <Form.Group controlId='name'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                value={lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Container fluid className='p-0'>
              <Row>
                <Col md={3}>
                  <Form.Group controlId='age'>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control
                      type='number'
                      name='age'
                      value={age}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={9}>
                  <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            <Form.Group controlId='password'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='passwordCheck'>
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type='password'
                name='passwordCheck'
                value={passwordCheck}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
