import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

const Stats = (props) => {

    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    const paths = ['details'];

    useEffect(()=> {
        props.showSearchBar(false);
        console.log(location.pathname);
        if(!Number.isNaN(parseInt(params.stat))) {
            if(props.pokemonData.default) {
                history.push(`/`);
            } else {
                history.push(`/pokemon/${params.id}`);
            }
        }
        if(!paths.includes(params.stat.toLowerCase())) {
            history.push('/');
        }
    }, []);

    return (
        <div className='stats page'>

        </div>
    );
};

export default Stats;