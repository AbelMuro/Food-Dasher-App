import React, {useState, useEffect, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'; 
import {useDispatch} from 'react-redux';
import './styles.css';

function Quantity({prevQuantity, itemId}) {
    const [quantity, setQuantity] = useState(prevQuantity);
    const dispatch = useDispatch();
    const skipFirstRender = useRef(true);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement = () => {
        setQuantity(quantity - 1);
    }

    useEffect(() => {
        dispatch({type: 'UPDATE_CART', item: {id: itemId, quantity: quantity}})
    }, [quantity])

    useEffect(() => {
        if(skipFirstRender.current){
            skipFirstRender.current = false;
            return;
        }

        setQuantity(prevQuantity);
    }, [prevQuantity])

    useEffect(() => {
        if(quantity === 0)
            dispatch({type: 'REMOVE_ITEM', item: {id: itemId}})
    }, [quantity])


    return(
        <div className='item-quantity'>
            <button className='decrement' onClick={handleDecrement}>
                <FontAwesomeIcon icon={faMinus} className={"icon"}/>
            </button>
            {quantity}
            <button className='increment' onClick={handleIncrement}>
                <FontAwesomeIcon icon={faPlus} className={"icon"}/>
            </button>
        </div>
    )
}

export default Quantity;