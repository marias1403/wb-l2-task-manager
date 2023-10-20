import React from 'react';

function Card() {
  return (
    <li className='task-item'>
      <div className='task-item__content'>
        <div className='checkbox'>
          <input className='checkbox__input' type='checkbox' id='1' />
            <span className='checkbox__checkmark'></span>
        </div>
        <div className='task-item__text-wrapper'>
          <label className='task-item__title' htmlFor='1'>Купить продукты</label>
          <p className='task-item__date'>10.10.2022</p>
        </div>
      </div>
      <div className='task-item__button-wrapper'>
        <button className='task-item__edit-button'></button>
        <button className='task-item__delete-button'></button>
      </div>
    </li>
  );
}

export default Card;
