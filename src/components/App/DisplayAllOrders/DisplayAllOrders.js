import React from 'react';
import styles from './styles.module.css';
import {db} from '~/firebase';
import {collection} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';   
import { formatDeliveryTime } from '~/Common/functions';
import {useNavigate} from 'react-router-dom';

function DisplayAllOrders(){
    const collectionRef = collection(db, 'allOrders');
    const [orders, loading, error] = useCollectionData(collectionRef);
    const navigate = useNavigate();

    const handleOrder = (order) => {
        navigate('/PickUpOrder', {state: order});
    }
    
    return( 
        <div className={styles.container}>
            <section className={styles.orders}>
                <h1>
                    Pick up an order:
                </h1>
                {!loading && orders.map((order, i) => {
                    const restaurantName = order.restaurantName;
                    const dropOffOption = order.dropOffOption;
                    const deliveryOption = order.deliveryOption;
                    const schedule = order.schedule;
                    const deliveryTime = schedule ? schedule : `${formatDeliveryTime(Number(order.deliveryTime))}-${formatDeliveryTime(Number(order.deliveryTime) + 30)}`;
                    const instructions = order.dropOffInstructions;
                    const tip = order.tip;
                    const items = order.cart.reduce((acc, item) => {
                        return acc + item.quantity;
                    }, 0);

                    return(
                    <div className={styles.order} key={i}>
                            <p>
                                <span>
                                    Order from: &nbsp; 
                                </span>
                                {restaurantName}
                            </p>
                            <p>
                                <span>
                                    Pick up by: &nbsp; 
                                </span>
                                {deliveryTime}
                            </p>
                            <p>
                                <span>
                                    # of items: &nbsp; 
                                </span>
                                {items}
                            </p>
                            <p>
                                <span>
                                    Drop off option: &nbsp; 
                                </span>                         
                                {dropOffOption}
                            </p>
                            {instructions && <p>
                                <span>
                                    Instructions: &nbsp; 
                                </span>
                                {instructions}
                            </p>}
                            <p>
                                <span>
                                    Tip: &nbsp; 
                                </span>
                                ${tip}
                            </p>
                            {deliveryOption === 'Express' && 
                                <p style={{fontWeight: 700}}>
                                    Order has been placed with Express
                                </p>
                            }
                            <button onClick={() => handleOrder(order)}>
                                Pick up Order
                            </button>
                    </div> 
                    )
                })}
            </section>            
        </div>

    )
}

export default DisplayAllOrders;