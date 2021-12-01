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

describe('Requisito 05', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const textPokedex = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(textPokedex).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toHaveTextContent(/próximo pokémon/i);
  });

  test('Os próximos Pokémons da lista devem ser mostrados, um a um.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(button);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('lista deve ser mostrado se estiver no último Pokémon da lista;', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(button);
    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();

    // clicando no botao 7 vezes até chgar no último pokemon.
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    const pokemonLast = screen.getByText(/dragonair/i);
    expect(pokemonLast).toBeInTheDocument();

    userEvent.click(button);
    const pokemon1 = screen.getByText(/pikachu/i);
    expect(pokemon1).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonRender = screen.getAllByTestId('pokemon-name');
    expect(pokemonRender.length).toEqual(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const numberButton = 7;
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const pokemonRender = screen.getAllByTestId('pokemon-type-button');
    // Verifica quantos botões tem na tela:
    expect(pokemonRender.length).toEqual(numberButton);
    // Testar se o nome repete
    const arrayType = pokemonRender.map((elemento) => elemento.textContent);
    // console.log(arrayType) => retorna o array com o nome dos tipo de botoes Pokemon renderizados na tela;
    const ArrayNoRepeteadType = [...new Set(arrayType)];
    expect(arrayType).toEqual(ArrayNoRepeteadType);
  });

  test('A partir da seleção do botão tipo, a Pokédex deve circular sapenas tipo', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(button);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(button);
    const nextPokemon1 = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemon1).toBeInTheDocument();
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic.', () => {
    renderWithRouter(<App />);
    const buttonSelected = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(buttonSelected);

    const dataIdType = screen.getByTestId('pokemon-type');
    expect(dataIdType).toHaveTextContent('Fire');

    // O botão All precisa estar sempre visível.
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toHaveTextContent(/all/i);

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado
    const buttonNormal = screen.getByRole('button', {
      name: /normal/i,
    });
    userEvent.click(buttonAll);
    expect(buttonNormal).toBeInTheDocument();
  });
});
