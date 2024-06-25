import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'; 
import styles from './styles.module.css';

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
            <div className={styles.choosenItemPrice}>
                ${(Number(price) * quantity).toFixed(2)}
            </div>
            <div className={styles.container}>
                <button 
                    type='button'
                    className={styles.decreaseQuantity} 
                    onClick={handleDecrement} 
                    disabled={quantity === 1}
                    style={quantity === 1 ? {backgroundColor: 'grey', pointerEvents: 'none'} : {}}>
                    <span> 
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                </button>
                <span className={styles.selectQuantity}>  
                    {quantity}
                </span>
                <button type='button' className={styles.increaseQuantity} onClick={handleIncrement}>
                    <span>
                        <FontAwesomeIcon icon={faPlus}/>
                    </span>
                </button><br/>   
            </div>        
        </>

    )
}

export default Quantity