import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { fetchPlanets } from '../service/fecthApi';
import { vi } from "vitest";
import userEvent from '@testing-library/user-event';
import StarWarsProvider from '../context/StarWarsProvider';

beforeEach(() => {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => fetchPlanets,
  } as Response;

  const mockData = vi.spyOn(global, "fetch").mockResolvedValue(MOCK_RESPONSE);
});

afterEach(() => {
  vi.restoreAllMocks();
})

describe('Testa o Componete <App.tsx />', () => {
  test('Teste se a página contém um titulo.', () => {
    render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
  test('Testa se Existe o componente <Filtered />', () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);
    const componetFiltered = screen.getByPlaceholderText('Filtrar por nome');
    expect(componetFiltered).toBeInTheDocument();
  });
  test('Testa se Existe o componente <Table />', () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);
    const componetTable = screen.getByText('Name');
    expect(componetTable).toBeInTheDocument();
  });
  test('Deve conter um input para filtrar nome', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);
    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();
  });
  test('Testa handleNameChange', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'Tatooine');
    expect(inputName).toHaveValue('Tatooine');
  });
  test('testa handleChange', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    userEvent.selectOptions(columnSelect, 'orbital_period');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    const valueInputElement = valueInput as HTMLInputElement;
    userEvent.type(valueInputElement, '500');
    const actualValue = parseFloat(valueInputElement.value);
    expect(columnSelect).toHaveValue('orbital_period');
    expect(comparisonSelect).toHaveValue('menor que');
    expect(actualValue).toBe(500);
  });
  test('testa removeAllFilters', async () => {
    render(
      <StarWarsProvider>
        <App />
       </StarWarsProvider>);
    const addButton = screen.getByTestId('button-filter');
    userEvent.click(addButton);
    const filterAdd = screen.getAllByTestId('filter').length;
    const btnRemoveAllFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRemoveAllFilters);
    const columnFilter = screen.getByTestId('column-filter') as HTMLSelectElement;
    expect(filterAdd).toBeGreaterThan(0);
    expect(columnFilter.value).toBe('population');
  })
});
