import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import McDonalds from './McDonalds';
import JackInTheBox from './JackInTheBox';
import './styles.css';


function DisplayRestaurantInfo() {
    const {choosenRestaurant} = useParams();
    const navigate = useNavigate();

    function handleChooseButton(item) {
        //storing the item Data as a string into the local Storage 
        const itemTitle = item.querySelector(".itemTitle").innerHTML;
        localStorage.setItem(itemTitle, item.outerHTML);

        //navigating to a different router
        navigate("/GoogleMap/" + choosenRestaurant + "/" + itemTitle)
    }

    return (
        <>
            {choosenRestaurant == "McDonalds" && <McDonalds onclick={handleChooseButton}/> } 
            {choosenRestaurant == "Jack in the Box" && <JackInTheBox onclick={handleChooseButton}/>}
        </>
    )
}

export default DisplayRestaurantInfo;