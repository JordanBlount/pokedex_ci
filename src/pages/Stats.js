import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import convert from 'convert-units';

import Stat from '../componenets/stats/Stat';

import '../css/Stats.css';

const Stats = (props) => {

    const history = useHistory();
    const params = useParams();

    const paths = ['details'];

    const setHeight = (height) => {
        let final = '';
        let feet = 0;
        let toInches = convert((height * 10)).from('cm').to('in'); 
        if(toInches => 12) {
          feet = (toInches / 12);
          final = `${feet.toFixed(1)} ft`;
          return final;
        }
        return `${toInches.toFixed(0)} inches`;
      }

    // Converting weight from hectograms to kilograms to pounds.
    const setWeight = (weight) => {
        let toPounds = convert((weight * 0.1)).from('kg').to('lb');
        return `${toPounds.toFixed(0)} lbs`;
    }

    const getAbilities = () => {
        let final = '';
        props.pokemonData.abilities.map((item, index) => {
            final += `${capitalize(item.ability.name)}${item.is_hidden ? " (Hidden Ability), " : ", "}`;
            if(index === props.pokemonData.abilities.length - 1) {
                final = final.substring(0, final.length - 2);
            }
            return final
        })
        return final;
    }

    const capitalize = word => {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }

    const fixName = word => {
        let final = word.replace('-', ' ');
        return final.split(' ').map(str => capitalize(str)).join(' ');
    }

    useEffect(()=> {
        props.showSearchBar(false);
        // NOTE: Redo this routing because I am not even sure what I was doing lol
        // TODO: Make it so that these pages are not accessible unless you have actually search for OR opened a link directly to a pokemon (state has non-default data in it)
        if(!Number.isNaN(parseInt(params.stat))) {
            if(props.pokemonData.default) {
                history.push(`/`);
            } else {
                history.push(`/pokemon/${params.id}`);
            }
        }
        if(!paths.includes(params.stat.toLowerCase())) {
            props.showSearchBar(true);
            history.push('/');
        }
    }, []);

    return (
        <div id="stats" className='page'>
            <div className="stat-section">
                <h1 className="stat-section__header green_header">Pokemon Data</h1>
                <Stat name="Height" value={setHeight(props.pokemonData.height)}/>
                <Stat name="Weight" value={setWeight(props.pokemonData.weight)}/>
                <Stat name="Species" value={props.pokemonData.species}/>
                {
                    props.pokemonData.abilities.length > 0 ? <Stat name="Abilities" value={getAbilities()}/> : ''
                }
            </div>
            <div className="stat-section">
                <h1 className="stat-section__header green_header">Stats</h1>    
                {
                    props.pokemonData.stats.map((item, index) => (
                        <Stat key={index} name={fixName(item.stat.name)} value={`${item.base_stat} (base)`} />
                    ))
                }
            </div>
        </div>
    );
};

export default Stats;