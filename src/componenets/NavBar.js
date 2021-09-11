import React from 'react';

// Imported SVG file so it would show up correctly. I couldn't place it directly in the img src
import logo from '../assets/logo.svg'

const NavBar = () => {
    return (
        <nav>
            <img id="logoImg" src={logo} alt='pokeball logo'></img>
            <p id="logoText">Pokedex</p>
        </nav>
    );
};

export default NavBar;