import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={ <Search /> } />
      </Routes>
    </main>
  );
}

export default App;
