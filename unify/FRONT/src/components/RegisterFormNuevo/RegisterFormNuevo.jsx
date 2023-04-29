import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
    <div className='vh-100 border border-danger border-3 rounded p-1'>
      body
      <div className='container border border-warning border-3 rounded p-1'>
        container
        <div className='row justify-content-center border border-primary border-3 rounded p-1'>
          row
          <section className='col-6 border border-success border-3 rounded p-1'>
            col
            <form onSubmit={handleSubmit(onSubmit)} className='border'>
              <div>
                <label>Nombre</label>
                <input
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
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div>
                <label>Apellido</label>
                <input
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
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </div>

              <div>
                <label>Email</label>
                <input
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
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div>
                <label>Contraseña</label>
                <input
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
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <div>
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i class='bi bi-eye-slash'></i>
                  ) : (
                    <i class='bi bi-eye'></i>
                  )}
                </button>
              </div>

              <div>
                <label>Repetir contraseña</label>
                <input
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
                {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
              </div>

              <div>
                <label>
                  Idioma <small className='text-secondary'>opcional</small>
                </label>
                <select {...register('lang')}>
                  <option value='es'>Español</option>
                  <option value='en'>English</option>
                </select>
              </div>

              <input type='submit' />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
