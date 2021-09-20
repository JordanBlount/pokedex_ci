import PokemonInfo from './PokemonInfo';
import Info from './Info';

// This may be unnecessary. I need to first map out how I want to pass my props through so that I will not have to use extra components
const Board = (props) => {
    return (
        <div id="board">
            <PokemonInfo />
            <Info />
        </div>
    );
};

export default Board;