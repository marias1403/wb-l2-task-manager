import React from 'react';

function Card(props) {
  function handleCheckboxClick() {
    props.onCheckboxClick(props.task.id);
  }
  function handleEditClick() {
    props.onEditClick(props.task);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.task.id);
  }

  return (
    <li className='task-item'>
      <div className='task-item__content'>
        <div className='checkbox'>
          <input onChange={handleCheckboxClick} className='checkbox__input' type='checkbox' id={props.task.id} checked={props.task.isChecked} />
            <span className='checkbox__checkmark'></span>
        </div>
        <div className='task-item__text-wrapper'>
          <label className='task-item__title' htmlFor={props.task.id}>{props.task.title}</label>
          <p className='task-item__date'>{props.task.deadline}</p>
        </div>
      </div>
      <div className='task-item__button-wrapper'>
        <button onClick={handleEditClick} className='task-item__edit-button'></button>
        <button onClick={handleDeleteClick} className='task-item__delete-button'></button>
      </div>
    </li>
  );
}

export default Card;
