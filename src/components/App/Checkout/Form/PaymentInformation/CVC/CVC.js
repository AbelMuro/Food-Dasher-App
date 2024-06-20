import React, {useState} from 'react';
import styles from './styles.module.css';

function CVC() {
    const [cvc, setCvc] = useState('');
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

    const handleCvc = (e) => {
        const input = e.target.value;

        if(input.match(/\D/g) || input.length > 3)
            return;
        e.target.setCustomValidity('');
        setError('')

        setCvc(input);
    }

    return(
        <div className={styles.cvc}>
            <label className={styles.cardLabel} htmlFor='cvc'>
                CVC
            </label>
            <input 
                style={error ? {border: '1px solid red'} : {}}
                type='text' 
                name='cvc'
                id='cvc'
                className={styles.cardInput}
                placeholder='CVC'
                pattern='[0-9]{3}'
                value={cvc}
                onChange={handleCvc}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                />
            {error === 'empty' && <div className={styles.errorMessage}>can't be empty</div>}
            {error === 'invalid' && <div className={styles.errorMessage}>invalid cvc</div>}
        </div>
    )
}

export default CVC;