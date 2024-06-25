import React from 'react';
import styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function Item({restaurantName, data, usersLocation, restaurantLocation}) {
    const navigate = useNavigate();

    const handleItem = () => {
        const itemTitle = data.name;
        navigate("/MenuItem", {state: {restaurantName: restaurantName, itemTitle: itemTitle, usersLocation, restaurantLocation}})
    }

    return(
        <div className={styles.itemContainer}>
            <img className={styles.itemImage} src={data.image} />    
            <div className={styles.itemTitle}>{data.name}</div>
            {data.ingredients && <div className={styles.itemIngredients}>{data.ingredients.join(', ')}</div>}
            {data.sauce && <div className={styles.itemSauces}>{data.sauce.join(', ')}</div>}
            <div className={styles.itemPrice}>${data.price.toFixed(2)}</div>
            <button className={styles.chooseItem} onClick={handleItem}>Select Item</button>
        </div>  
    )
}

export default Item;