import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddTaskPopup from './AddTaskPopup';
import EditTaskPopup from './EditTaskPopup';
import Login from './Login';
import Register from './Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = useState(false);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [sortByDeadlineAsc, setSortByDeadlineAsc] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function toggleSortByCreatedAt() {
    setSortByCreatedAtAsc(!sortByCreatedAtAsc);
    sortTasks('createdAt', sortByCreatedAtAsc);
  }

  function toggleSortByDeadline() {
    setSortByDeadlineAsc(!sortByDeadlineAsc);
    sortTasks('deadline', sortByDeadlineAsc);
  }

  const sortTasks = (key, ascending) => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      const valueA = new Date(formatDateStringForDatetimeInput(a[key]));
      const valueB = new Date(formatDateStringForDatetimeInput(b[key]));
      return ascending ? valueA - valueB : valueB - valueA;
    });
    setTasks(sortedTasks);
  }

  function handleAddTaskClick() {
    setIsAddTaskPopupOpen(true);
  }

  function closePopup() {
    setIsAddTaskPopupOpen(false);
    setIsEditTaskPopupOpen(false);
  }

  function handleAddTaskSubmit(newCard) {
    const updatedTasks = [newCard, ...tasks];
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
    const checkedTasks = tasks.filter(task => task.isChecked);
    const uncheckedTasks = tasks.filter(task => !task.isChecked);
    const taskToToggle = tasks.find(task => task.id === id);

    if (taskToToggle) {
      if (taskToToggle.isChecked) {
        const updatedCheckedTasks = checkedTasks.filter((task) => task.id !== id);
        const updatedTasks = [...uncheckedTasks, { ...taskToToggle, isChecked: false }, ...updatedCheckedTasks];
        setTasks(updatedTasks);
      } else {
        const updatedUncheckedTasks = uncheckedTasks.filter((task) => task.id !== id);
        const updatedTasks = [...updatedUncheckedTasks, { ...taskToToggle, isChecked: true }, ...checkedTasks];
        setTasks(updatedTasks);
      }
    }
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
    <CurrentUserContext.Provider value={ currentUser }>
      <div className='page'>
        <div className='page__container'>
          <Header />
          <Routes>
            <Route
              path='/sign-in'
              element={ <Login /> } />
            <Route
              path='/sign-up'
              element={ <Register /> } />
            <Route
              path='/'
              element={ <ProtectedRoute
                path='/'
                loggedIn={isLoggedIn}
                component={Main}
                childProps={{
                  'tasks': tasks,
                  'onAddTask': handleAddTaskClick,
                  'onEditTask': handleEditTask,
                  'onDeleteTask': handleDeleteTask,
                  'onCheckTask': toggleCheckedTask,
                  'onSortByCreatedAt': toggleSortByCreatedAt,
                  'onSortByDeadline': toggleSortByDeadline
                }}
              /> } />
          </Routes>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
