"use strict";

pokeApi.getPokemons().then((pokemon_data = []) => {
    const card_list = pokemon_data.map((data) => convert_to_pokemon_card(data));
    const card_html = card_list.join("");
    insert_on_pokemon_index(card_html);
});

const insert_on_pokemon_index = (card_html) => {
    const poke_index = document.querySelector(".poke-index");
    poke_index.innerHTML += card_html;
};

const convert_to_pokemon_card = (pokemon) => {
    return `
            <li class="pokemon-card">
                <span class="id">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>
                    </ol>
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                        alt="${pokemon.name} artwork"
                    />
                </div>
            </li>
            `;
};
