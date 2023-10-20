import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddTaskPopup from './AddTaskPopup';

function App() {
  return (
    <div className='page'>
      <div className='page__container'>
        <Header />
        <Main />
        <Footer />
      </div>
      <AddTaskPopup />
    </div>
  );
}

export default App;
