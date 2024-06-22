import React, {useState} from 'react';
import styles from './styles.module.css';

function CountryCode() {
    const [code, setCode] = useState('+1');

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    return(
        <div className={styles.container}>
            <div className={styles.plus}>+</div>
            <select 
                className={styles.select} 
                value={code}
                onChange={handleCode}
                name='countryCode'
                >
                <option value={'+1'}>
                    1
                </option>
                <option value={'+52'}>
                    52
                </option>
                <option value={'+55'}>
                    55
                </option>
                <option value={'+57'}>
                    57
                </option>
            </select>

        </div>

    )
}

export default CountryCode;