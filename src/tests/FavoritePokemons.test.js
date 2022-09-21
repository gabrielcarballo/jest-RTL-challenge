import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

const renderFavPokemon = () => renderWithRouter(<FavoritePokemons />);

describe('Requisite 3 testing <FavoritePokemons> Component', () => {
  test(`Message "No favorite pokemon found" correctly 
renders when user has no favorite pokemons `, () => {
    const { getByRole, getByText } = renderFavPokemon();
    const testTarget = getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    const testTarget2 = getByText(/No favorite pokemon found/i);
    expect(testTarget).toBeInTheDocument();
    expect(testTarget2).toBeInTheDocument();
  });

  test('Cards are correctly rendered if has favorited pokemons', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    renderFavPokemon();
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toBeInTheDocument();
  });
});
