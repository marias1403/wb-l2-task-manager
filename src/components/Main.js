import React from 'react';
import sortIcon from '../assets/img/sort_icon.svg';
import addIcon from '../assets/img/add_icon.svg';
import Card from './Card';

function Main(props) {
  function monitorDeadlines(tasks) {
    const deadlineThreshold = 60000;
    const now = new Date();
    tasks.forEach((task) => {
      const deadline = new Date(props.onFormatDeadline(task.deadline));
      const timeToDeadline = deadline - now;
      if (!task.isChecked && timeToDeadline > 0 && timeToDeadline <= deadlineThreshold) {
        sendNotification('Приближается дедлайн', {
          body: `У вас есть задача "${task.title}" с дедлайном через ${Math.round(timeToDeadline / 1000)} секунд.`,
        });
      }
    });
  }

  setInterval(() => {
    monitorDeadlines(props.tasks);
  }, 10000);

  const sendNotification = (title, options) => {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          reg.showNotification(title, options);
        });
      }
    });
  }

  return (
    <main className='content page__content'>
      <section className='toolbar content__section'>
        <div className='toolbar__sort'>
          <button className='button' onClick={props.onSortByCreatedAt} type='button'>
            <img className='toolbar__sort-icon' src={sortIcon} alt='Иконка сортировки'/>
            <span>По дате создания</span>
          </button>
          <button className='button' onClick={props.onSortByDeadline} type='button'>
            <img className='toolbar__sort-icon' src={sortIcon} alt='Иконка сортировки'/>
            <span>По дате выполнения</span>
          </button>
        </div>
        <button onClick={props.onAddTask} className='button'>
          <img className='toolbar__add-icon' src={addIcon} alt='Иконка добавления'/>
          <span>Добавить задачу</span>
        </button>
      </section>
      <section className='tasks content__section'>
        {
          props.tasks.length === 0
            ? <p className='tasks__no-tasks'>Пока задач нет</p>
            : <ul className='tasks__list'>
              {props.tasks.map((task) => <Card
                key={task.id}
                task={task}
                onDeleteClick={props.onDeleteTask}
                onEditClick={props.onEditTask}
                onCheckboxClick={props.onCheckTask} />)}
            </ul>
        }
      </section>
    </main>
  );
}

export default Main;
