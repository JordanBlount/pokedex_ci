import React, { useEffect, useState } from 'react';

import './css/App.css'

import NavBar from './componenets/NavBar';
import Board from './componenets/Board';
import pokemon from 'pokemon';
import axios from 'axios';


const App = () => {

  const [pokemonData, setPokemonData] = useState({
    default: true,
    name: 'default',
    id: 0,
    types: [],
    height: 0,
    weight: 0,
    sprites: [],
    images: '',
    description: '',
    evolution_chain_URL: ''
  })

  // NOTE: This could be an integer or string. Make sure to use typeOf to determine that
  const [search, setSearch] = useState('')

  const baseNormalURL = 'https://pokeapi.co/api/v2/pokemon/'; // Ex: https://pokeapi.co/api/v2/pokemon/1/

  // Has more information about each pokemon
  const baseSpeciesURL = 'https://pokeapi.co/api/v2/pokemon-species/'; // Ex: https://pokeapi.co/api/v2/pokemon-species/1/

  // NOTE: This depends on if the pokemon has an evolution chain. We can create an array to check to see which pokemon do and do not client-side instead of having to run unnecessary API calls
  // const baseEvolutionURL = 'https://pokeapi.co/api/v2/evolution-chain/';

  const fetchPokemonData = () => {
    let pokemonID = pokemon.getId(pokemon.random());
    let pokeData = {}
    axios.all([
      axios.get(`${baseNormalURL}${pokemonID}`),
      axios.get(`${baseSpeciesURL}${pokemonID}`)
    ])
    .then(axios.spread((data1, data2) => {
      pokeData.name = data1.data.name;
      pokeData.id = data1.data.id;
      pokeData.types = data1.data.types;
      pokeData.height = data1.data.height;
      pokeData.weight = data1.data.weight;
      pokeData.sprites = data1.data.sprites;
      pokeData.image = data1.data.sprites.other.dream_world.front_default;  

      pokeData.description = data2.data.flavor_text_entries[0].flavor_text; // description of our pokemon
      pokeData.is_legendary = data2.data.is_legendary;
      pokeData.is_mythical = data2.data.is_mythical;
      pokeData.evolution_chain_URL = data2.data.evolution_chain.url;
      setPokemonData(pokeData);
    }));
    // fetch(`${baseNormalURL}${pokemonID}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     pokeData.name = data.name;
    //     pokeData.id = data.id;
    //     pokeData.types = data.types;
    //     pokeData.height = data.height;
    //     pokeData.weight = data.weight;
    //     pokeData.sprites = data.sprites;
    //     pokeData.image = data.sprites.other.dream_world.front_default; // image for our pokemon
    //   })
    //   .then();
    // fetch(`${baseSpeciesURL}${pokemonID}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     pokeData.description = data.flavor_text_entries[0].flavor_text; // description of our pokemon
    //     pokeData.is_legendary = data.is_legendary;
    //     pokeData.is_mythical = data.is_mythical;
    //     pokeData.evolution_chain_URL = data.evolution_chain.url;
    //   });
  }

  if (pokemonData.default) {
    return (
      <div id="app">
        <NavBar />
        <button id="random" onClick={fetchPokemonData}>Random</button>
      </div>
    )
  } else {
    return (
      <div id="app">
        <NavBar />
        <Board pokemonData={pokemonData} />
        <button id="random" onClick={fetchPokemonData}>Random</button>
      </div>
    )
  }
};


export default App;