import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from '@react-google-maps/api';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles.module.css';

function Map() {
    const {user, restaurant} = useSelector(state => state.location);
    const [directions, setDirections] = useState('');
    const [map, setMap] = useState(/** @type google.maps.Map */(null));   
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    });
    const dispatch = useDispatch();

    const onLoad = (map) => {
        setMap(map);
        getDirections();
    }

    async function getDirections() {
        const directionService = new google.maps.DirectionsService();      
            
        let results = await directionService.route({                       
            origin: user,                                
            destination: restaurant,                      
            travelMode: google.maps.TravelMode.DRIVING                      
        })
        setDirections(results); 
        const travelTime = results.routes[0].legs[0].duration.text;  
        dispatch({type: 'UPDATE_DELIVERY_TIME', deliveryTime: Number(travelTime.split(' ')[0]) + 20});        
    }


    return isLoaded && (
        <GoogleMap 
            mapContainerClassName={styles.map}            //you can pass a class name from a css file that will define the way the map will render
            center={user}               
            zoom={13}                                   //zoom is the initial zoom when the map is loaded onto the DOM
            onLoad={onLoad}               //when the google map loads, it will initialize the map state
            options={{                                  //these properties are used to remove the default options that control the map
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: false,
                styles: '',                      
            }}>      
                {directions && <DirectionsRenderer directions={directions}/> } 
        </GoogleMap> 
    )
}

export default Map;