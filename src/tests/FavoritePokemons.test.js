import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Requisito 3', () => {
  test('Teste se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFavoritePokemon = screen.getByText(/no favorite pokemon found/i);
    expect(notFavoritePokemon).toBeInTheDocument();
    userEvent.click(notFavoritePokemon);
  });

  // Auxilio Rapunzel e Gabriel Fontes para entendimento da lógica.
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const favorite = screen.getByLabelText(/pokémon favoritado/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favoritePage = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritePage).toBeInTheDocument();
    userEvent.click(favoritePage);

    const cardPokemon = screen.getByTestId('pokemon-name');
    expect(cardPokemon).toBeInTheDocument();
  });
});
