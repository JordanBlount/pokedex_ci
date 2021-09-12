import React, { useEffect } from 'react';

import Tag from './Tag';
import Stats from './Stats';

import '../css/PokemonInfo.css'

const PokemonInfo = (props) => {

    return (                    
        // I need to fix this prop.pokemon.type because I want the info background to be colored based on the FIRST type that the pokemon is.
        // ${props.pokemonData.types[0].type.name}
        <div className={`pokemon-info`}>
            <div className='identity'>
                <h1 className='pokemon-name'>{props.pokemonData.name}</h1>
                <p className='pokemon-id'>{props.pokemonData.id}</p>
            </div>

            {/* Code for rendering the pokemon's tags */}
            {/* <div className="tag-container">
            <Tag type={`grass`}/>   
            <Tag type={`fire`}/>   
            <Tag type={`ghost`}/>   
            </div> */}

            {/* Image of the pokemon. I'm going to have to do some weird CSS tricks to get this to overlay correctly on the mobile version. I'm not going to worry about it though for now. I'll do that when I expand the app */}
            <img src={props.pokemonData.image} alt={props.pokemonData.name}></img>
        </div>
    );
};

export default PokemonInfo;