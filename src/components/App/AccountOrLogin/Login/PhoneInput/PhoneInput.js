import React, {useState} from 'react';
import CountryCode from './CountryCode';
import styles from './styles.module.css';

function PhoneInput() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handlePhone = (e) => {
        const input = e.target.value;
        if(input.length > 10 || (input.match(/\D/)))
            return;

        e.target.setCustomValidity('');
        setError('');
        setPhone(e.target.value);
    }

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

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Enter Phone Number: 
            </label>
            <CountryCode/>
            <input 
                style={error ? {border: '2px solid red'} : {}}
                type='text' 
                className={styles.input}
                placeholder='123-456-7891'
                pattern='^[0-9]{3}[0-9]{3}[0-9]{4}$'
                name='phoneNumber'
                value={phone}
                onChange={handlePhone}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                />
            {error === 'empty' && <div className={styles.errorMessage}>
                can't be empty
            </div>}
            {error === 'invalid' && <div className={styles.errorMessage}>
                invalid phone number
            </div>}
        </fieldset>
    )
}

export default PhoneInput;