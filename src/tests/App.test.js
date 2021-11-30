import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Requisito 01: Testando App.js.', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links.', () => {
    renderWithRouter(<App />);
    // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
    const linkNavBarHome = screen.getByRole('link', {
      name: 'Home',
    });
    expect(linkNavBarHome).toBeInTheDocument();
    userEvent.click(linkNavBarHome);

    // Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.
    const linkNavBarAbout = screen.getByRole('link', {
      name: 'About',
    });
    expect(linkNavBarAbout).toBeInTheDocument();
    userEvent.click(linkNavBarAbout);

    // Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.
    const linkNavBarFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkNavBarFavorite).toBeInTheDocument();
    userEvent.click(linkNavBarFavorite);
  });

  // Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
  test('página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/teste');

    const notFound = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(notFound).toBeInTheDocument();
  });
});
