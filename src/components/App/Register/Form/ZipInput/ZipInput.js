import React, {useState} from 'react';
import styles from './styles.module.css';

function ZipInput() {
    const [zip, setZip] = useState('');
    const [error, setError] = useState('');

    const handleZip = (e) => {
        const input = e.target.value;

        if(input.length > 5 || input.match(/\D/))
            return;

        e.target.setCustomValidity('');
        setError('');
        setZip(input);
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
                Enter ZIP:
            </label>
            <input 
                style={error ? {border: '2px solid red'} : {}}
                type='text' 
                className={styles.input}
                placeholder='94806'
                pattern='[0-9]{5}'
                name='zip'
                value={zip}
                onChange={handleZip}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                required
                />
            {error === 'empty' && <div className={styles.errorMessage}>
                can't be empty
            </div>}
            {error === 'invalid' && <div className={styles.errorMessage}>
                invalid zip
            </div>}
        </fieldset>
    )
}

export default ZipInput;