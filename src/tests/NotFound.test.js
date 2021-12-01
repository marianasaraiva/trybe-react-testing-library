import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { NotFound } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Requisito 04', () => {
  test('Teste se página contém um heading h2 com o texto not found.', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem com src.', () => {
    renderWithRouter(<NotFound />);

    const srcURLImage = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(srcURLImage.src).toBe(src);
  });
});
