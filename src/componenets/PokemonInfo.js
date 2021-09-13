import React, { useEffect } from 'react';

import Tag from './Tag';

import '../css/PokemonInfo.css'

const PokemonInfo = (props) => {

    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    }

    const setId = (id) => {
        switch (id.toString().length) {
            case 1:
                return `#00${id}`
            case 2:
                return `#0${id}`
            case 3:
                return `#${id}`
            default:
                return id.toString()
        }
    }

    return (
        // I need to fix this prop.pokemon.type because I want the info background to be colored based on the FIRST type that the pokemon is.
        // ${props.pokemonData.types[0].type.name}
        <div className={`pokemon-info green`}>
            <div className={`container`}>
                <div className='identity'>
                    <h1 className='pokemon-name'>{capitalizeName(props.pokemonData.name)}</h1>
                    <p className='pokemon-id'>{setId(props.pokemonData.id)}</p>
                </div>

                <div className="tag-container">
                    {
                        props.pokemonData.types.map(tag => {
                            <Tag type={tag.type.name} />
                        })
                    }
                    <Tag type={`grass`} />
                    <Tag type={`poison`} />
                </div>

                {/* Code for rendering the pokemon's tags */}
                {/* <div className="tag-container">
            <Tag type={`grass`}/>   
            <Tag type={`fire`}/>   
            <Tag type={`ghost`}/>   
            </div> */}

                <img className="pokemon-image" src={props.pokemonData.image} alt={props.pokemonData.name}></img>
            </div>
        </div>
    );
};

export default PokemonInfo;