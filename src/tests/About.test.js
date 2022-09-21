import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import About from '../pages/About';

const renderApp = () => renderWithRouter(<About />);
const testTargetText1p = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
const testTargetText2p = ('One can filter Pokémons by type,'
+ ' and see more details for each one of them');
const pkmImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Requisite 2 tests', () => {
  test('Testing if information on About Route renderizes', () => {
    renderApp();
    const testTarget = screen.getByText(testTargetText1p);
    expect(testTarget).toBeInTheDocument();
  });

  test('Testing if <About /> contains a h2 with "About Pokédex" text', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 2, name: 'About Pokédex' }))
      .toBeInTheDocument();
  });

  test('Testing if <About /> contains 2 <p> with text', () => {
    renderApp();
    const firstPTag = screen.getByText(testTargetText1p);
    const secondPTag = screen.getByText(testTargetText2p);

    expect(firstPTag).toBeInTheDocument();
    expect(secondPTag).toBeInTheDocument();
  });

  test('Testing if image of Pokédex is renderized correctly', () => {
    renderApp();
    const { src } = screen.getByRole('img');
    expect(src).toBe(pkmImg);
  });
});
