import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import './styles.css';


//now i need to update the quantity in the store and i will need to persist the state in the local storage
function Quantity({prevQuantity, itemId}){
    const [quantity, setQuantity] = useState(prevQuantity);
    const dispatch = useDispatch();

    const handleDecrement = () => {
        setQuantity(quantity - 1)
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    useEffect(() => {

    }, [quantity])

    return(
        <div className='quantityContainer'>
            <button className='decrease' onClick={handleDecrement}>
                <span><FontAwesomeIcon icon={faMinus} className={"icon"}/></span>  
            </button>
            <span>
                {quantity}
            </span>
            <button className='increase' onClick={handleIncrement}>
                <span><FontAwesomeIcon icon={faPlus} className={"icon"}/></span> 
            </button>
        </div>
    )
}

export default Quantity;