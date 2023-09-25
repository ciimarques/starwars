import React, { useEffect, useState } from 'react';
import './App.css';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/table';
import { Planet } from './types';
import { fetchPlanets } from './service/fecthApi';

function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filter, setFilter] = useState('');
  const filteredPlanets = planets.filter(
    (planet) => planet.name.toLowerCase().includes(filter.toLowerCase()),
  );
  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlanets();
      console.log(data);
      setPlanets(data);
    };
    getData();
  }, []);

  return (
    <StarWarsContext.Provider value={ { planets: filteredPlanets } }>
      <div className="App">
        <h1>Star Wars Planets</h1>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Filtrar por nome"
          value={ filter }
          onChange={ (event) => setFilter(event.target.value) }
        />
        <Table />
      </div>
    </StarWarsContext.Provider>
  );
}

export default App;
