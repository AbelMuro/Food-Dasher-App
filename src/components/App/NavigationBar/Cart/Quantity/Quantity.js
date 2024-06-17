import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

function Quantity({prevQuantity, itemId}){
    const [quantity, setQuantity] = useState(prevQuantity);
    const dispatch = useDispatch();
    const skipFirstRender = useRef();

    const handleDecrement = () => {
        setQuantity(quantity - 1)
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
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
            dispatch({type: 'REMOVE_ITEM', item: {id: itemId}});
    }, [quantity])

    return(
        <div className='quantityContainer'>
            <button className='decrementQuantity' onClick={handleDecrement}>
                <span><FontAwesomeIcon icon={faMinus} className={"icon"}/></span>  
            </button>
            <span>
                {quantity}
            </span>
            <button className='incrementQuantity' onClick={handleIncrement}>
                <span><FontAwesomeIcon icon={faPlus} className={"icon"}/></span> 
            </button>
        </div>
    )
}

export default Quantity;