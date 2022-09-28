import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import '@testing-library/jest-dom';

const renderDetails = () => renderWithRouter(<App />);
const id = 25;
const text = 'This intelligent Pokémon roasts hard berries'
+ ' with electricity to make them tender enough to eat.';

describe('Requisite 7 <PokemonDetails> Component test', () => {
  test('Testing if correct info renders on screen', () => {
    const { queryByRole, getByRole, history, getByText } = renderDetails();
    const detailsButton = queryByRole('link', { name: /more details/i });

    act(() => {
      history.push(`/pokemons/${id}`);
    });
    const summaryBtn = getByRole('heading', { name: /summary/i, level: 2 });
    expect(getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();
    expect(summaryBtn).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
  });

  test('If maps section renders correctly', () => {
    const { history, getByRole, getByText, getAllByRole } = renderDetails();

    act(() => {
      history.push(`/pokemons/${id}`);
    });
    const locations = getByRole(
      'heading',
      { name: /game locations of pikachu/i, level: 2 },
    );
    expect(locations).toBeInTheDocument();
    const imgData = getAllByRole('img');
    expect(imgData.length).toBeGreaterThan(1);
    expect(getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(getByText(/kanto power plant/i)).toBeInTheDocument();
    expect(imgData[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgData[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgData[1].alt && imgData[2].alt).toBe('Pikachu location');
  });

  test('If user can favorite pokémon', () => {
    const { history, getByRole, getByLabelText } = renderDetails();
    act(() => {
      history.push(`/pokemons/${id}`);
    });
    const favCheckbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favCheckbox).toBeInTheDocument();
    expect(getByLabelText(/pokémon favoritado\?/i)).toBeInTheDocument();
  });
});
