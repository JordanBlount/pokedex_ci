const initialState = {
    default: true,
    name: 'Loading...',
    id: 900,
    types: [],
    height: 0,
    weight: 0,
    sprites: [],
    image: null,
    description: 'This is the ilusive pokemon that never appears.',
    evolution_chain_URL: null
}

const baseNormalURL = 'https://pokeapi.co/api/v2/pokemon/'; // Ex: https://pokeapi.co/api/v2/pokemon/1/

// Has more information about each pokemon
const baseSpeciesURL = 'https://pokeapi.co/api/v2/pokemon-species/'; // Ex: https://pokeapi.co/api/v2/pokemon-species/1/


const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        // Sets the new pokemon data
        case 'SET_POKEMON':
            return action.payload;

        default:
            return state
    }
}

export default pokemonReducer;