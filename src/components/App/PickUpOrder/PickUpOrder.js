import React, {useState, useEffect} from 'react';
import Map from './Map';
import {useLocation} from 'react-router-dom';
import styles from './styles.module.css';
import {formatDeliveryTime} from '~/Common/functions';


//work on the responsiveness of this component
function PickUpOrder() {
    const {state} = useLocation();
    const [address, setAddress] = useState('')

    const customerLocation = state.customerLocation;
    const restaurantLocation = state.restaurantLocation;
    const restaurantName = state.restaurantName;
    const schedule = state.schedule;
    const time = state.deliveryTime;
    const deliveryTime = schedule ? schedule : `${formatDeliveryTime(time)}-${formatDeliveryTime(Number(time) + 30)}`
    const items = state.cart;

    const reverseGeocode = async () => {
        try{
            let response = await fetch(`https://geocode.maps.co/reverse?lat=${customerLocation.lat}&lon=${customerLocation.lng}&api_key=${process.env.geocode}`);
            let results = await response.json();
            setAddress(results.display_name)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        reverseGeocode();
    }, [])



    return(
        <>
            <Map customerLocation={customerLocation} restaurantLocation={restaurantLocation}/>
            <section className={styles.container}>
                <div className={styles.order}>
                    <p className={styles.order_detail}>
                        <span>
                            Pick up from: 
                        </span> &nbsp;
                        {restaurantName}
                    </p>
                    <p className={styles.order_detail}>
                        <span>
                            Deliver To: 
                        </span> &nbsp;
                        {address}
                    </p>
                    <p className={styles.order_detail}>
                        <span>
                            Pick up by: 
                        </span> &nbsp;
                        {deliveryTime}
                    </p>
                    <p className={styles.order_detail}>
                        <span>
                            Pick up these items: 
                        </span>
                    </p>
                    <div className={styles.items}>
                        {
                            items.map((item) => {
                                const image = item.image;
                                const id = item.id;
                                const quantity = item.quantity; 
                                const name = item.name;

                                return(
                                    <div className={styles.item} key={id}>
                                        <img className={styles.item_image} src={image}/>
                                        <p className={styles.item_name}>
                                            {name}
                                        </p>
                                        <p className={styles.item_quantity}>
                                            x{quantity}
                                        </p>
                                    </div>
                                )
                            })
                        }                        
                    </div>
                </div>

            </section>
        </>
    )
}

export default PickUpOrder;