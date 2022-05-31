import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Board from '../componenets/Board';

const Pokemon = (props) => {

    const { id } = useParams();

    const pokemonData = useSelector(state => state.pokemonData);

    // Handles loading pokemon if someone directly links to this page
    useEffect(() => {
        // Check to see if the state in App.js is default. If so, we fetch a new pokemon
        if(pokemonData.default) {
            // NOTE: Gets the pokemon based on the current id (we get this from React Router);
            props.submitSearch(null, id, false);
        }
    }, []);
    
    return (
        <div className="pokemon page">
            <Board />
        </div>
    );
};

export default Pokemon;