import React from 'react';

import noPokemonImg from '../assets/no-image.svg';

const Evolution = (props) => {

    function imageExists(image_url){

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    
    }

    return (
        <div className="evolution">
            {/* 2 pokemon with a level in-between them. The images (sprites) are going to be passed through props */}
            <img className="pokemon-current-form pokemon-img" src={imageExists(props.firstImg) ? props.firstImg : noPokemonImg} alt="First Pokemon"></img>
            <div className="level-up">{props.levelUp === null ? 'Level ???' : `Level ${props.levelUp}`}</div>
            <img className="pokemon_evolved-form pokemon-img" src={imageExists(props.secondImg) ? props.secondImg : noPokemonImg} alt="Second Pokemon"></img>
        </div>
    );
};

export default Evolution;