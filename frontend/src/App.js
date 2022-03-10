import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

const App = () => {

  return (
    <BrowserRouter>
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;