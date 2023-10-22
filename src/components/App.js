import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddTaskPopup from './AddTaskPopup';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpened] = useState(false);

  function handleAddTaskClick() {
    setIsPopupOpened(true);
  }

  function closePopup() {
    setIsPopupOpened(false);
  }

  function handleAddTaskSubmit(newCard) {
    const updatedTasks = [...tasks, newCard];
    setTasks(updatedTasks);
    closePopup();
  }

  console.log(tasks);

  function generateId() {
    const randomPart = Math.random().toString(36).substring(2, 11);
    const timePart = new Date().getTime().toString(36);
    const id = randomPart + timePart;
    return id;
  }

  function getCurrentDateAndTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  function formatDeadline(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  function handleEditTask(task) {

  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className='page'>
      <div className='page__container'>
        <Header />
        <Main
          tasks={tasks}
          onAddTask={handleAddTaskClick}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask} />
        <Footer />
      </div>
      <AddTaskPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddTask={handleAddTaskSubmit}
        onGenerateId={generateId}
        onGetCreatedAt={getCurrentDateAndTime}
        onFormatDeadline={formatDeadline}
      />
    </div>
  );
}

export default App;
