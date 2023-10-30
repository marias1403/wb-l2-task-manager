import React, { useState } from 'react';

function Register(props) {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(data.email, data.password);
  }

  return (
    <div className='auth'>
      <h2 className='auth__heading'>Регистрация</h2>
      <form onSubmit={handleSubmit} className='auth__form'>
        <div className='auth__input-wrapper'>
          <input
            id='registerEmail'
            type='email'
            name='email'
            className='auth__input'
            placeholder='Email'
            required
            onChange={handleChange}
          />
          <input
            id='registerPassword'
            type='password'
            name='password'
            className='auth__input'
            placeholder='Пароль'
            required
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='auth__button'>Войти</button>
      </form>
    </div>
  );
}

export default Register;
