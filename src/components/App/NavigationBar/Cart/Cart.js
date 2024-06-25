import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {faX} from '@fortawesome/free-solid-svg-icons'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CheckOut from './CheckOut';
import Quantity from './Quantity';
import './styles.css'; 

function Cart() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.cart.open);
    const items = useSelector(state => state.cart.items);
    
    const closeCart = () => {
        dispatch({type: 'CLOSE_CART'});
    }

    useEffect(() => {
        if(!items.length)
            dispatch({type: 'CLEAR'});
    }, [items])

    return (
        <div className={"displayOrder"} style={open ? {right: 0} : {right: '-100%'}}>
            <div className={"yourOrder"}>           
                Your Cart:
            </div>
            <div className={"close"} onClick={closeCart}>
                <span> <FontAwesomeIcon icon={faX}/> </span>
            </div>
            <section className='cartContainer'>
                {
                    items.length ? 
                    items.map((item) => {
                        const image = item.image;
                        const name = item.name;
                        const excludedIngredients = item.excludedIngredients;
                        const sauces = item.sauces;
                        const price = item.price;
                        const quantity = item.quantity;
                        const id = item.id;

                        return(
                            <div className='itemContainerCheckOut' key={id}>
                                <img className='itemImageCheckOut' src={image}/>
                                <div className='itemNameCheckOut'>
                                    <span className='propertyTitles'>
                                        Name:&nbsp; 
                                    </span>
                                    <span>
                                        {name}
                                    </span>
                                </div>
                                {excludedIngredients.length !== 0 && <div className='itemIngredientsCheckOut'>
                                    <span className='propertyTitles'>
                                        Exclude:&nbsp;
                                    </span>
                                    <span>
                                        {excludedIngredients.join(', ')}
                                    </span>
                                </div>}
                                {sauces.length !== 0 && <div className='itemIngredientsCheckOut'>
                                    <span className='propertyTitles'>
                                        Sauces:&nbsp;
                                    </span>
                                    <span>
                                        {sauces.join(', ')}
                                    </span>
                                </div>}
                                <div className='itemPriceCheckOut'>
                                    <span className='propertyTitles'>
                                        Price:&nbsp;
                                    </span>
                                    <span>
                                        ${(price * quantity).toFixed(2)}
                                    </span>
                                </div>
                                <Quantity prevQuantity={quantity} itemId={id}/>
                            </div>
                        )
                    }) : <p className='cartMessage'>Cart is empty</p>
                }                
            </section>
            <CheckOut/>
        </div>
    )
}

export default Cart;

