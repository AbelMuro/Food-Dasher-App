import React, {useState} from 'react';
import styles from './styles.module.css';

function ZipCode() {
    const [zip, setZip] = useState('');
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

    const handleZip = (e) => {
        const input = e.target.value;
        if(input.match(/\D/g) || input.length > 5)
            return;
        e.target.setCustomValidity('');
        setError('')
        setZip(input);
    }

    return(
        <div className={styles.zipCode}>
            <label className={styles.cardLabel} htmlFor='zip'>
                Zip Code
            </label>
            <input 
                style={error ? {border: '1px solid red'} : {}}
                type='text' 
                name='zip'
                id='zip'
                placeholder='ZIP'
                className={styles.cardInput} 
                value={zip}
                pattern='[0-9]{5}'
                onChange={handleZip}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                />
            {error === 'empty' && <div className={styles.errorMessage}>can't be empty</div>}
            {error === 'invalid' && <div className={styles.errorMessage}>invalid zip</div>}
        </div>
    )
}

export default ZipCode;