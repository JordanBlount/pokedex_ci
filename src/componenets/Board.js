import React from 'react';

import PokemonInfo from './PokemonInfo';
import Stats from './Stats';

// This may be unnecessary. I need to first map out how I want to pass my props through so that I will not have to use extra components
const Board = (props) => {
    return (
        <div id="board">
            <PokemonInfo pokemonData={props.pokemonData}/>
            <Stats pokemonData={props.pokemonData}/>
        </div>
    );
};

export default Board;