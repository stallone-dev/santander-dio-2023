"use strict";

const poke_index = document.querySelector(".poke-index");
const load_index_button = document.querySelector("#loadMore");
const offset_limit = 240;
const limit = 32;
let offset = 0;

const load_pokemons_itens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemon_data = []) => {
        const cards_html = pokemon_data.map((data) => convert_to_pokemon_card(data)).join("");
        insert_on_pokemon_index(cards_html);
    });
};

const insert_on_pokemon_index = (cards_html) => {
    poke_index.innerHTML += cards_html;
};

const convert_to_pokemon_card = (pokemon) => {
    return `<li class="pokemon-card ${pokemon.main_type}">
                <span class="id">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types
        .map(
            (type) =>
                `<li class="type ${type}">${type}</li>`
        )
        .join("")}
                    </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name} Artwork"/>
                </div>
            </li>
            `;
};

load_index_button.addEventListener("click", () => {
    offset += limit;
    const next_group = offset + limit;

    if (next_group >= offset_limit) {
        const new_limit = next_group - offset;
        load_pokemons_itens(offset, new_limit);
        load_index_button.parentElement.removeChild(load_index_button);
    } else {
        load_pokemons_itens(offset, limit);
    }
});

load_pokemons_itens(offset, limit);
