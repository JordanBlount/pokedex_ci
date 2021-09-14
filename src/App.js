import React, { useEffect, useState } from 'react';

import './css/App.css'

import NavBar from './componenets/NavBar';
import Board from './componenets/Board';
import pokemon from 'pokemon';
import axios from 'axios';

import pokeball from './assets/pokeball.svg'
import pokemonLogo from './assets/pokemon_logo.svg'

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

  const fetchPokemonData = (name) => {
    let pokemonID = pokemon.getId(name); // pokemon.getId(pokemon.random());
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

        // Gets the description in English. Some pokemon have descriptions that are not
        // English first. This goes through the array and finds the first description set that is 
        // in English.
        pokeData.description = data2.data.flavor_text_entries.find(set => {
          return set.language.name === "en"
        }).flavor_text; // description of our pokemon
        pokeData.is_legendary = data2.data.is_legendary;
        pokeData.is_mythical = data2.data.is_mythical;
        pokeData.evolution_chain_URL = data2.data.evolution_chain.url;
        setPokemonData(pokeData);
        setSearch('');
      }));
  }

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  const test = () => {
    let text = search;
    if(!isNaN(text)) {
      let id = parseInt(text);
      if(id > 1 && id < 1118) {
        let name = pokemon.getName(parseInt(text));
        fetchPokemonData(name);
      } else {
        alert("This pokemon does not exist"); 
        setSearch('');
      }
    } else {
      text = text.charAt(0).toUpperCase() + text.substring(1);
      if(pokemon.all().includes(text)) {
        fetchPokemonData(text);
      } else {
        alert("This pokemon does not exist");
        setSearch('');
      }
    }
  }

  if (pokemonData.default) {
    return (
      <div id="app" className='start_color'>
        <NavBar />
        <div className="center start-screen start_color">
          <img className="pokemon_logo" src={pokemonLogo}></img>
          <img className="pokemon_ball" src={pokeball}></img>
          <h1 className="pokedex">Pokedex</h1>
        </div>
        <div className="end start_color">
          <div id="searchBar">
            <input id="searchText" type='text' value={search} onChange={updateSearch} />
            <button id="random" onClick={test}>Search</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div id="app">
        <NavBar />
        <div className="center">
          <Board pokemonData={pokemonData} />
        </div>
        <div className="end">
          <div id="searchBar">
            <input id="searchText" type='text' value={search} onChange={updateSearch} />
            <button id="random" onClick={test}>Search</button>
          </div>
        </div>
      </div>
    )
  }
};


export default App;