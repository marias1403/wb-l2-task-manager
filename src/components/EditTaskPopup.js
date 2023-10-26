import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function EditTaskPopup(props) {
  const [deadline, setDeadline] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(props.task);

  useEffect(() => {
    setTaskToEdit(props.task);
  }, [props.task]);

  useEffect(() => {
    if (!props.task) {
      return;
    } else {
      setDeadline(props.onFormatDeadline(props.task.deadline));
    }
  }, [props.task]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTaskToEdit({ ...taskToEdit, [name]: value });
  }

  if (!taskToEdit) {
    return null;
  }

  if (!props.task) {
    return null;
  }

  if (deadline === '') {
    return null;
  }

  function handleChangeDate(e) {
    setDeadline(e.target.value);
    const { name, value } = e.target;
    setTaskToEdit({ ...taskToEdit, [name]: props.onStringifyDeadline(value) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditTask(taskToEdit);
  }

  return <Popup
    isOpen={props.isOpen}
    name={'editTask'}
    title={'Редактировать задачу'}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    buttonText={'Изменить'}
  >
    <label className='popup__label' htmlFor='titleForEdit'>Название</label>
    <input
      id='titleForEdit'
      name='title'
      type='text'
      minLength='2'
      maxLength='200'
      className='popup__input'
      placeholder=''
      required
      value={taskToEdit.title}
      onChange={handleInputChange}
    />
    <label className='popup__label' htmlFor='datetimeForEdit'>Дедлайн</label>
    <input
      id='datetimeForEdit'
      name='deadline'
      type='datetime-local'
      className='popup__input'
      required
      value={deadline}
      onChange={handleChangeDate}
    />
  </Popup>
}

export default EditTaskPopup;
