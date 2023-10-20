import React from 'react';
import sortIcon from '../assets/img/sort_icon.svg';
import addIcon from '../assets/img/add_icon.svg';
import Card from './Card';

function Main() {
  return (
    <main className='content page__content'>
      <section className='toolbar content__section'>
        <div className='toolbar__sort'>
          <button className='toolbar__button'>
            <img className='toolbar__sort-icon' src={sortIcon} alt='Иконка сортировки'/>
            <span>По дате создания</span>
          </button>
          <button className='toolbar__button'>
            <img className='toolbar__sort-icon' src={sortIcon} alt='Иконка сортировки'/>
            <span>По дате выполнения</span>
          </button>
        </div>
        <div className='toolbar__task-controls'>
          <button className='toolbar__button'>
            <img className='toolbar__add-icon' src={addIcon} alt='Иконка добавления'/>
            <span>Добавить задачу</span>
          </button>
          <button className='toolbar__notification'></button>
        </div>
      </section>

      <section className='tasks content__section'>
        <ul className='tasks__list'>
          <Card />
        </ul>
      </section>
    </main>
  );
}

export default Main;
