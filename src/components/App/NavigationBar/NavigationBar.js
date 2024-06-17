import React, {useRef, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faBars} from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';
import Cart from './Cart';
import {useSelector, useDispatch} from 'react-redux';


function NavigationBar() {
    const navBar = useRef(null);
    const dispatch = useDispatch();


    const displayCart = () => {  
        dispatch({type: 'OPEN_CART'})
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

                <div className={"menuCart menuItem"} onClick={displayCart}>
                    <span><FontAwesomeIcon icon={faCartShopping} className={"icon"}/></span>                   
                </div>

                <Cart/>
            </nav>
    )
}

export default NavigationBar;
