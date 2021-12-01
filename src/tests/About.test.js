import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Requisito 2', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const pokedex = screen.getByText(
      /About Pokédex/i,
    );
    expect(pokedex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const headAboutPokedex = screen.getByRole('heading', {
      level: 2, name: 'About Pokédex',
    });
    expect(headAboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // Auxílio Gabr Fontes: https://stackoverflow.com/questions/54234515/get-by-html-element-with-react-testing-library
    // const { container } = renderWithRouter(<About />);
    // const paragraphy = container.querySelectorAll('p');
    // expect(paragraphy).toHaveLength(2);

    // Auxílio Israel
    renderWithRouter(<About />);

    const textP1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(textP1).toBeInTheDocument();

    const textP2 = screen.getByText(/Pokémons by type, and see more details/i);
    expect(textP2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const srcURLImage = screen.getByRole('img', {
      name: /pokédex/i,
    });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(srcURLImage.src).toBe(src);
  });
});
