import React from 'react';
import Table from './components/Table/table';
import Filtereds from './components/Filtros';
import './App.css';

function App() {
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <Filtereds />
      <Table />
    </div>
  );
}

export default App;
