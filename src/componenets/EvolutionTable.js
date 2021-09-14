const EvolutionTable = (props) => {
    return (
        <div className="evolution-table">
            {/* 2 pokemon with a level in-between them. The images (sprites) are going to be passed through props */}
            <img className="pokemon-current-form"></img>
            <div className="level-up">
                Level 16
            </div>
            <img className="pokemon_evolved-form"></img>
        </div>
    );
};

export default EvolutionTable;