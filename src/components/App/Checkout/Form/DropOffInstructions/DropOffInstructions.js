import React, {useState} from 'react';
import styles from './styles.module.css';

function DropOffInstructions(){
    const [text, setText] = useState('');

    const handleText = (e) => {
        setText(e.target.value);
    }

    return(
        <fieldset className={styles.container}>
            <label className={styles.title}>
                Drop-off Instructions
            </label>
            <textarea 
                placeholder='Enter Instructions'
                rows='15'
                cols='40'
                name='dropOffInstructions'
                value={text}
                onChange={handleText}
            />
        </fieldset>
    )
}

export default DropOffInstructions;