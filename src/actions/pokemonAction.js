const SET_POKEMON = 'SET_POKEMON';

export const fetchPokemon = (name) => {
    return {
        type: SET_POKEMON,
        payload: name
    }
}