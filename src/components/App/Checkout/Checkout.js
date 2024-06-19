import React from 'react';
import Map from './Map';
import './styles.css';
import DisplayItems from './DisplayItems';
import Form from './Form';
import DeliveryTime from './DeliveryTime';

function Checkout() {

    return(
        <>
            <Map/>
            <section className='checkout-Container'>
                <DeliveryTime/>
                <DisplayItems/>     
                <Form/>
            </section>        
        </>


    )
}

export default Checkout;