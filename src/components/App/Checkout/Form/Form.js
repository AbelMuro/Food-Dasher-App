import React from 'react';
import DeliveryOption from './DeliveryOption';
import DropOffOption from './DropOffOption';
import DropOffInstructions from './DropOffInstructions';
import PaymentInformation from './PaymentInformation';
import './styles.css';

//now i need to implement the TIP
function Form(){
    return(
        <form className='form-container'>
            <DeliveryOption/>
            <DropOffOption/>
            <DropOffInstructions/>
            <PaymentInformation/>
        </form>
    )
}

export default Form;