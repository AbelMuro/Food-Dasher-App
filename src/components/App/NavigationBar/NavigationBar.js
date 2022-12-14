import React, {useRef} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faX, faBars} from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';
import CheckOut from './CheckOut';
import {useMediaQuery} from 'react-responsive';



function NavigationBar() {
    let mobile = useMediaQuery({query: "(max-width: 670px)"});
    let displayOrder = useRef();
    let navBar = useRef(null);

    if(!mobile && navBar.current){
        navBar.current.classList.remove("closeOpen");
    }

    const displayCheckOut = () => {  
        displayOrder.current.classList.toggle("activate");
    }

    const closeCheckOut = () => {
        displayOrder.current.classList.toggle("activate"); 
    }

    const displayMenu = () => {
        navBar.current.classList.toggle("closeOpen")
    }

    const closeNavBar = () => {
        navBar.current.classList.remove("closeOpen");
    }

    return (
            <nav className={"navBar"} ref={navBar}>
        
                <div className={"hamburger"} onClick={displayMenu}>
                    <span><FontAwesomeIcon icon={faBars} className={"icon"}/></span>
                </div>

                <div className={"navLogo"}>
                    Food Dasher!
                </div>

                <ul className={"menu"}>    
                    <li>
                        <Link className={"menuItem"} to="/" onClick={closeNavBar}> 
                            <span><FontAwesomeIcon icon={faHouse} className={"icon"}/></span>
                        </Link> 
                    </li>

                    <div className={"whiteLine"}></div>
                    <li>
                        <Link className={"menuItem"} to="/GoogleMap" onClick={closeNavBar}>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} className={"icon"}/></span>
                        </Link> 
                    </li>
                    <div className={"whiteLine"}></div>
                    <li>
                        <Link className={"menuItem"} to="/" onClick={closeNavBar}>
                            <span><FontAwesomeIcon icon={faUser} className={"icon"}/></span>
                        </Link> 
                    </li>
                    <div className={"whiteLine"}></div>
                </ul>



                <div className={"menuCart menuItem"} onClick={displayCheckOut}>
                    <span ><FontAwesomeIcon icon={faCartShopping} className={"icon"}/></span>                   
                </div>
                <div className={"displayOrder"} ref={displayOrder}>
                    <div className={"yourOrder"}>           
                        Your Cart:
                    </div>
                    <div className={"close"} onClick={closeCheckOut}>
                        <span> <FontAwesomeIcon icon={faX}/> </span>
                    </div>
                    <CheckOut />
                </div>

            </nav>
    )
}

export default NavigationBar;
