import React, { useState } from 'react';
import pokemon from 'pokemon';
import axios from 'axios';

import NavBar from './componenets/NavBar';

import Home from './pages/Home.js';
import Pokemon from './pages/Pokemon.js';
import Stats from './pages/Stats.js'

import './css/App.css'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

const App = () => {

  // Using the history from React Router to change pages
  const history = useHistory();
  const location = useLocation();

  const [pokemonData, setPokemonData] = useState({
    default: true,
    name: 'default',
    id: 900,
    types: [],
    height: 0,
    weight: 0,
    sprites: [],
    image: null,
    description: 'This is the ilusive pokemon that never appears.',
    evolution_chain_URL: null
  })

  const [searchBar, showSearchBar] = useState(true);

  // TODO: This could be an integer or string. Make sure to use typeOf to determine that
  const [search, setSearch] = useState('')

  const baseNormalURL = 'https://pokeapi.co/api/v2/pokemon/'; // Ex: https://pokeapi.co/api/v2/pokemon/1/

  // Has more information about each pokemon
  const baseSpeciesURL = 'https://pokeapi.co/api/v2/pokemon-species/'; // Ex: https://pokeapi.co/api/v2/pokemon-species/1/

  // This depends on if the pokemon has an evolution chain. We can create an array to check to see which pokemon do and do not client-side instead of having to run unnecessary API calls
  // const baseEvolutionURL = 'https://pokeapi.co/api/v2/evolution-chain/';

  let baseImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/`

  const fetchPokemonData = (name) => {
    let pokemonID = pokemon.getId(name); // pokemon.getId(pokemon.random());
    let pokeData = {}
    axios.all([
      axios.get(`${baseNormalURL}${pokemonID}`),
      axios.get(`${baseSpeciesURL}${pokemonID}`)
    ])
      // TODO: Change this to just store all of the data in state (e.g. pokeData.data = [...data1, ...data2])
      .then(axios.spread((data1, data2) => {
        pokeData.name = data1.data.name;
        pokeData.names = data1.data.names;
        pokeData.id = data1.data.id;
        pokeData.types = data1.data.types;
        pokeData.height = data1.data.height;
        pokeData.weight = data1.data.weight;
        pokeData.stats = data1.data.stats;
        pokeData.base_experience = data1.data.base_experience;
        pokeData.sprites = data1.data.sprites;
        pokeData.image = data1.data.sprites.other.dream_world.front_default;

        // Gets the description in English. Some pokemon have descriptions that are not
        // English first. This goes through the array and finds the first description set that is 
        // in English.
        pokeData.description = data2.data.flavor_text_entries.find(set => {
          return set.language.name === "en"
        }).flavor_text; // description of our pokemon
        pokeData.descriptions = data2.data.flavor_text_entries;
        pokeData.is_legendary = data2.data.is_legendary;
        pokeData.is_mythical = data2.data.is_mythical;
        pokeData.evolution_chain_URL = data2.data.evolution_chain.url;

        pokeData.habitat = data2.data.habitat;
        pokeData.generation = data2.data.generation;

        return axios.get(pokeData.evolution_chain_URL)
      }))
        .then(response => {
          pokeData.chain = response.data.chain;
          // Stops use from making unnecessary API calls
          if(pokeData.chain !== undefined) {
            // let firstChain = pokeData.chain;
            // let secondChain = firstChain.evolves_to[0];
            // let secondPokemonId = secondChain.species.url.charAt(secondChain.species.url.length - 1);
            // let firstLevelUp = secondChain.evolution_details[0].min_level;
            // let firstLevelImg = `${baseImageUrl}${secondPokemonId}.svg`
      
            // let thirdChain = secondChain.evolves_to[0];
            // let thirdPokemonId = thirdChain.species.url.charAt(thirdChain.species.url.length - 1);
            // let secondLevelUp = thirdChain.evolution_details[0].min_level;
            // let secondLevelImg = `${baseImageUrl}${thirdPokemonId}.svg`
          }
          pokeData.default = false;
          setPokemonData(pokeData);
          setSearch('');
        });
  }

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  // Sets 'search' to be the default value for text
  const submitSearch = (event, text = search, input = true) => {
    if(text === '') {
      return;
    }
    if (!isNaN(text)) {
      let id = parseInt(text);
      if (id > 0 && id < 898) {
        let name = pokemon.getName(parseInt(text));
        fetchPokemonData(name);
        history.push(`/pokemon/${id}`);
      } else {
        if (input) {
          alert("This pokemon does not exist");
          setSearch('');
        } else {
          // Takes us to the homepage if the pokemon does not exist
          history.push('/')
        }
      }
    } else {
      // This capitalizes the first letter of the name
      text = text.charAt(0).toUpperCase() + text.substring(1);
      // Checks to see if the pokemon actually exist
      if (pokemon.all().includes(text)) {
        fetchPokemonData(text);
        history.push(`/pokemon/${text.toLowerCase()}`);
      } else {
        if (input) {
          alert("This pokemon does not exist");
          setSearch('');
        } else {
          // Takes us to the homepage if the pokemon does not exist
          history.push('/')
        }
      }
    }
  }

  return (
    // Sets the background color for the page based on the current location. If '/', sets it to red
    <div id='app' className={`${location.pathname === '/' ? 'start_color' : ''}`}>
      <NavBar pokemonData={pokemonData} isHome={pokemonData.default} setPokemonData={setPokemonData} />
      <Switch>
        <Route exact path='/'>
          <Home pokemonData={pokemonData} showSearchBar={showSearchBar} />
        </Route>
        <Route exact path='/pokemon/:id'>
          <Pokemon pokemonData={pokemonData} submitSearch={submitSearch} showSearchBar={showSearchBar} />
        </Route>
        <Route exact path='/pokemon/:id/stats/:stat'>
          <Stats pokemonData={pokemonData} showSearchBar={showSearchBar} />
        </Route>
      </Switch>
      <div style={{ display: searchBar ? 'flex' : 'none' }} className={`end ${location.pathname === '/' ? 'start_color' : ''}`}>
        <div id="searchBar">
          <input id="searchText" type='text' value={search} onChange={updateSearch} />
          <button id="searchBtn" onClick={submitSearch}>Search</button>
        </div>
      </div>
    </div>
  )
};


export default App;