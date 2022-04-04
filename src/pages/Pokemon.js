import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Board from '../componenets/Board';

const Pokemon = (props) => {

    const navigate = useNavigate();
    const { id } = useParams();

    const pokemonData = useSelector(state => state.pokemonData);

    useEffect(() => {
        // Check to see if the state in App.js is default. If so, we fetch a new pokemon
        if(pokemonData.default) {
            // NOTE: Gets the pokemon based on the current id (we get this from React Router);
            props.submitSearch(null, id, false);
        } else {
            console.log("Got here");
            // Checks to see if id is an integer
            if(!Number.isNaN(id)) {
                if(pokemonData.id === parseInt(id)) {
                    // Nothing happens.... The page should not refresh.
                } else {
                    props.submitSearch(null, id, false);
                }
            } else if(typeof id === 'string') {
                if(pokemonData.name.toLowerCase() === id.toLowerCase()) {
                    // nothing happens...The page should not refresh.
                } else {
                    props.submitSearch(null, id.toLowerCase(), false);
                }
            } else {
                // NOTE:
                navigate('/');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="pokemon page">
            <Board />
        </div>
    );
};

export default Pokemon;