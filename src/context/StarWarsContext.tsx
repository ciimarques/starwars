import { createContext } from 'react';
import { Planet } from '../types';

type StarWarsContextType = {
  planets:Planet[];
};
const StarWarsContext = createContext({} as StarWarsContextType);

export default StarWarsContext;
