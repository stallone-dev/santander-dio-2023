"use strict";

const pokeApi = {};
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const _URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(_URL)
        .then((response) => response.json())
        .then((body) => body.results)
        .catch((err) => {
            console.error(err);
        });
};
