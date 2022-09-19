import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Requisite 1 tests', () => {
  test('Testing if Home <link> is renderized ', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const testTarget = screen.getByRole('link', { name: 'Home' });
    expect(testTarget).toBeInTheDocument();
  });

  test('Testing if About <link> is renderized ', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  test('Testing if Favorite Pokémons <link> is renderized', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });
});
