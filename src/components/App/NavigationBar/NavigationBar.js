import React, {useRef} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faX, faBars} from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';
import CheckOut from './CheckOut';



function NavigationBar() {
    let displayOrder = useRef();
    let menuItems = useRef();

    const displayCheckOut = () => {  
        displayOrder.current.classList.toggle("activate");
    }

    const closeCheckOut = () => {
        displayOrder.current.classList.toggle("activate"); 
    }

    const displayMenu = (e) => {
        let navBar = document.querySelector(".navBar");
        navBar.style.height = "300px";

    }

    return (
            <nav className={"navBar"} ref={menuItems}>
        
                <div className={"hamburger"} onClick={displayMenu}>
                    <span><FontAwesomeIcon icon={faBars} className={"icon"}/></span>
                </div>

                <div className={"navLogo"}>
                    Food Dasher!
                </div>

                <ul className={"menu"}>    
                    <li>
                        <Link className={"menuItem"} to="/"> 
                            <span><FontAwesomeIcon icon={faHouse} className={"icon"}/></span>
                        </Link> 
                    </li>
                    <li>
                        <Link className={"menuItem"} to="/GoogleMap">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} className={"icon"}/></span>
                        </Link> 
                    </li>
                    <li>
                        <Link className={"menuItem"} to="/">
                            <span><FontAwesomeIcon icon={faUser} className={"icon"}/></span>
                        </Link> 
                    </li>
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
