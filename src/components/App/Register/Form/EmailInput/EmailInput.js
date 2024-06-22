import React, {useState} from 'react';
import styles from './styles.module.css';

function EmailInput() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmail = (e) => {
        e.target.setCustomValidity('');
        setError('');
        setEmail(e.target.value);
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
                Enter Email: 
            </label>
            <input 
                style={error ? {border: '2px solid red'} : {}}
                type='email' 
                className={styles.input}
                placeholder='johnsmith@gmail.com'
                pattern='^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$'
                name='email'
                value={email}
                onChange={handleEmail}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                />
            {error === 'empty' && <div className={styles.errorMessage}>
                can't be empty
            </div>}
            {error === 'invalid' && <div className={styles.errorMessage}>
                invalid email
            </div>}
        </fieldset>
    )
}

export default EmailInput;