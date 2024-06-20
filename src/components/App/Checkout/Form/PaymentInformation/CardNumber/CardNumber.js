import React, {useState} from 'react';
import icons from './icons';
import styles from './styles.module.css'

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
        <div className={styles.cardNumber}>
            <label className={styles.cardLabel} htmlFor='cardNumber'>
                Card Number
            </label>
            <img className={styles.cardIcon} src={icons['creditCard']}/>
            <input 
                style={error ? {border: '1px solid red', paddingLeft: 50} : {paddingLeft: 50}}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                onChange={handleNumber}
                id='cardNumber'
                type='tel' 
                name='cardNumber'
                inputMode='numeric' 
                pattern='[0-9\s]{20}'
                placeholder='xxxx xxxx xxxx xxxx'
                autoComplete='cc-number'
                value={number}
                className={styles.cardInput}
                required
                />
            {error === 'empty' && <div className={styles.errorMessage}>can't be empty</div>}
            {error === 'invalid' && <div className={styles.errorMessage}>invalid card number</div>}
        </div>
    )
}

export default CardNumber;