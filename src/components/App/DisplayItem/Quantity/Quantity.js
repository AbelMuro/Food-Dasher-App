import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';

function Quantity({getQuantity, price}) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement = () => {
        if(quantity === 1)
            return;
        setQuantity(quantity - 1)
    }

    useEffect(() => {
        getQuantity(quantity);
    }, [quantity])

    return(
        <>
            <div className='choosenItemPrice'>
                ${(Number(price) * quantity).toFixed(2)}
            </div>
            <button 
                type='button'
                className="decreaseQuantity" 
                onClick={handleDecrement} 
                disabled={quantity === 1}
                style={quantity === 1 ? {backgroundColor: 'grey', pointerEvents: 'none'} : {}}>
                <span> 
                    <FontAwesomeIcon icon={faMinus} />
                </span>
            </button>
            <span className="selectQuantity">  
                {quantity}
            </span>
            <button type='button' className="increaseQuantity" onClick={handleIncrement}>
                <span>
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
            </button><br/>   
        </>
    )
}

export default Quantity