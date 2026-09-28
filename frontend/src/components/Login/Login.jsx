import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onLogin?.({
      email,
      password,
    });
  }

  return (
    <main className='auth'>
      <section className='auth__container'>
        <h1 className='auth__title'>Inicia sesión</h1>

        <form className='auth__form' onSubmit={handleSubmit}>
          <input
            type='email'
            className='auth__input'
            name='email'
            placeholder='Correo electrónico'
            autoComplete='email'
            required
            value={email}
            onChange={handleEmailChange}
          />

          <input
            type='password'
            className='auth__input'
            name='password'
            placeholder='Contraseña'
            autoComplete='current-password'
            required
            value={password}
            onChange={handlePasswordChange}
          />

          <button type='submit' className='auth__submit'>
            Inicia sesión
          </button>
        </form>

        <p className='auth__redirect'>
          ¿Aún no eres miembro?{''}
          <Link to='/signup' className='auth__link'>
            Regístrate aquí
          </Link>
        </p>
      </section>
    </main>
  );
}
