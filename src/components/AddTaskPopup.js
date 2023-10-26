import React, { useState, useEffect } from 'react';
import closeIcon from '../assets/img/close-icon.svg';

function AddTaskPopup(props) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const isOpen = props.isOpen ? 'popup_opened' : '';

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeDate(e) {
    setDeadline(e.target.value);
  }

  useEffect(() => {
    setTitle('');
    setDeadline('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddTask({
      id: props.onGenerateId(),
      title: title,
      deadline: props.onFormatDeadline(deadline),
      isChecked: false,
      createdAt: props.onGetCreatedAt(),
    });
  }

  return (
    <div onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        props.onClose()
      }
    }} className={`popup ${isOpen}`}>
      <div className='popup__container'>
        <button onMouseDown={props.onClose} className='button'>
          <img className='popup__close-icon' src={closeIcon} alt='Закрыть' />
          <span>Закрыть</span>
        </button>
        <h2 className='popup__title'>Новая задача</h2>
        <form onSubmit={handleSubmit} className='popup__form'>
          <label className='popup__label' htmlFor='task'>Название</label>
          <input
            id='task'
            type='text'
            minLength='2'
            maxLength='200'
            className='popup__input'
            placeholder=''
            required
            value={title || ''}
            onChange={handleChangeTitle}
          />
          <label className='popup__label' htmlFor='datetime'>Дедлайн</label>
          <input
            id='datetime'
            type='datetime-local'
            className='popup__input'
            required
            value={deadline || ''}
            onChange={handleChangeDate}
          />
          <button className='popup__submit-button' type='submit'>Добавить</button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskPopup;
