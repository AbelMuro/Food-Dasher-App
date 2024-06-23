import React, {useEffect, useState} from 'react';
import { CircularProgress } from '@mui/material';
import EmailInput from './EmailInput';
import PhoneInput from './PhoneInput';
import ZipInput from './ZipInput'
import styles from './styles.module.css';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import {doc, setDoc, getDoc} from 'firebase/firestore'
import {auth, db} from '~/firebase'
import {useNavigate} from 'react-router-dom';

function Form() {
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.elements.email.value;
        const phoneNumber = e.target.elements.phoneNumber.value;
        const countryCode = e.target.elements.countryCode.value;
        const zip = e.target.elements.zip.value;

        try{
            const docRef = doc(db, `${countryCode + phoneNumber}/userInfo`);
            const userDoc = await getDoc(docRef);

            if(userDoc.exists()){
                alert('Phone number is already being used');
                return;
            }

            await setDoc(docRef, {
                email,
                image: '',
                phone: countryCode + phoneNumber,
                zip
            }) 

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
        setError(false);
        setCode(e.target.value);
    }

    const submitCode = async() => {
        setLoading(true);
        try{
            await confirm.confirm(code);    
            navigate('/AccountOrLogin');
               
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
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response);
            }
        });
    }, [])


    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            {confirm ? 
                <fieldset className={styles.container}>
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
                        {loading ? <CircularProgress sx={{color: 'green'}} size='1.5rem'/> : 'Submit Code'}
                    </button>
                </fieldset> : 
                <>
                    <h1 className={styles.title}>
                        Become a food dasher today!
                    </h1>
                    <EmailInput />
                    <PhoneInput/>
                    <ZipInput/>
                    <button className={styles.submit} id='sign-in-button'>
                        {loading ? <CircularProgress sx={{color: 'green'}} size='1.5rem'/> : 'Register'}
                    </button>            
                </>
            }
        </form>
    )
}

export default Form;