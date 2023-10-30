import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddTaskPopup from './AddTaskPopup';
import EditTaskPopup from './EditTaskPopup';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';

function App() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = useState(false);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [sortByDeadlineAsc, setSortByDeadlineAsc] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    loadTasksFromLocalStorage();
    loadCurrentUserFromLocalStorage();
  }, [isLoggedIn]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(registration => {
          console.log('Service Worker зарегистрирован с успехом:', registration);
        })
        .catch(error => {
          console.log('Ошибка при регистрации Service Worker:', error);
        });
    }
  }, []);

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

  function closePopup() {
    setIsAddTaskPopupOpen(false);
    setIsEditTaskPopupOpen(false);
  }

  function handleAddTaskClick() {
    setIsAddTaskPopupOpen(true);
  }

  function handleAddTaskSubmit(newCard) {
    const jwtToken = localStorage.getItem('jwt');
    if (api.addTask(jwtToken)) {
      const updatedTasks = [newCard, ...tasks];
      updateTasksAndSaveToLocalStorage(updatedTasks);
    } else {
      console.log('Ошибка при запросе на сервер');
    }
    closePopup();
  }

  function toggleCheckedTask(id) {
    const jwtToken = localStorage.getItem('jwt');
    if (api.checkTask(jwtToken)) {
      const checkedTasks = tasks.filter(task => task.isChecked);
      const uncheckedTasks = tasks.filter(task => !task.isChecked);
      const taskToToggle = tasks.find(task => task.id === id);

      if (taskToToggle) {
        if (taskToToggle.isChecked) {
          const updatedCheckedTasks = checkedTasks.filter((task) => task.id !== id);
          const updatedTasks = [...uncheckedTasks, { ...taskToToggle, isChecked: false }, ...updatedCheckedTasks];
          updateTasksAndSaveToLocalStorage(updatedTasks);
        } else {
          const updatedUncheckedTasks = uncheckedTasks.filter((task) => task.id !== id);
          const updatedTasks = [...updatedUncheckedTasks, { ...taskToToggle, isChecked: true }, ...checkedTasks];
          updateTasksAndSaveToLocalStorage(updatedTasks);
        }
      }
    } else {
      console.log('Ошибка при запросе на сервер');
    }
  }

  function handleEditTask(taskData) {
    setSelectedTask(taskData);
    setIsEditTaskPopupOpen(true);
  }

  function handleEditTaskSubmit(editedTask) {
    const jwtToken = localStorage.getItem('jwt');
    if (api.editTask(jwtToken)) {
      const taskIndex = tasks.findIndex(task => task.id === editedTask.id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = editedTask;
        updateTasksAndSaveToLocalStorage(updatedTasks);
      } else {
        console.log('Ошибка при запросе на сервер');
      }
    }
    closePopup();
  }

  function handleDeleteTask(id) {
    const jwtToken = localStorage.getItem('jwt');
    if (api.deleteTask(jwtToken)) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      updateTasksAndSaveToLocalStorage(updatedTasks);
    } else {
      console.log('Ошибка при запросе на сервер');
    }
  }

  function handleLogin(email, password) {
    if (!email || !password){
      return;
    }
    setIsLoggedIn(true);
    const token = api.makeAuthRequest({
      email: email,
      password: password
    });
    localStorage.setItem('jwt', token);
    updateCurrentUserAndSaveToLocalStorage({
      email: email,
    });
    navigate('/');
  }

  function handleRegister(email, password) {
    if (!email || !password){
      return;
    }
    setIsLoggedIn(true);
    const token = api.makeAuthRequest({
      email: email,
      password: password
    });
    localStorage.setItem('jwt', token);
    updateCurrentUserAndSaveToLocalStorage({
      email: email,
    });
    navigate('/');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    updateTasksAndSaveToLocalStorage([]);
    updateCurrentUserAndSaveToLocalStorage({});
    localStorage.removeItem('jwt');
    localStorage.removeItem('tasks');
    localStorage.removeItem('currentUser');
  };

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

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  const saveCurrentUserToLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const loadCurrentUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  };

  const updateTasksAndSaveToLocalStorage = (newTasks) => {
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const updateCurrentUserAndSaveToLocalStorage = (user) => {
    setCurrentUser(user);
    saveCurrentUserToLocalStorage(user);
  };

  if (isLoggedIn === null) {
    return <div>loading...</div>
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className='page'>
        <div className='page__container'>
          <Header
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <Routes>
            <Route
              path='/sign-in'
              element={ <Login onLogin={handleLogin} /> } />
            <Route
              path='/sign-up'
              element={ <Register onRegister={handleRegister} /> } />
            <Route
              exact path='/'
              element={
                <ProtectedRoute
                  loggedIn={isLoggedIn}
                >
                  <Main
                    tasks={tasks}
                    onAddTask={handleAddTaskClick}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onCheckTask={toggleCheckedTask}
                    onSortByCreatedAt={toggleSortByCreatedAt}
                    onSortByDeadline={toggleSortByDeadline}
                    onFormatDeadline={formatDateStringForDatetimeInput}
                  />
                </ProtectedRoute>}
            />
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
