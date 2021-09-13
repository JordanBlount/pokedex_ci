import React from 'react';

import convert from 'convert-units';

const Section = (props) => {

    // Converting height from decimeters to centimeters to inches
    const setHeight = (height) => {
        return convert((height * 10)).from('cm').to('in');
    }

    // Converting weight from hectograms to kilograms to pounds.
    const setWeight = (weight) => {
        return convert((weight * 0.1)).from('kg').to('lb');
    }

    return (
        // TODO: Add some global styles to all of my sections. This is where I am going to put my spacing (container) logic so they line up correctly on mobile, tablet, and desktop.
        <div className="section">
            <h1 className="section-header">Stats</h1>
            <div className="stats-table">
                {/* The "in-table" class is to help add additional styling to these "stat" divs. This style is being reused in places of my app. */}
                <div className="stat in-table">
                    <p className="stat-title">Height</p>
                    {/* setHeight(props.pokemonData.height).toFixed(1) */}
                    <p className="stat-data">{`${setHeight(props.pokemonData.height).toFixed(0)} inches`}</p>
                </div>
                <div className="stat in-table">
                    <p className="stat-title">Weight</p>
                    {/* setWeight(props.pokemonData.weight).toFixed(1) */}
                    <p className="stat-data">{`${setWeight(props.pokemonData.weight).toFixed(0)} lbs`}</p>
                </div>
            </div>
        </div>
    );
};

export default Section;