import React, { useEffect, useState } from 'react';

import './css/App.css'

import NavBar from './componenets/NavBar';
import Board from './componenets/Board';
import pokemon from 'pokemon';


const App = () => {

  // FIXME: Create a basic state so the application does not end up messing up when there is no
  // pokemon loaded
  const [pokemonData, setPokemonData] = useState({
    default: true,
    name: '',
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

  const getData = () => {
    let pokemonID = 1; //pokemon.getId(pokemon.random())
    let pokeData = {}
    fetch(`${baseNormalURL}${pokemonID}`)
      .then(response => response.json())
      .then(data => {
        pokeData.name = data.name;
        pokeData.id = data.id;
        pokeData.types = data.types;
        pokeData.height = data.height;
        pokeData.weight = data.weight;
        pokeData.sprites = data.sprites;
        pokeData.image = data.sprites.other.dream_world.front_default; // image for our pokemon
      });

    fetch(`${baseSpeciesURL}${pokemonID}`)
      .then(response => response.json())
      .then(data => {
        pokeData.description = data.flavor_text_entries[0].flavor_text; // description of our pokemon
        pokeData.evolution_chain_URL = data.evolution_chain.url;
      });
    setPokemonData(pokeData);
  }

  useEffect(() => {
    console.log("Test", pokemonData)
  }, [pokemonData]);

  // FIXME: Fix this so that <Board /> is not touched until it needs to be
  if (pokemonData.default) {
    return (
      <div id="app">
        <NavBar />
        <button onClick={getData}>Pokemon Normal</button>
      </div>
    )
  } else {
    return (
      <div id="app">
      <NavBar /> 
      <Board pokemonData={pokemonData} />
      <button onClick={getData}>Pokemon Normal</button>
    </div>
    ) 
  }
};


export default App;