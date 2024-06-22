import React from 'react';
import Form from './Form';
import styles from './styles.module.css';

function Register() {
    return(
        <div className={styles.container}>
            <section className={styles.register}>
                <Form/>
            </section>
        </div>

    )
}

export default Register;