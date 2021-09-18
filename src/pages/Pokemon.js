import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Board from '../componenets/Board';

const Pokemon = (props) => {

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        // Check to see if the state in App.js is default. If so, we fetch a new pokemon
        if(props.pokemonData.default) {
            // NOTE: Gets the pokemon based on the current id (we get this from React Router);
            props.submitSearch(null, id, false);
        } else {
            console.log("Got here");
            // Checks to see if id is an integer
            if(!Number.isNaN(id)) {
                if(props.pokemonData.id === parseInt(id)) {
                    // Nothing happens.... The page should not refresh.
                } else {
                    props.submitSearch(null, id, false);
                }
            } else if(typeof id === 'string') {
                if(props.pokemonData.name.toLowerCase() === id.toLowerCase()) {
                    // nothing happens...The page should not refresh.
                } else {
                    props.submitSearch(null, id.toLowerCase(), false);
                }
            } else {
                // NOTE:
                history.push('/');
            }
        }
    }, []);
    
    return (
        <div className="pokemon page">
            <Board pokemonData={props.pokemonData} showSearchBar={props.showSearchBar}/>
        </div>
    );
};

export default Pokemon;