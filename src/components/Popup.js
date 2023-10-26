import React from 'react';
import closeIcon from '../assets/img/close-icon.svg';

function Popup(props) {
  const isOpen = props.isOpen ? 'popup_opened' : '';
  return (
    <div onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        props.onClose()
      }
    }} className={`popup popup_type_${props.name} ${isOpen}`}>
      <div className='popup__container'>
        <button onMouseDown={props.onClose} className='button' type='button'>
          <img className='popup__close-icon' src={closeIcon} alt='Закрыть' />
          <span>Закрыть</span>
        </button>
        <h2 className='popup__title'>{props.title}</h2>
        <form onSubmit={props.onSubmit} className='popup__form' name={props.name}>
          {props.children}
          <button className={`popup__submit-button popup__submit-button_type_${props.name}`} type='submit'>{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
