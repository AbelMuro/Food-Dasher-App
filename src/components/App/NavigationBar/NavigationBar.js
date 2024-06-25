import React, {useRef, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faBars} from '@fortawesome/free-solid-svg-icons'; 
import styles from './styles.module.css';
import Cart from './Cart';
import {useDispatch} from 'react-redux';
import { useMediaQuery } from '@mui/material';

function NavigationBar() {
    const navBar = useRef(null);
    const dispatch = useDispatch();
    const mobile = useMediaQuery('(max-width: 670px)')


    const displayCart = () => {  
        dispatch({type: 'OPEN_CART'})
    }

    const openMenu = () => {
        navBar.current.classList.toggle(styles.closeOpen)
    }

    const closeMenu = () => {
        navBar.current.classList.remove(styles.closeOpen)
    }


    useEffect(() => {
        if(!mobile && navBar.current.classList.contains(styles.closeOpen))
            navBar.current.classList.toggle(styles.closeOpen);

    }, [mobile])

    return (
            <nav className={styles.navBar} ref={navBar}>
                <div className={styles.hamburger} onClick={openMenu}>
                    <span><FontAwesomeIcon icon={faBars} className={styles.icon}/></span>
                </div>

                <div className={styles.navLogo}>
                    Food Dasher!
                </div>

                <ul className={styles.menu}>    
                    <li>
                        <Link className={styles.menuItem} to="/" onClick={closeMenu}> 
                            <span><FontAwesomeIcon icon={faHouse} className={styles.icon}/></span>
                        </Link> 
                    </li>

                    <div className={styles.whiteLine}></div>
                    <li>
                        <Link className={styles.menuItem} to="/GoogleMap" onClick={closeMenu}>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/></span>
                        </Link> 
                    </li>
                    <div className={styles.whiteLine}></div>
                    <li>
                        <Link className={styles.menuItem} to="/AccountOrLogin" onClick={closeMenu}>
                            <span><FontAwesomeIcon icon={faUser} className={styles.icon}/></span>
                        </Link> 
                    </li>
                    <div className={styles.whiteLine}></div>
                </ul>

                <div className={[styles.menuCart, styles.menuItem].join(' ')} onClick={displayCart}>
                    <span><FontAwesomeIcon icon={faCartShopping} className={styles.icon}/></span>                   
                </div>
                <Cart/>
            </nav>
    )
}

export default NavigationBar;
