import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';

function Header(props) {
  function signOut() {
    props.onLogout();
    return <Navigate to='/sign-in'/>;
  }

  return (
    <header className='header page__header'>
      <h1 className='header__title'>Планировщик задач</h1>
      <Routes>
        <Route
          path='/sign-in'
          element={<NavLink to='/sign-up' className='header__link'>Регистрация</NavLink>}
        />
        <Route
          path='/sign-up'
          element={<NavLink to='/sign-in' className='header__link'>Войти</NavLink>}
        />
        <Route
          path='/'
          element={
            <>
              <div>
                <span className='header__profile'>{props.currentUser.email}</span>
                <NavLink onClick={signOut} to='/sign-in' className='header__link'>Выйти</NavLink>
              </div>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
