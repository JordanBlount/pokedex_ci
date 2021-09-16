import Section from './Section';

const Info = (props) => {
    return (
        <div id="info">
            <p className="pokemon-description">
                {props.pokemonData.description}
            </p>
            <Section pokemonData={props.pokemonData}/>
            {/* <Section pokemonData={props.pokemonData}/> */}
            {/* <Section pokemonData={props.pokemonData}/> */}
        </div>
    );
};

export default Info;