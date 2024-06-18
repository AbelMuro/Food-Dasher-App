import React from 'react';
import Map from './Map';
import './styles.css';
import {useSelector} from 'react-redux';
import { formatDeliveryTime } from '~/Common/functions';
import DisplayItems from './DisplayItems';
import Form from './Form';

function Checkout() {
    const deliveryTime = useSelector(state => state.checkout.deliveryOption.deliveryTime);

    return(
        <>
            <Map/>
            <section className='checkout-Container'>
                <h1>
                    DELIVERY TIME: {`${formatDeliveryTime(deliveryTime)}-${formatDeliveryTime(Number(deliveryTime) + 30)} `}
                </h1>
                <DisplayItems/>     
                <Form/>
            </section>        
        </>


    )
}

export default Checkout;