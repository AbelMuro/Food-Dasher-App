import React, {useState} from 'react';
import styles from './styles.module.css';

function ExpirationDate() {
    const [exp, setExp] = useState('');
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

    const handleExp = (e) => {
        let cleanedText = e.target.value.replace('/', '');

        if(cleanedText.match(/\D/g) || cleanedText.length > 4)
            return;

        e.target.setCustomValidity('');
        setError('')

        let formattedText = cleanedText;
        if(cleanedText.length > 2)
            formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, cleanedText.length)}`;
        setExp(formattedText );
    }

    return(
        <div className={styles.expirationDate}>
            <label className={styles.cardLabel} htmlFor='expiration'>
                Expiration
            </label>
            <input 
                style={error ? {border: '1px solid red'} : {}}
                className={styles.cardInput} 
                type='text' 
                name='expirationDate'
                id='expiration'
                value={exp} 
                pattern='^[0-9]{2}/[0-9]{2}$'
                onChange={handleExp}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                placeholder='MM/YY'
                required
                />
                {error === 'empty' && <div className={styles.errorMessage}>can't be empty</div>}
                {error === 'invalid' && <div className={styles.errorMessage}>invalid date</div>}
        </div>
    )
}

export default ExpirationDate;