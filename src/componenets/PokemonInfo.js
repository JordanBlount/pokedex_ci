import Tag from './Tag';

import '../css/PokemonInfo.css'
import legendaryBadge from '../assets/legendary.svg';
import mythicalBadge from '../assets/myth.svg';

import noPokemonImg from '../assets/no-image.svg';

const PokemonInfo = (props) => {

    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    }

    const setId = (id) => {
        switch (id.toString().length) {
            case 1:
                return `#00${id}`
            case 2:
                return `#0${id}`
            case 3:
                return `#${id}`
            default:
                return id.toString()
        }
    }

    return (
        // FIXME: I need to fix this prop.pokemon.type because I want the info background to be colored based on the FIRST type that the pokemon is.
        // ${props.pokemonData.types[0].type.name}
        <div className={`pokemon-info ${props.pokemonData.color}`}>
            <div className={`container`}>
                <div className='identity'>
                    <div className="identity_left-side">
                        <h1 className='pokemon-name'>{capitalizeName(props.pokemonData.name)}</h1>
                        {
                            props.pokemonData.is_legendary ? <img className="legendary" src={legendaryBadge} alt="legendary badge"></img> : null
                        }
                        {
                            props.pokemonData.is_mythical ? <img className="mythical" src={mythicalBadge} alt="mythical badge"></img> : null
                        }
                    </div>
                    <div className="identity_right-side">
                        <p className='pokemon-id'>{setId(props.pokemonData.id)}</p>
                    </div>
                </div>

                <div className="tag-container">
                    {
                        // Gets only the first 2 tags out of the types
                        props.pokemonData.types.slice(0, 2).map((tag, index) => (
                            <Tag key={index} type={tag.type.name} />
                        ))
                    }
                </div>
                <img className="pokemon-image" src={props.pokemonData.image !== null ? props.pokemonData.image : noPokemonImg} alt={props.pokemonData.name}></img>
            </div>
        </div>
    );
};

export default PokemonInfo;