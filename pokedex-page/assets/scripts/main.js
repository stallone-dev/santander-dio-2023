"use strict";

pokeApi.getPokemons().then((pokemon_data = []) => {
    const card_list = pokemon_data.map((data) => convert_to_pokemon_card(data));
    const cards_html = card_list.join("");
    insert_on_pokemon_index(cards_html);
});

const insert_on_pokemon_index = (cards_html) => {
    const poke_index = document.querySelector(".poke-index");
    poke_index.innerHTML = cards_html;
};

const convert_to_pokemon_card = (pokemon) => {
    return `<li class="pokemon-card">
                <span class="id">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${get_details.type_li(pokemon)}
                    </ol>
                    ${get_details.img(pokemon)}
                </div>
            </li>
            `;
};

 const get_detais = {
     type_li: (pokemon) => get_type_list(pokemon.types),
     img: (pokemon) => get_main_image(pokemon.sprites),
 };

 const get_type_list = (pokemonTypes) => {
     return pokemonTypes
         .map((typeOrder) => `<li class="type">${typeOrder.type.name}</li>`)
         .join("");
 };

 const get_main_image = (pokemonScrites) => {
     let model = (sprite) => `<img src="${sprite.front_default}"/>`;
     return model(pokemonScrites.other["official-artwork"]);
 };
