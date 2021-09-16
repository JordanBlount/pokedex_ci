// Imported SVG file so it would show up correctly. I couldn't place it directly in the img src
import logo from '../assets/logo.svg'
import back_arrow from '../assets/back_arrow.svg';
import { useLocation } from 'react-router';

const NavBar = (props) => {

    const location = useLocation();

    return (
        <nav>
            {
                location.pathname === '/' ? <img className="logoImg" src={logo} alt='pokeball logo'></img>
                    :
                    <div id="back" onClick={() => props.goBack()}>
                        <img id="back_arrow" src={back_arrow} alt="back button"></img>
                        <img className="logoImg logoImg_diff" src={logo} alt='pokeball logo'></img>
                    </div>
            }
            <p id="logoText">Pokedex</p>
        </nav>
    );
};

export default NavBar;