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

describe('Requisito 6.', () => {
  test('Teste se é renderizado um card com as informações pokémon.', () => {
    renderWithRouter(<App />);
    const cardNamePokemon = screen.getByTestId('pokemon-name');
    expect(cardNamePokemon).toBeInTheDocument();
    expect(cardNamePokemon).toHaveTextContent('Pikachu');

    const cardTypePokemon = screen.getByTestId('pokemon-type');
    expect(cardTypePokemon).toBeInTheDocument();
    expect(cardTypePokemon).toHaveTextContent('Electric');

    const cardWeigthPokemon = screen.getByTestId('pokemon-weight');
    expect(cardWeigthPokemon).toBeInTheDocument();
    expect(cardWeigthPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imagePokemon = screen.getByAltText('Pikachu sprite');
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se Pokémon da Pokédex contém link para exibir detalhes do Pokémon.', () => {
    // e ainda Teste também se a URL exibida no navegador muda para /pokemon/<id>
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se so clicar link de navegação, é feito o redirecionamento Details', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const details = screen.getByRole('heading', {
      name: /Game Locations of/i,
    });
    expect(details).toHaveTextContent(/Game Locations of/i);
  });

  // Auxilio Luis Gustavo com a lógica.
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const favorite = screen.getByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const starFavoritePokemon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starFavoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
