import { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import { Planet } from '../types';
import { fetchPlanets } from '../service/fecthApi';

type StarWarsProviderProps = {
  children: React.ReactNode;
};

function StarWarsProvider({ children }: StarWarsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
      setFilteredPlanets(data);
    };
    getData();
  }, []);
  const handleFilter = (filtereds:Planet[]) => {
    setFilteredPlanets(filtereds);
  };
  const values = {
    planets,
    filteredPlanets,
    handleFilter,
  };
  return (
    <StarWarsContext.Provider value={ values }>
      {children}
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;
