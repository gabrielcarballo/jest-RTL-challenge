import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
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
  test('', () => {
    const { queryAllByTestId, queryAllByRole } = renderPokedex();
    const arrayButtons = queryAllByTestId('pokemon-type-button');
    /* const buttonsTarget = [];
    arrayButtons.forEach((e) => {
      buttonsTarget.push(e.textContent);
    });
    const arrayButtonsText = queryAllByRole('button');
    const textTarget = [];
    arrayButtonsText.forEach((e) => {
      textTarget.push(e.textContent);
    });
 */
    arrayButtons.forEach((e) => {
      expect(e).toBeInTheDocument();
     /*  expect([textTarget].some((a) => a === buttonsTarget)).toBeTruthy(); */
    });
  });
});
