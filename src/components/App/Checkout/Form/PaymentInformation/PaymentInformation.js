import React from 'react';
import CardNumber from './CardNumber';
import ExpirationDate from './ExpirationDate';
import CVC from './CVC';
import ZipCode from './ZipCode';
import './styles.css';

function PaymentInformation() {
    return(
        <fieldset className='card-container'>
            <label className='form-title'>
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