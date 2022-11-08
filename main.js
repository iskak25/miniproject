const poke_container = document.getElementById("poke_container");
const nav = document.getElementsByClassName("nav");
const pokeId_container = document.getElementsByClassName("foveritePokemon");
const pokemons_number = 50;

const colors = {
  fire: "#fddfdf",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#f4e7da",
  rosk: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#e6e0d4",
  normal: "#f5f5f5",
};

let pokemon, pokemonId;

const favorites = localStorage.getItem("movies")
  ? JSON.parse(localStorage.getItem("movies"))
  : [];

const main_types = Object.keys(colors);

// console.log(main_types);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const res = await fetch(url);

  pokemon = await res.json();
  createPokemonCard(pokemon);

  pokemonId = await favorites.map((pokeId) => {
    return pokemon.poke.find((newpoke) => newpoke.id === pokeId);
  });
  createPokemonCardId(pokemonId);
};

fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const poke_types = pokemon.types.map((el) => el.type.name);

  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  const pokeInnerHTML = `
  <div class="img_container">
  <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png' alt="">
</div>
<div class="info">
<span class="number">${pokemon.id}</span>
<h3 class="name">${name}</h3>
<small class="type">Type: <span>${type}</span></small>
</div>
${name}
<br/>
<button onclick="addToFavorite(${pokemon.id})"
        
class="favorite__btn">Добавить в избранное</button>

`;

  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
}

function createPokemonCardId(pokemonId) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemonId.name[0].toUpperCase() + pokemon.name.slice(1);

  const poke_types = pokemonId.types.map((el) => el.type.name);

  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  const pokeInnerHTML = `
  <div class="img_container">
  <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png' alt="">
</div>
<div class="info">
<span class="number">${pokemonId.id}</span>
<h3 class="name">${name}</h3>
<small class="type">Type: <span>${type}</span></small>
</div>
${name}
<br/>
<button onclick="addToFavorite(${pokemonId.id})"
        
class="favorite__btn">Добавить в избранное</button>

`;

  pokemonEl.innerHTML = pokeInnerHTML;

  pokeId_container.appendChild(pokemonEl);
}

function addToFavorite(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("movies", JSON.stringify(favorites));
  } else {
    alert("Фильм уже в избранных");
  }
}
