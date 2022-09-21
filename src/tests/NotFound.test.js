import React from 'react';
import { act } from 'react-dom/test-utils';

import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

const renderNotFound = () => renderWithRouter(<NotFound />);

describe('Requisite 4 testing unknown route page', () => {
  test('If page renders "Page not found" text', () => {
    const { getByRole, history } = renderNotFound();

    act(() => {
      history.push('/test');
    });

    expect(getByRole('heading', { level: 2, name: /page requested not found/i }))
      .toBeInTheDocument();
  });

  test('If image renders correctly', () => {
    const { getByRole, history } = renderNotFound();
    const testTargetImg = /pikachu crying because the page requested was not found/i;
    act(() => {
      history.push('/test');
    });

    const { src } = getByRole('img', { name: testTargetImg });
    expect(getByRole('img', { name: testTargetImg }))
      .toBeInTheDocument();

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
