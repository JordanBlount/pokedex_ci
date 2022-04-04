import convert from 'convert-units';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { showSearchBar } from '../actions/searchAction';

import right_arrow from '../assets/right_arrow.svg';

const Section = (props) => {

    const navigate = useNavigate();
    const params = useParams();

    const dispatch = useDispatch();

    // Converting height from decimeters to centimeters to inches
    // const setHeight = (height) => {
    //     return convert((height * 10)).from('cm').to('in');
    // }

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

    const openDetails = () => {
        dispatch(showSearchBar(false));
        navigate(`/pokemon/${params.id}/stats/details`);
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
                    <p className="stat-data">{`${setHeight(props.pokemonData.height)}`}</p>
                </div>
                <div className="stat in-table">
                    <p className="stat-title">Weight</p>
                    {/* setWeight(props.pokemonData.weight).toFixed(1) */}
                    <p className="stat-data">{`${setWeight(props.pokemonData.weight)}`}</p>
                </div>
                <div id="more-info" onClick={openDetails}>
                    <img src={right_arrow} alt="right arrow"></img>
                </div>
            </div>
        </div>
    );
};

export default Section;