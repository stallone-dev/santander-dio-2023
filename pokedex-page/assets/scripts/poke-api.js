"use strict";

const pokeApi = {};
pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const _URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(_URL)
        .then((response) => response.json())
        .then((body) => body.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .catch((err) => {
            console.error(err);
        });
};
