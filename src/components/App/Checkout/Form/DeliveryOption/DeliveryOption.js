import React, {useState} from 'react';

function DeliveryOption() {
    const [option, setOption] = useState('standard');

    const handleOption = (e) => {
        setOption(e.target.value);
    }

    return(
        <fieldset className='radioButtons'>
            <label className='form-title'>
                Select Delivery Option
            </label>
            <input 
                type='radio' 
                name='deliveryOption' 
                id='standard' 
                value='standard' 
                checked={option === 'standard'}
                onChange={handleOption}
                />
            <label for='standard'>
                Standard
            </label>
            <input 
                type='radio'
                name='deliveryOption' 
                id='express' 
                value='express' 
                checked={option === 'express'}
                onChange={handleOption}
                />
            <label for='express'>
                Express
            </label>
            <input 
                type='radio' 
                name='deliveryOption' 
                id='schedule' 
                value='schedule' 
                checked={option === 'schedule'}
                onChange={handleOption}
                />
            <label for='schedule'>
                Schedule
            </label>
        </fieldset>
    )
}

export default DeliveryOption;