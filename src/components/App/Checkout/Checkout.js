import React from 'react';
import Map from './Map';
import styles from './styles.module.css';
import DisplayItems from './DisplayItems';
import Form from './Form';
import DeliveryTime from './DeliveryTime';

function Checkout() {

    return(
        <>
            <Map/>
            <section className={styles.container}>
                <DeliveryTime/>
                <DisplayItems/>     
                <Form/>
            </section>        
        </>


    )
}

export default Checkout;