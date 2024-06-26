import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.module.css';

function DeliveryOption() {
    const [option, setOption] = useState('standard');
    const [schedule, setSchedule] = useState('');
    const [open, setOpen] = useState(false);
    const options = useRef([]);
    const dispatch = useDispatch();

    const handleOption = (e) => {
        setOption(e.target.value);
    }

    const handleCancel = () => {
        setOpen(false);
        setOption('standard')
    }

    const handleSelect = () => {
        setOpen(false);
        dispatch({type: 'UPDATE_SCHEDULE', schedule});
    }

    const handleSchedule = (e) => {
        const schedule = e.target.value;
        setSchedule(schedule);
    }

    useEffect(() => {
        if(option === 'schedule')
            setOpen(true)
        else 
            dispatch({type: 'UPDATE_SCHEDULE', schedule: ''});

        dispatch({type: 'UPDATE_DELIVERY_OPTION', option})
    }, [option])

    useEffect(() => {
        const currentTime = new Date();
        const times = [];
        for(let i = 1; i <= 5; i++){
            let tempOne = new Date(currentTime.getTime() + (30 * i) * 60000);
            let tempTwo = new Date(currentTime.getTime() + (30 * (i + 1)) * 60000);
            times.push(`${tempOne}?${tempTwo}`);            
        }
        
        for(let i = 0; i < 5; i++){
            let dateOne = times[i].slice(0, times[i].indexOf('?'));
            let dateTwo = times[i].slice(times[i].indexOf('?') + 1, times[i].length);
            const futureDateOne = new Date(dateOne);
            const futureDateTwo = new Date(dateTwo);
            let tempOne = futureDateOne.getHours();
            let tempTwo = futureDateTwo.getHours();
            let futureHoursOne = (tempOne + 24) % 12 || 12;
            let futureHoursTwo = (tempTwo + 24) % 12 || 12;
            let AmPmOne = tempOne > 12 ? 'pm' : 'am';
            let AmPmTwo = tempTwo > 12 ? 'pm' : 'am';              
            let futureMinutesOne = futureDateOne.getMinutes();
            let futureMinutesTwo = futureDateTwo.getMinutes();
            times[i] = `${futureHoursOne}:${futureMinutesOne < 10 ? '0' + futureMinutesOne : futureMinutesOne}${AmPmOne} - ${futureHoursTwo}:${futureMinutesTwo < 10 ? '0' + futureMinutesTwo : futureMinutesTwo}${AmPmTwo}`;
        }
       times.forEach((time) => {
            options.current.push(time);
       });
    }, [])

    useEffect(() => {
        console.log(schedule);
    }, [schedule])


    return(
        <>
            <fieldset className={styles.radioButtons}>
                <label className={styles.title}>
                    Select Delivery Option
                </label>
                <input 
                    type='radio' 
                    name='deliveryOption' 
                    id='standard' 
                    value='standard' 
                    checked={option === 'standard'}
                    onChange={handleOption}
                    />
                <label htmlFor='standard'>
                    Standard
                </label>
                <input 
                    type='radio'
                    name='deliveryOption' 
                    id='express' 
                    value='express' 
                    checked={option === 'express'}
                    onChange={handleOption}
                    />
                <label htmlFor='express'>
                    Express + $5
                </label>
                <input 
                    type='radio' 
                    name='deliveryOption' 
                    id='schedule' 
                    value='schedule' 
                    checked={option === 'schedule'}
                    onChange={handleOption}
                    />
                <label htmlFor='schedule'>
                    Schedule
                </label>
            </fieldset>  
            <input type='hidden' value={schedule} name='scheduleForLater'/>
            <div className={styles.overlay} style={open ? {display: 'block'} : {display: 'none'}}>
                <dialog open={open} className={styles.dialog}>
                    <h1>
                        Schedule Order
                    </h1>
                    <select value={schedule} onChange={handleSchedule}>
                        {options.current.length !== 0 && 
                            options.current.map((option) => {
                                return (
                                    <option value={option} key={option}>
                                        {option}
                                    </option>
                                )
                            })}
                    </select>
                    <div className={styles.buttonContainer}>
                        <button type='button' onClick={handleSelect}>
                            Select
                        </button>  
                        <button type='button' onClick={handleCancel}>
                            Cancel
                        </button>                           
                    </div>
                </dialog>       
            </div>
        </>
    )
}

export default DeliveryOption;