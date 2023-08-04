const baseURL = 'https://pokeapi.co/api/v2/';

export const getPokemonList = () => {
    return fetch(`${baseURL}pokemon`).then((response) => response.json());
};

export const getPokemonDetails = (pokemonName) => {
    return fetch(`${baseURL}pokemon/${pokemonName}`).then((response) => response.json());
};

export const getAllPokemonType = () => {
    return fetch(`${baseURL}type`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
};

export const getPokemonType = (type) => {
    return fetch(`${baseURL}type/${type}`).then((response) => response.json());
};

export const getPokemonAbility = (pokemonID) => {
    return fetch(`${baseURL}ability/${pokemonID}`).then((response) => response.json());
};