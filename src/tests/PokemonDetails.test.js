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

describe('Requisito 7', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado estão na tela.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const title = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    expect(title).toHaveTextContent(/pikachu details/i);

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(moreDetailsLink).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summaryDetails = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryDetails).toHaveTextContent(/summary/i);

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const textP = screen.getByText(/this intelligent pokémon roasts hard berries with/i);
    expect(textP).toBeInTheDocument();
  });

  test('Teste se existe uma seção com os mapas com as localizações do pokémon.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const titleLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(titleLocation).toHaveTextContent(/game locations of pikachu/i);

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    const locationPoke = screen.getAllByAltText(/Pikachu location/i);
    expect(locationPoke.length).toEqual(2);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const nameLocation1 = screen.getByText(/Kanto Power Plant/i);
    const nameLocation2 = screen.getByText(/Kanto Viridian Forest/i);
    expect(nameLocation1).toHaveTextContent(/Kanto Power Plant/i);
    expect(nameLocation2).toHaveTextContent(/Kanto Viridian Forest/i);

    const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(locationPoke[0]).toHaveAttribute('src', src1);
    expect(locationPoke[1]).toHaveAttribute('src', src2);
  });

  test('Teste se o usuário pode favoritar um pokémon através da pg de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);

    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const labelFavorite = screen.getByText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
