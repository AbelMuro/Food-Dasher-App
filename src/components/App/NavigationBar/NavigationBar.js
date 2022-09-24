import React, {useRef} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faX} from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';
import CheckOut from './CheckOut';
import {useDispatch} from 'react-redux';



function NavigationBar() {
    let displayOrder = useRef();

    const displayCheckOut = () => {  
        displayOrder.current.classList.toggle("activate");
    }

    const closeCheckOut = () => {
        displayOrder.current.classList.toggle("activate"); 
    }

    return (
            <nav className={"navBar"}>
                <div className={"navLogo"}>
                    Food Dasher!
                </div>
                <ul className={"menu"}>    
                    <li>
                        <Link className={"menuItem"} to="/"> 
                            <span><FontAwesomeIcon icon={faHouse} /></span>
                        </Link> 
                    </li>
                    <li>
                        <Link className={"menuItem"} to="/GoogleMap">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                        </Link> 
                    </li>
                    <li>
                        <Link className={"menuItem"} to="/">
                            <span><FontAwesomeIcon icon={faUser} /></span>
                        </Link> 
                    </li>
                </ul>
                <div className={"menuCart menuItem"} onClick={displayCheckOut}>
                    <span><FontAwesomeIcon icon={faCartShopping} /></span>                   
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
