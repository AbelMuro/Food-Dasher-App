import React from 'react';
import CardNumber from './CardNumber';
import ExpirationDate from './ExpirationDate';
import CVC from './CVC';
import ZipCode from './ZipCode';
import styles from './styles.module.css';


//i will need to work on the responsiveness of this component
function PaymentInformation() {
    return(
        <fieldset className={styles.container}>
            <label className={styles.title}>
                Payment Information
            </label>
            <CardNumber/>
            <ExpirationDate/>
            <CVC/>
            <ZipCode/>
        </fieldset>
    )
}

export default PaymentInformation;