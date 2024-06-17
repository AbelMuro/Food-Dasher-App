import React, {memo} from 'react';
import './styles.css';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CheckOut() {
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
        dispatch({type: 'CLOSE_CART'});
        navigate('/Checkout');
    }

    return(
        <div className='checkoutContainer'>
            <div className='totalPrice'>
                Total: ${items.reduce((acc, item) => {
                    return acc + (item.quantity * item.price);
                }, 0).toFixed(2)}                
            </div>

            <button className='checkout' disabled={items.length === 0} onClick={handleCheckout}>
                Check out
            </button>            
        </div>

    )
}

export default memo(CheckOut);