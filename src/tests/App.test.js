import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

const renderApp = () => renderWithRouter(<App />);

describe('Requisite 1 <link> tests', () => {
  test('Testing if Home <link> is renderized and correct text', () => {
    renderApp();
    const testTarget = screen.getByRole('link', { name: 'Home' });
    expect(testTarget).toBeInTheDocument();
    expect(testTarget).toHaveTextContent('Home');
  });

  test('Testing if About <link> is renderized and correct text', () => {
    renderApp();
    const testTarget = screen.getByRole('link', { name: 'About' });
    expect(testTarget).toBeInTheDocument();
    expect(testTarget).toHaveTextContent('About');
  });

  test('Testing if Favorite Pokémons <link> is renderized and correct text', () => {
    renderApp();
    const testTarget = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(testTarget).toBeInTheDocument();
    expect(testTarget).toHaveTextContent('Favorite Pokémons');
  });
});

describe('Requisite 1 Routing tests', () => {
  test('Testing if Home link redirects to "/" route', () => {
    renderApp();
    const testTarget = screen.getByRole('link', { name: /home/i });
    userEvent.click(testTarget);
    expect(screen.getByRole('heading', { level: 1, name: /pokédex/i }))
      .toBeInTheDocument();
  });

  test('Testing if About link redirects to "/about" route', () => {
    renderApp();
    const testTarget = screen.getByRole('link', { name: /about/i });
    userEvent.click(testTarget);
    expect(screen.getByRole('heading', { level: 2, name: /about pokédex/i }))
      .toBeInTheDocument();
  });

  test('Testing if Pokémons Favoritados link redirects to "/favorites" route', () => {
    renderApp();
    const testTarget = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(testTarget);
    expect(screen.getByRole('heading', { level: 2, name: /favorite pokémons/i }))
      .toBeInTheDocument();
  });

  test('Testing if unrecognized route redirects to "/Not Found" route', () => {
    const { history } = renderApp();
    act(() => {
      history.push('/test');
    });

    expect(screen.getByRole('heading', { level: 2, name: /page requested not found/i }))
      .toBeInTheDocument();
  });
});
