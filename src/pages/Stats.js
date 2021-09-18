import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import '../css/Stats.css';

const Stats = (props) => {

    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    const paths = ['details'];

    useEffect(()=> {
        props.showSearchBar(false);
        console.log(location.pathname);
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
            <p>Test</p>
        </div>
    );
};

export default Stats;