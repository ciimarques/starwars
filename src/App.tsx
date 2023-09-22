import React, { useEffect, useState } from 'react';
import './App.css';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/table';
import { Planet } from './types';
import { fetchPlanets } from './service/fecthApi';

function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlanets();
      console.log(data);
      setPlanets(data);
    };
    getData();
  }, []);

  return (
    <StarWarsContext.Provider value={ { planets } }>
      <Table />
    </StarWarsContext.Provider>
  );
}

export default App;
