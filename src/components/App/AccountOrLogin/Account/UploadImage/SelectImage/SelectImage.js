import React, {useState} from 'react';
import styles from './styles.module.css';

function SelectImage() {
    const [image, setImage] = useState();
    const [error, setError] = useState('');

    const handleImage = (e) => {
        e.target.setCustomValidity('');
        setError('');
        setImage(e.target.files[0]);
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        setError('empty');
    }

    return(
        <>
            <input 
                className={styles.input}
                type='file' 
                onChange={handleImage}
                onInvalid={handleInvalid}
                accept='image/png, image/jpeg'
                name='image'
                required
                /> 
            {error === 'empty' && <div className={styles.errorMessage}> Please select a file</div>}
            {image && <img className={styles.image} src={URL.createObjectURL(image)}/>}
        </>
    )
}

export default SelectImage;