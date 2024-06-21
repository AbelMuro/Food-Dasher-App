import React from 'react';
import EmailInput from './EmailInput';
import PhoneInput from './PhoneInput';
import ZipInput from './ZipInput'
import styles from './styles.module.css';


//now i will need to implement authorization with firebase
function Form() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const phoneNumber = e.target.elements.phoneNumber.value;
        const countryCode = e.target.elements.countryCode.value;
        const zip = e.target.elements.zip.value;
        console.log(email, phoneNumber, countryCode, zip);
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EmailInput />
            <PhoneInput/>
            <ZipInput/>
            <button className={styles.submit}>
                Register
            </button>
        </form>
    )
}

export default Form;