import React, {useMemo} from 'react';
import { useSelector } from 'react-redux';
import './styles.css'

function TotalCost() {
    const items = useSelector(state => state.cart.items);
    const tip = useSelector(state => state.checkout.tip);

    const total = useMemo(() => {
        return items.reduce((acc, item) => {
            return acc + (item.quantity * item.price);
        }, 0) + Number(tip);
    }, [items, tip])

    return(
        <>
            <p className='totalCost'>
                Total Cost: ${total.toFixed(2)}
            </p>    
            <input type='hidden' value={total.toFixed(2)} name='totalCost'/>    
        </>

    )
}

export default TotalCost;