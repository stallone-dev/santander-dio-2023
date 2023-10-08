"use strict";

const pokeApi = {};

function convert_api_to_pokemon_model(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.order;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.main_type = pokemon.types[0];
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convert_api_to_pokemon_model);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const _URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(_URL)
        .then((response) => response.json())
        .then((body) => body.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((details) => details)
        .catch((err) => {
            console.error(err);
        });
};
