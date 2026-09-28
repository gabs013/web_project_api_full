import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoDesktop from '../../images/logo-desktop.png';
import logoMobile from '../../images/logo-mobile.png';

export default function Header({
  loggedIn,
  email,
  onSignOut,
}) {

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSignup = location.pathname === '/signup';
  const isSignin = location.pathname === '/signin';
  const showAuthLink = isSignup || isSignin;

  const linkPath = isSignup ? '/signin' : '/signup';
  const linkText = isSignup ? 'Iniciar sesión' : 'Regístrate';

  function handleMenuToggle() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }


    return (
    <header className='header'>
      {loggedIn && (
        <div
          className={`nav__mobile-user${
            isMenuOpen ? ' nav__mobile-user_opened' : ''
          }`}
        >
          <span className='nav__mobile-email'>{email}</span>

          <button
            type='button'
            className='nav__mobile-logout'
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
        </div>
      )}

      <nav className='nav'>
        <img
          src={logoDesktop}
          alt='Logo de Around The U.S.'
          className='nav__logo-desktop'
        />

        <img
          src={logoMobile}
          alt='Logo de Around The U.S.'
          className='nav__logo-mobile'
        />

        {loggedIn ? (
          <>
            <div className='nav__user'>
              <span className='nav__email'>{email}</span>

              <button
                type='button'
                className='nav__logout'
                onClick={handleSignOut}
              >
                Cerrar sesión
              </button>
            </div>

            <button
              type='button'
              className={`nav__menu-button${
                isMenuOpen ? ' nav__menu-button_opened' : ''
              }`}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
            >
              <span className='nav__menu-line'></span>
              <span className='nav__menu-line'></span>
              <span className='nav__menu-line'></span>
            </button>
          </>
        ) : (
          showAuthLink && (
            <Link to={linkPath} className='nav__auth-link'>
              {linkText}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
