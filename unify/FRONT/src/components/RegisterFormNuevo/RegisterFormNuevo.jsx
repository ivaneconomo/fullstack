import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { passwordCheckValidation } from '../../utils/validations';
import { customAlert, messages } from '../../utils/alerts';
import { useNavigate } from 'react-router-dom';
import { endPoints } from '../../utils/configs';
import axios from 'axios';

export default function RegisterFormNuevo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      passwordCheck: '',
      lang: 'es',
    },
  });

  const URL_SERVER = import.meta.env.VITE_URL_SERVER_C8;
  const navigate = useNavigate();
  const password = watch('password');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (register) => {
    console.log(register);
    try {
      const response = await axios.post(
        `${URL_SERVER}${endPoints.users}create-user`,
        register
      );

      customAlert(
        response.data,
        messages.registerSuccessText,
        messages.successIcon,
        () => {
          console.log(response);
          navigate('/');
        }
      );
    } catch (error) {
      let errorsMsg = '';
      error.response.data.errors.forEach((err) => {
        errorsMsg += err.msg + '\n';
      });
      customAlert(
        messages.registerFailureTitle,
        errorsMsg,
        messages.errorIcon,
        () => {
          console.log(error);
          navigate('/error404');
        }
      );
    }
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} sm={12} md={9} lg={6}>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className='d-flex flex-column gap-2 border rounded shadow p-3'
          >
            <h2 className='border-bottom pb-3'>Registro</h2>
            <div className='d-flex gap-2 justify-content-between'>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type='text'
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Complete este campo.',
                    },
                    minLength: {
                      value: 2,
                      message: 'Mínimo 2 caracteres.',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Máximo 50 caracteres.',
                    },
                    pattern: {
                      value:
                        /^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/,
                      message: 'Formato no válido.',
                    },
                  })}
                />
                {errors.name && (
                  <small className='text-danger'>{errors.name.message}</small>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type='text'
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'Complete este campo.',
                    },
                    minLength: {
                      value: 2,
                      message: 'Mínimo 2 caracteres.',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Máximo 50 caracteres.',
                    },
                    pattern: {
                      value:
                        /^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/,
                      message: 'Formato no válido.',
                    },
                  })}
                />
                {errors.lastName && (
                  <small className='text-danger'>
                    {errors.lastName.message}
                  </small>
                )}
              </Form.Group>
            </div>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'El email es obligatorio.',
                  },
                  minLength: {
                    value: 5,
                    message: 'Demasiado corto...',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Máximo 100 caracteres.',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:
                      'El correo electrónico debe tener un formato válido.',
                  },
                })}
              />
              {errors.email && (
                <small className='text-danger'>{errors.email.message}</small>
              )}
            </Form.Group>

            <div className='d-flex gap-2'>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'La contraseña es obligatoria.',
                      },
                      minLength: {
                        value: 8,
                        message: 'Mínimo 8 caracteres.',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Máximo 50 caracteres.',
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/,
                        message: 'La contraseña debe tener letras y números.',
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <small className='text-danger'>
                    {errors.password.message}
                  </small>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Repetir contraseña</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    className='me-0'
                    type={showPassword ? 'text' : 'password'}
                    {...register('passwordCheck', {
                      required: {
                        value: true,
                        message: 'La contraseña es obligatoria.',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Máximo 50 caracteres.',
                      },
                      validate: (value) =>
                        passwordCheckValidation(password, value),
                    })}
                  />
                  <a
                    className='my-auto mx-2'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className='bi bi-eye-slash'></i>
                    ) : (
                      <i className='bi bi-eye'></i>
                    )}
                  </a>
                </div>
                {errors.passwordCheck && (
                  <small className='text-danger'>
                    {errors.passwordCheck.message}
                  </small>
                )}
              </Form.Group>
            </div>

            <div className='container'>
              <div className='row justify-content-between align-items-center'>
                <Form.Group className='col-5 p-0'>
                  <Form.Label>
                    Idioma <small className='text-secondary'>(opcional)</small>
                  </Form.Label>
                  <Form.Select {...register('lang')}>
                    <option value='es'>Español</option>
                    <option value='en'>English</option>
                  </Form.Select>
                </Form.Group>

                <div className='col-6 align-self-end text-center'>
                  <span className=''>¿Ya estás registrado?</span><br/>
                  <Link to='/login'>Iniciar sesión</Link>
                </div>
              </div>
            </div>

            <Button variant='primary' type='submit' className='mt-3'>
              Registrarme
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
