import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function AddTaskPopup(props) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

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

  return <Popup
    isOpen={props.isOpen}
    name={'addTask'}
    title={'Новая задача'}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    buttonText={'Добавить'}
  >
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
  </Popup>
}

export default AddTaskPopup;
