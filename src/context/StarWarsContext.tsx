import { createContext } from 'react';
import { Planet } from '../types';

type StarWarsContextType = {
  planets:Planet[];
  filteredPlanets: Planet[];
  handleFilter: (filterPlanet: Planet[]) => void
};
const StarWarsContext = createContext({} as StarWarsContextType);

export default StarWarsContext;
