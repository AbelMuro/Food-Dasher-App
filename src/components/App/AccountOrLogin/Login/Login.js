import React, {useState, useEffect} from 'react';
import PhoneInput from './PhoneInput';
import styles from './styles.module.css';
import {auth, db} from '~/firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import {CircularProgress} from '@mui/material'
import {doc, getDoc} from 'firebase/firestore'

function Login() {
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();        
        const phoneNumber = e.target.elements.phoneNumber.value;
        const countryCode = e.target.elements.countryCode.value;

        try{
            const docRef = doc(db, `${countryCode + phoneNumber}/userInfo`);
            const userDoc = await getDoc(docRef);

            if(!userDoc.exists()){
                alert('Phone number is not registered');
                return;
            }

            const confirmationResult = await signInWithPhoneNumber(auth, countryCode + phoneNumber, window.recaptchaVerifier);
            setConfirm(confirmationResult);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    const submitCode = async() => {
        setLoading(true);
        try{
            await confirm.confirm(code);    
            console.log('success!');     
        }
        catch(error){
            setError(true);
        }
        finally{
            setLoading(false); 
        }
    }

    useEffect(() => {
        auth.languageCode = 'it'; 
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'log-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response);
            }
        });
    }, [])


    return(
        <div className={styles.container} onSubmit={handleSubmit}>
            <form className={styles.form}>
                {
                    confirm ? 
                        <fieldset className={styles.codeContainer}>
                            <h1 className={styles.title}>
                                We sent you a code, please enter the code
                            </h1>
                            <input 
                                style={error ? {border: '2px solid red'} : {}}
                                type='text' 
                                value={code} 
                                onChange={handleCode} 
                                className={styles.labelInput}
                                />
                            {error && <div className={styles.errorMessage}>
                                    incorrect code
                                </div>}
                            <button type='button' className={styles.submit} onClick={submitCode}>
                                {loading ? <CircularProgress sx={{color: 'green'}}/> : 'Submit Code'}
                            </button>
                        </fieldset>  
                    :       
                        <>
                            <label className={styles.title}>
                                Food dasher login
                            </label>   
                            <PhoneInput/>
                            <button className={styles.submit} id='log-in-button'>
                                {loading ? <CircularProgress sx={{color: 'green'}}/> : 'Log in'}
                            </button>                    
                        </>
                }
            </form>
        </div>
    )
}

export default Login;