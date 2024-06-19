import React, {useState} from 'react';

function CardNumber(){
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const patternMismatch = e.target.validity.patternMismatch;

        if(isEmpty)
            setError('empty');
        else if(patternMismatch)
            setError('invalid');
        
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;

        if(isEmpty)
            setError('empty');
        else 
            setError('invalid');
    }

    const handleNumber = (e) => {
        const formatCard = e.target.value.replaceAll(' ', '');                         
        let temp = '';

        if(formatCard.match(/\D/g) || formatCard.length > 16)
            return;

        e.target.setCustomValidity('');
        setError('')

        for(let i = 0; i < formatCard.length; i++){
            if(i % 4 === 0)                                      
                temp += ` ${formatCard[i]}`;
            else
                temp += formatCard[i];
        }
        setNumber(temp);
    }

    return(
        <div className='cardNumber'>
            <label className='cardLabel'>
                Card Number
            </label>
            <input 
                style={error ? {border: '1px solid red'} : {}}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                onChange={handleNumber}
                type='tel' 
                name='cardNumber'
                inputmode='numeric' 
                pattern='[0-9\s]{20}'
                placeholder='xxxx xxxx xxxx xxxx'
                autoComplete='cc-number'
                value={number}
                className='cardInput'
                required
                />
            {error === 'empty' && <div className='errorMessage'>can't be empty</div>}
            {error === 'invalid' && <div className='errorMessage'>invalid card number</div>}
        </div>
    )
}

export default CardNumber;