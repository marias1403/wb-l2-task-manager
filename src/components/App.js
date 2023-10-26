import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddTaskPopup from './AddTaskPopup';
import EditTaskPopup from './EditTaskPopup';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = useState(false);

  function handleAddTaskClick() {
    setIsAddTaskPopupOpen(true);
  }

  function closePopup() {
    setIsAddTaskPopupOpen(false);
    setIsEditTaskPopupOpen(false);
  }

  function handleAddTaskSubmit(newCard) {
    const updatedTasks = [...tasks, newCard];
    setTasks(updatedTasks);
    closePopup();
  }

  function handleEditTaskSubmit(editedTask) {
    const taskIndex = tasks.findIndex(task => task.id === editedTask.id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = editedTask;
      setTasks(updatedTasks);
    }
    closePopup();
  }

  function generateId() {
    const randomPart = Math.random().toString(36).substring(2, 11);
    const timePart = new Date().getTime().toString(36);
    return randomPart + timePart;
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

  function formatDeadlineToString(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  function formatDateStringForDatetimeInput(deadlineString) {
    if (deadlineString) {
      let parts = deadlineString.split(/[\s.]+/);
      let day = parts[0];
      let month = parts[1];
      let year = parts[2];
      let hour = parts[3];
      return year + "-" + month + "-" + day + "T" + hour ;
    }
  }

  function toggleCheckedTask(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleEditTask(taskData) {
    setSelectedTask(taskData);
    setIsEditTaskPopupOpen(true);
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
          onDeleteTask={handleDeleteTask}
          onCheckTask={toggleCheckedTask} />
        <Footer />
      </div>
      <AddTaskPopup
        isOpen={isAddTaskPopupOpen}
        onClose={closePopup}
        onAddTask={handleAddTaskSubmit}
        onGenerateId={generateId}
        onGetCreatedAt={getCurrentDateAndTime}
        onFormatDeadline={formatDeadlineToString}
      />
      <EditTaskPopup
        task={selectedTask}
        isOpen={isEditTaskPopupOpen}
        onClose={closePopup}
        onEditTask={handleEditTaskSubmit}
        onFormatDeadline={formatDateStringForDatetimeInput}
        onStringifyDeadline={formatDeadlineToString}
      />
    </div>
  );
}

export default App;
