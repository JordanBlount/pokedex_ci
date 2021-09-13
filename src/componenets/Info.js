import React from 'react';
import Section from './Section';

const Info = (props) => {
    return (
        <div id="info">
            <Section pokemonData={props.pokemonData}/>
        </div>
    );
};

export default Info;