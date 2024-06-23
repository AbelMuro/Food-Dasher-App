import React, {useState} from 'react';
import styles from './styles.module.css';

function EnterEmail() {
    const [email, setEmail] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Enter Email: 
            </label>
            <input 
                type='text' 
                name='email'
                placeholder='johnsmith@gmail.com'
                className={styles.input}
                value={email}
                onChange={handleEmail}
                />
        </fieldset>
    )
}

export default EnterEmail;