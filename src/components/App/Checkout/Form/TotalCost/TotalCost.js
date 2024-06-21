import React, {useMemo} from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css'

function TotalCost() {
    const items = useSelector(state => state.cart.items);
    const tip = useSelector(state => state.checkout.tip);
    const deliveryOption = useSelector(state => state.checkout.deliveryOption.option);

    const total = useMemo(() => {
        const express = deliveryOption === 'express' ? 5 : 0;

        return items.reduce((acc, item) => {
            return acc + (item.quantity * item.price);
        }, 0) + Number(tip) + express;
    }, [items, tip, deliveryOption])

    return(
        <>
            <p className={styles.totalCost}>
                Total Cost: ${total.toFixed(2)}
            </p>    
            <input type='hidden' value={total.toFixed(2)} name='totalCost'/>    
        </>

    )
}

export default TotalCost;