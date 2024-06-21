import React from 'react';
import Form from './Form';
import styles from './styles.module.css';

function Register() {
    return(
        <div className={styles.container}>
            <section className={styles.register}>
                <h1>
                    become a food dasher today!
                </h1>
                <Form/>
            </section>
        </div>

    )
}

export default Register;