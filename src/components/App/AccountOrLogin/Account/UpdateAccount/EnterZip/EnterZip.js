import React, {useState} from 'react';
import styles from './styles.module.css';

function EnterZip(){
    const [zip, setZip] = useState('');

    const handleZip = (e) => {
        const input = e.target.value;

        if(input.match(/\D/) || input.length > 5)
            return;
        setZip(e.target.value);
    }

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Enter Zip: 
            </label>
            <input 
                type='text' 
                name='zip'
                placeholder='94806'
                className={styles.input}
                value={zip}
                onChange={handleZip}
                />
        </fieldset>
    )
}

export default EnterZip;