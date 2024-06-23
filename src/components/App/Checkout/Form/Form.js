import React, {useState} from 'react';
import DeliveryOption from './DeliveryOption';
import DropOffOption from './DropOffOption';
import DropOffInstructions from './DropOffInstructions';
import PaymentInformation from './PaymentInformation';
import Tip from './Tip';
import TotalCost from './TotalCost';
import {useSelector, useDispatch} from 'react-redux';
import {db} from '~/firebase'
import {collection, addDoc} from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Form(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const items = useSelector(state => state.cart.items);
    const restaurantName = useSelector(state => state.cart.restaurant);
    const {user, restaurant} = useSelector(state => state.location);
    const deliveryTime = useSelector(state => state.checkout.deliveryOption.deliveryTime);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let deliveryOption; 
        e.target.elements.deliveryOption.forEach((option) => {
            if(option.checked)
                deliveryOption = option.value
        });
        let dropOffOption;
        e.target.elements.dropOffOption.forEach((option) => {
            if(option.checked)
                dropOffOption = option.value
        });
        const dropOffInstructions = e.target.elements.dropOffInstructions.value;
        const schedule = e.target.elements.schedule.value;
        const tip = e.target.elements.tip.value;        
        const cardNumber = e.target.elements.cardNumber.value;
        const expirationDate = e.target.elements.expirationDate.value;
        const cvc = e.target.elements.cvc.value;
        const zip = e.target.elements.zip.value;    
        
        try{
            const allOrdersRef = collection(db, 'allOrders');
            await addDoc(allOrdersRef, {
                cart: items,
                customerLocation: user,
                deliveryOption,
                deliveryTime,
                dropOffInstructions,
                dropOffOption,
                restaurantLocation: restaurant,
                restaurantName,
                schedule,
                tip,
                total: items.reduce((acc, item) => {
                    return acc + (item.price * item.quantity);
                }, 0)
            })
            dispatch({type: 'CLEAR'});
            setTimeout(() => {
                alert('Order has been placed');
            }, 1000)              
            navigate('/')
 
        }catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }


    }

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <DeliveryOption/>
            <DropOffOption/>
            <DropOffInstructions/>
            <PaymentInformation/>
            <Tip/>
            <TotalCost/>
            <button className={styles.submit}>
                {loading ? <CircularProgress /> : 'PLACE ORDER'}
            </button>
        </form>
    )
}

export default Form;