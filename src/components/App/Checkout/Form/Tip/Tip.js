import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styles from  './styles.module.css'

function Tip() {
    const [tip, setTip] = useState('5.00');
    const dispatch = useDispatch();

    const handleTip = (e) => {
        const input = e.target.value;
        if(input.match(/^\d+.\d{1,2}$/) || input.match(/^\d+.$/) || input.match(/^\d+$/) || input === '')
            setTip(input)
    }

    useEffect(() => {
        dispatch({type: 'UPDATE_TIP', tip})
    }, [tip])

    return(
        <div className={styles.container}>
            <label className={styles.title}>
                Tip
            </label>
            <fieldset className={styles.tip}>
                <label className={styles.tipLabel} htmlFor='tip'>
                    Enter Tip
                </label>
                <input 
                    value={tip}
                    onChange={handleTip}
                    name='tip'
                    id='tip'
                    className={styles.tipInput}
                    placeholder='5.00'
                    />
            </fieldset>        
        </div>

    )
}

export default Tip;