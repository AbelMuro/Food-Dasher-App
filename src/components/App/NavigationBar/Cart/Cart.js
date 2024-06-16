import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {faX} from '@fortawesome/free-solid-svg-icons'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {v4 as uuid} from 'uuid';
import './styles.css'; 
import Quantity from './Quantity';

function Cart() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.cart.open);
    const items = useSelector(state => state.cart.items);
    

    const closeCart = () => {
        dispatch({type: 'CLOSE_CART'})
    }

    return (
        <div className={"displayOrder"} style={open ? {right: 0} : {right: '-100%'}}>
            <div className={"yourOrder"}>           
                Your Cart:
            </div>
            <div className={"close"} onClick={closeCart}>
                <span> <FontAwesomeIcon icon={faX}/> </span>
            </div>
            <section>
                {
                    items.map((item) => {
                        return(
                            <div className='itemContainerCheckOut' key={item.id}>
                                <img className='itemImageCheckOut' src={item.image}/>
                                <div className='itemNameCheckOut'>
                                    <span className='propertyTitles'>
                                        Name: 
                                    </span>
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                                {(item.excludedIngredients && item.excludedIngredients.length !== 0) && <div className='itemIngredientsCheckOut'>
                                    <span className='propertyTitles'>
                                        Exclude:
                                    </span>
                                    <span>
                                        {item.excludedIngredients.join(', ')}
                                    </span>
                                </div>}
                                {(item.sauces && item.sauces.length !== 0) && <div className='itemIngredientsCheckOut'>
                                    <span className='propertyTitles'>
                                        Sauces:
                                    </span>
                                    <span>
                                        {item.sauces.join(', ')}
                                    </span>
                                </div>}
                                <div className='itemPriceCheckOut'>
                                    <span className='propertyTitles'>
                                        Price:
                                    </span>
                                    <span>
                                        {item.price.toFixed(2)}
                                    </span>
                                </div>
                                <Quantity prevQuantity={item.quantity} itemId={item.id}/>
                            </div>
                        )
                    })
                }                
            </section>
        </div>
    )
}

export default Cart;

