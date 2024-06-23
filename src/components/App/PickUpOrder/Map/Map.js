import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, DirectionsRenderer} from '@react-google-maps/api';
import styles from './styles.module.css';

function Map({customerLocation, restaurantLocation}) {
    const [map, setMap] = useState(); 
    const [directions, setDirections] = useState(null);                     //state object that will contain the directions between two locations
    const [libraries] = useState([])                               
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
        libraries
    });

    async function calculateRoute() {
        const directionService = new google.maps.DirectionsService();       
            
        let results = await directionService.route({                        
                origin: customerLocation,                                
                destination: restaurantLocation,                      
                travelMode: google.maps.TravelMode.DRIVING                      
        })
        setDirections(results);                                                                                              
    }

    const onLoad = (map) => {
        setMap(map);
        calculateRoute();
    }
        

    return isLoaded && (
        <GoogleMap
            onLoad={onLoad}
            mapContainerClassName={styles.map}
            zoom={10}
            center={customerLocation}
            >
                {directions && 
                    <DirectionsRenderer directions={directions}/> }
        </GoogleMap>
    )
}

export default Map;