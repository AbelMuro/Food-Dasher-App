import React from 'react';
import DeliveryOption from './DeliveryOption';
import DropOffOption from './DropOffOption';
import DropOffInstructions from './DropOffInstructions';
import PaymentInformation from './PaymentInformation';
import Tip from './Tip';
import TotalCost from './TotalCost';
import './styles.css';

function Form(){
    return(
        <form className='form-container'>
            <DeliveryOption/>
            <DropOffOption/>
            <DropOffInstructions/>
            <PaymentInformation/>
            <Tip/>
            <TotalCost/>
            <button className='form-submit'>
                Place holder
            </button>
        </form>
    )
}

export default Form;