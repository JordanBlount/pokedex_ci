// Imported SVG file so it would show up correctly. I couldn't place it directly in the img src
import logo from '../assets/logo.svg'
import back_arrow from '../assets/back_arrow.svg';

const NavBar = (props) => {
    return (
        <nav>
            {
                props.isHome ? <img className="logoImg" src={logo} alt='pokeball logo'></img>
                    :
                    <div id="back" onClick={() => props.goToPage('/')}>
                        <img id="back_arrow" src={back_arrow} alt="back button"></img>
                        <img className="logoImg logoImg_diff" src={logo} alt='pokeball logo'></img>
                    </div>
            }
            <p id="logoText">Pokedex</p>
        </nav>
    );
};

export default NavBar;