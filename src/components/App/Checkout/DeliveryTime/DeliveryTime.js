import React, {useMemo} from 'react';
import { formatDeliveryTime } from '~/Common/functions';
import {useSelector} from 'react-redux';
import styles from './styles.module.css'

function DeliveryTime(){
    const deliveryTime = useSelector(state => state.checkout.deliveryOption.deliveryTime);
    const schedule = useSelector(state => state.checkout.deliveryOption.schedule);

    const delivery = useMemo(() => {
        if(schedule)
            return schedule;
        else
            return `${formatDeliveryTime(deliveryTime)}-${formatDeliveryTime(Number(deliveryTime) + 30)} `
    }, [schedule, deliveryTime])

    return(
        <h1 className={styles.deliveryTime}>
            DELIVERY TIME: {delivery}
        </h1>
    )
}

export default DeliveryTime;