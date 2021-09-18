import Evolution from './Evolution';

import noPokemonImg from '../assets/no-image.svg';

import '../css/EvolutionTable.css'

const EvolutionTable = (props) => {

    let baseImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/`

    const getPokemonId = (url) => {
        let slashs = (findIndices(url, '/'));
        let first = slashs[slashs.length - 2];
        let last = slashs[slashs.length - 1];
        return url.substring(first + 1, last);
    }

    const findIndices = (str, char) =>
        str.split('').reduce((indices, letter, index) => {
            letter === char && indices.push(index);
            return indices;
        }, [])

    // FIXME: Refractor this code
    const evolutionTable = () => {
        let chains = [];
        let firstChain = props.pokemonData.chain;
        console.log(props.pokemonData.chain)
        if (props.pokemonData.chain !== undefined && props.pokemonData.chain.evolves_to.length !== 0) {
            let firstChain = props.pokemonData.chain;
            let firstPokemonId = getPokemonId(firstChain.species.url);
            let firstPokemonImg = `${baseImageUrl}${firstPokemonId}.svg`

            chains.push({
                firstImg: firstPokemonImg,
                secondImg: null,
                levelUp: null
            })

            let secondChain = firstChain.evolves_to;
            if (secondChain.length !== 0) {
                secondChain = firstChain.evolves_to[0];
                let secondPokemonId = getPokemonId(secondChain.species.url);
                let secondLevelUp = secondChain.evolution_details[0].min_level;
                let secondPokemonImg = `${baseImageUrl}${secondPokemonId}.svg`

                chains[0].secondImg = secondPokemonImg;
                chains[0].levelUp = secondLevelUp;

                chains.push({
                    firstImg: secondPokemonImg,
                    secondImg: null,
                    levelUp: null
                })
            } else {
                chains.pop();
            }

            let thirdChain = secondChain.evolves_to;
            if (thirdChain.length !== 0) {
                let thirdChain = secondChain.evolves_to[0];
                let thirdPokemonId = getPokemonId(thirdChain.species.url);
                let thirdLevelUp = thirdChain.evolution_details[0].min_level;
                let thirdPokemonImg = `${baseImageUrl}${thirdPokemonId}.svg`

                chains[1].secondImg = thirdPokemonImg;
                chains[1].levelUp = thirdLevelUp;

            } else {
                chains.pop()
            }
            
            // Checks to see if an evolution for the pokemon exist
            if (firstChain !== undefined) {
                return (
                    <div className="evolution_table">
                        {
                            chains.map((chain, index) => (
                                <Evolution key={index} firstImg={chain.firstImg} secondImg={chain.secondImg} levelUp={chain.levelUp} />
                            ))
                        }
                    </div>
                )
            } else {
                return ''
            }
        }
        return ''
    }

    return evolutionTable();
};

export default EvolutionTable;