import { useSelector } from 'react-redux';

import Section from './Section';

import EvolutionTable from './EvolutionTable'

const Info = (props) => {

    const pokemonData = useSelector(state => state.pokemonData);

    return (
        <div id="info">
            <p className="pokemon-description">
                {pokemonData.description}
            </p>
            <Section pokemonData={pokemonData}/>
            <EvolutionTable pokemonData={pokemonData} />
            {/* <Section pokemonData={props.pokemonData}/> */}
            {/* <Section pokemonData={props.pokemonData}/> */}
        </div>
    );
};

export default Info;