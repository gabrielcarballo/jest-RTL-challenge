import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

const renderPokedex = () => renderWithRouter(<App />);

describe('Requisite 5 testing <Pokedex> Component', () => {
  test('If page renders a <h2> with text "Encountered pokémons"', () => {
    const { getByRole } = renderPokedex();
    expect(getByRole('heading', { level: 2, name: /Encountered pokémons/i }))
      .toBeInTheDocument();
  });

  test('If next pokémon render when clicking "próximo pokémon" button on a cycle', () => {
    const { getByRole, getByText } = renderPokedex();
    const nextButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton)
      .toBeInTheDocument();

    const array = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    array.forEach((e) => {
      expect(getByText(`${e}`)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  test('If all buttons are rendered correctly with correct text', () => {
    const { getAllByTestId } = renderPokedex();
    const arrayButtons = getAllByTestId('pokemon-type-button');
    const textTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    arrayButtons.forEach((e, index) => {
      expect(e).toBeInTheDocument();
      expect(e).toHaveTextContent(textTypes[index]);
    });
  });

  test('If page has a reset filter button named "All"', () => {
    const { getByRole, getByText } = renderPokedex();
    expect(getByText('Pikachu')).toBeInTheDocument();
    const allButton = getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');
    userEvent.click(allButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
