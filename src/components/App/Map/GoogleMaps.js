import React, { useState, useRef} from 'react';
import {GoogleMap, useLoadScript, Autocomplete, DirectionsRenderer} from '@react-google-maps/api';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import customStyles from './GoogleMapsStyles';
import {useDispatch, useSelector} from 'react-redux';

const options = {
    styles: customStyles
}

function Map() {
    const dispatch = useDispatch();
    const prevRestaurant = useSelector(state => state.cart.restaurant);
    const [libraries] = useState(["places"]);                       
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY,          
        libraries 
    });
    const [map, setMap] = useState();
    const [directions, setDirections] = useState(null);
    const [duration, setDuration] = useState("");
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const restaurantInput = useRef();
    const addressInput = useRef();                       
    const usersLocationLatLng = useRef(null);
    const usersLocationMarker = useRef(null)    
    const selectedRestaurant = useRef(null);                        
    const markers = useRef([]);                                
    const navigate = useNavigate(); 

    function updateRestaurant(restaurantName) {
        navigate("/Menu", {state: {restaurantName, usersLocation: usersLocationLatLng.current, restaurantLocation: selectedRestaurant.current}});    
    }


    function handleClick() {
        let restaurantName = restaurantInput.current.value;

        if(prevRestaurant && prevRestaurant !== restaurantName){
            const confirmed = confirm(`You already have a cart with items from ${prevRestaurant}, would you like to clear the cart and order from ${restaurantName}?`);
            if(confirmed){
                dispatch({type: 'CLEAR'})
                updateRestaurant(restaurantName);
            }
            else
                setRestaurantInfo(null)
        }
        else
            updateRestaurant(restaurantName);
    }


    async function geocoding(address){
        let geocoder = new google.maps.Geocoder();
        let latLng = {}
        await geocoder.geocode({address: address}, (results, status) => {
            if(status !== "OK") {
                alert('Please enter a valid address');
                return;  
            }
            latLng = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            }
        });    
        return latLng;        
    }
    async function reverseGeocoding(lat_lng) {
        let geocoder = new google.maps.Geocoder();
        let result;
        await geocoder.geocode({location: lat_lng}, (results, status) => {        
                if(status != "OK") 
                    return;
                result = results[0].formatted_address
            })
        
        return result;
    }


    //the three functions below will be called in succession (bottom to top)
    async function calculateRoute(usersLocation, destination) {
 
        try {     
            let results;               
            let directionService = new google.maps.DirectionsService(map);
            results = await directionService.route({                
                origin: usersLocation,                                                      
                destination: destination,  
                travelMode: google.maps.TravelMode.DRIVING                
            });  
            setDirections(results);        
            setDuration(results.routes[0].legs[0].duration.text)              
        }
        catch(error) {
            alert("Invalid Directions")
            return;
        } 
    }    
    async function getLocationDetails(place, placesService) {
        let results = await new Promise ((resolve) => {
                placesService.getDetails({                                   //getting the details of the location marked by the marker
                    placeId: place.place_id,
                    fields: ["opening_hours", "utc_offset_minutes" ,"photos", "name", "rating", "vicinity"] },   
                    (place, status)=>{
                        if(status != "OK") return;                           //something went wrong
                        let markerData = {                                   //storing the data of the location into an object
                            markerImage: place.photos[0].getUrl(),
                            markerName: place.name,  
                            markerAddress: place.vicinity,
                            markerRating: "Rating: " + place.rating + "/5",
                            markerIsOpen: place.opening_hours.isOpen() ? "Restaurant is OPEN" : "Restaurant is CLOSED",
                        }
                        resolve(markerData);
                    }
                )
            }
        )
            return results;
    }    
    function searchNearbyRestaurants(usersLocation) {
        //just in case the user doesnt select one of the restaurants provided
        let choosenRestaurant = restaurantInput.current.value;
        if(choosenRestaurant == ""){
            alert("Please select one of the restaurants")
            return; 
        }
        //creating a request for the nearbySearch() function
        let request = {
            location: usersLocation,                 
            radius: 5000,
            keyword: choosenRestaurant
        };
        //searching for nearby restaurants based on users location or location they inputed
        let placesService = new google.maps.places.PlacesService(map);     
        placesService.nearbySearch(request, (places, status) => {
            if(status !== "OK") {
                alert("Address is invalid");
                return;
            }
            if(markers.current.length != 0){                                     
                markers.current.forEach((mark) => {
                    mark.setMap(null);
                })                    
            }
            //we iterate through all the places and create an individual marker for each place
            places.forEach((place) => {
                //creating an object with the markers position
                let position = {                                                 
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
                //creating a new marker
                var marker = new google.maps.Marker({                            
                    position: position,
                    map: map,
                    icon: "http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png",
                })
                ///creating a click event for the marker
                marker.addListener("click", () => {
                    selectedRestaurant.current = position;
                    //getting details of a location that is marked by a marker
                    let promise = getLocationDetails(place, placesService);
                    promise.then((results)=> {                   
                        //we calculate the route between the users location and this marker
                        calculateRoute(usersLocation, position);                                   
                        setRestaurantInfo(results);               
                    })
                }) 
                //we keep track of the new markers by adding them onto an constant array
                markers.current.push(marker)                            
            })    
        });         
    }
    function CreateHomeMarkerAndSearch(){
        //this function will first geocode the users address into lat and long
        //then it will create a home marker and position it based on the lat and long
        //then it will call searchNearbyRestaurants for places that are near the users' location
        geocoding(addressInput.current.value)
            .then((inputedAddress) => {
                if(inputedAddress === "")
                    return;  
                usersLocationLatLng.current = inputedAddress;
                let marker = new google.maps.Marker({                                   //this marker will automatically appear on the map
                    position: inputedAddress,
                    map: map,
                    icon: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png"
                })
                if(usersLocationMarker.current != null) {
                    usersLocationMarker.current.setMap(null);
                    usersLocationMarker.current = marker;
                }
                else {
                    usersLocationMarker.current = marker;
                }
                //moving the map to the users address
                map.setCenter(inputedAddress);
                map.setZoom(15);
                searchNearbyRestaurants(inputedAddress);
            })
    }

    //the three functions below will be called in succession (bottom to top)
    function geolocation(map) {
        if(!navigator.geolocation) {
            alert("geolocation is not supported by your browser");
            return; 
        }
        else{
            navigator.geolocation.getCurrentPosition((position) => {    
                let currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                usersLocationLatLng.current = currentPosition;
                reverseGeocoding(currentPosition)                                     
                    .then((formatted_address)=>{
                        addressInput.current.value = formatted_address;   //storing the address of the users location
                    })
                map.setCenter(currentPosition);
                var marker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    icon: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png"
                })
                usersLocationMarker.current = marker;                             //storing the marker used to mark the users location                             
                map.setZoom(15);
                },  
                () => {
                    console.log("unable to retrieve your location")
                    return;
            })
        }
    }
    const onLoad = (map)=>{
        geolocation(map);
        setMap(map);
    };


    function clearRoute() {
        setDirections(null);
        setDuration("");
        setRestaurantInfo(null);
    }

    return isLoaded ? (
        <section className={styles.container}>
            <div className={styles.instructionsContainer}>
               <p className={styles.instructionsTitle}>                       
                    INSTRUCTIONS:
                </p><br/>
                <p className={styles.instructions}>                
                    1: Enter your address <br/>
                    2: Select restaurant <br/>
                    3: Click on one of the BLUE markers in the map <br/>
                    4: Click on the 'Choose Restaurant' button <br/>
                </p>
            </div>
            <GoogleMap 
             mapContainerClassName={styles.googleMapContainer}       
             zoom={4}
             onLoad={onLoad}
             center= {usersLocationLatLng.current ? usersLocationLatLng.current : {lat: 39.381266, lng: -97.922211}}
             options={{
                mapTypeControl: false,
                styles: options.styles
            }}                                                                                           
             unMount={()=> setMap(null)}>
                <div className={styles.inputContainer}>
                    <div>
                        <img src="http://maps.gstatic.com/mapfiles/markers2/icon_green.png" className={styles.originMarker}/>
                        <Autocomplete className={styles.autocomplete}>
                            <input className={styles.usersAddress} type="text" ref={addressInput} />  
                        </Autocomplete>                    
                    </div>
                    <div>
                        <img src="http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png" className={styles.destinationMarker}/>  
                        <select className={styles.SelectRestaurant} ref={restaurantInput}>
                            <option value="">
                                Select restaurant..
                            </option>
                            <option value="McDonalds">
                                McDonalds
                            </option>
                            <option value="Jack in the Box">
                                Jack in the box
                            </option>
                        </select>                     
                    </div>
                    <br/>               
                    <button type="button" className={styles.search} onClick={() => {CreateHomeMarkerAndSearch()}}>Search Restaurants</button>
                    <button type="button" className={styles.clear} onClick={() => {clearRoute()}}> Clear Route </button>
                    {duration != "" && <div> Delivery Time: {duration}</div>}                
                </div>
                <div className={styles.selectedMarker}> 
                </div>                  
                {directions && <DirectionsRenderer directions={directions}/> }

                {restaurantInfo && 
                    <div className={styles.selectedMarker}>
                        <img className={styles.markerImage} src={restaurantInfo['markerImage']}/>
                        <div className={styles.markerData}>
                            <div className={styles.markerName}>
                                {restaurantInfo['markerName']}
                            </div>
                            <div className={styles.markerAddress}>
                                {restaurantInfo['markerAddress']}
                            </div>
                            <div className={styles.markerRating}>
                                {restaurantInfo['markerRating']}
                            </div>
                            <div className={styles.markerIsOpen}>
                                {restaurantInfo['markerIsOpen']}
                            </div>
                            <button className={styles.chooseRestaurant} onClick={handleClick}>
                                Choose Restaurant
                            </button>
                        </div>
                    </div>
                    }
            </GoogleMap>                 
            
        </section>
    ): (<div>Loading...</div>)
}

export default Map;
