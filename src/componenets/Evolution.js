import React from 'react';

import noPokemonImg from '../assets/no-image.svg';

const Evolution = (props) => {

    // FIXME: Do not use this to check if they exist. This should also be asychronous
    const imageExists = (image_url) => {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        let exist = http.status !== 404;
        http.abort(); // Close the connection
        return exist;
    }

    // FIXME: Change this to store the URLs in state so that I do not have to make unncessary calls (e.g. The second pokemon image is checked 2 different times unncessarily)
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