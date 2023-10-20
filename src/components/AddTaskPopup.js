import React from 'react';
import closeIcon from '../assets/img/close-icon.svg';

function AddTaskPopup() {
  return (
    <div className='popup popup_opened'>
      <div className='popup__container'>
        <button className='button'>
          <img className='popup__close-icon' src={closeIcon} alt='Закрыть' />
          <span>Закрыть</span>
        </button>
        <h2 className='popup__title'>Новая задача</h2>
        <form className='popup__form'>
          <label className='popup__label' htmlFor='task'>Название</label>
          <input
            id='task'
            type='text'
            minLength='2'
            maxLength='200'
            className='popup__input'
            placeholder=''
            required
          />
          <label className='popup__label' htmlFor='date'>Срок</label>
          <input
            id='date'
            type='date'
            className='popup__input'
            required
          />
          <button className='popup__submit-button'>Добавить</button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskPopup;
