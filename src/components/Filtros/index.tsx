import { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../../context/StarWarsContext';
import { FilterPlanet } from '../../types';

const INITIAL_STATE = {
  name: '',
  column: 'population',
  comparison: '',
  value: '0',
};
const initialOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
function Filtereds() {
  const [filterName, setFilterName] = useState<FilterPlanet>(INITIAL_STATE);
  const [filter, setFilter] = useState<FilterPlanet>(INITIAL_STATE);
  const [filters, setFilters] = useState<FilterPlanet[]>([]);
  const { planets, handleFilter } = useContext(StarWarsContext);
  const [options, setOptions] = useState(initialOptions);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilterName({
      ...filterName,
      [name]: value,
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  useEffect(() => {
    filterPlanetsByName();
  }, [filterName]);
  const filterPlanetsByName = () => {
    const filteredPlanets = planets.filter((planet) => {
      const nameMatch = planet.name.toLowerCase().includes(filterName.name.toLowerCase());
      return nameMatch;
    });
    handleFilter(filteredPlanets);
  };
  const filterPlanetsByComparison = () => {
    let filteredPlanets = planets;
    filters.forEach((currentFilter) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        const { column, comparison, value } = currentFilter;
        const comp = comparison || 'maior que';
        if (planet[column] !== undefined) {
          const columnValue = parseFloat(planet[column]);
          switch (comp) {
            case 'maior que':
              return columnValue > parseFloat(value);
            case 'menor que':
              return columnValue < parseFloat(value);
            case 'igual a':
              return columnValue === parseFloat(value);
            default:
              return false;
          }
        }
        return false;
      });
    });
    handleFilter(filteredPlanets);
  };
  useEffect(() => {
    filterPlanetsByComparison();
  }, [filters]);
  const AddFilter = () => {
    const newFilters = [...filters, filter];
    setFilters(newFilters);
    const selectedOptions = newFilters.map((select) => select.column);
    const updatedOptions = initialOptions.filter(
      (option) => !selectedOptions.includes(option),
    );
    setOptions(updatedOptions);
    setFilter({
      ...filter,
      column: updatedOptions[0],
    });
  };
  const removeAllFilters = () => {
    setFilters([]);
    setOptions(initialOptions);
  };
  return (
    <>
      {filters.map((filterCurrent, index) => (
        <div key={ index } data-testid="filter">
          <select
            data-testid={ `filter-column-${index}` }
            value={ filterCurrent.column }
            name="column"
            onChange={ handleChange }
          >
            { options.map((option) => (
              <option key={ option } value={ option }>
                { option }

              </option>
            ))}
          </select>
          <select
            data-testid={ `filter-comparison-${index}` }
            value={ filterCurrent.comparison }
            name="comparison"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            data-testid={ `filter-value-${index}` }
            value={ filterCurrent.value }
            name="value"
            onChange={ handleChange }
          />
          <button
            data-testid={ `'remove-filters'-${index}` }
            onClick={ () => setFilters(filters.filter((_, i) => i !== index)) }
          >
            Remover
          </button>
        </div>
      ))}

      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por nome"
        value={ filterName.name }
        name="name"
        onChange={ handleNameChange }
      />
      <select
        data-testid="column-filter"
        value={ filter.column }
        name="column"
        onChange={ handleChange }
      >
        {options.map((option) => (
          <option key={ option } value={ option }>
            { option }
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ filter.comparison }
        name="comparison"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ filter.value }
        name="value"
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        onClick={ AddFilter }
      >
        Filter
      </button>
      <button
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover Filtragens
      </button>
    </>
  );
}

export default Filtereds;
