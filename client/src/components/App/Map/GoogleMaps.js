import React, {useCallback, useState, useRef} from 'react';
import {GoogleMap, useLoadScript, Autocomplete, Marker, DirectionsRenderer} from '@react-google-maps/api';
import {useNavigate} from 'react-router-dom';
import './styles.css';
import customStyles from './GoogleMapsStyles';

const options = {
    styles: customStyles
}

function Map() {
    const [libraries] = useState(["places"]);                       
    const {isLoaded} = useLoadScript({  
        googleMapsApiKey: "AIzaSyDKBV38tvGIVBnogf0gP9YWwe-PHQXwh7w",
        libraries 
    });
    const [map, setMap] = useState();
    const [directions, setDirections] = useState(null);
    const [duration, setDuration] = useState("");
    const selectedRestaurant = useRef();
    const usersLocationAddress = useRef();                        //usersLocationAddress will contain the users human readable address
    const usersLocationLatLng = useRef(null);
    const usersLocationMarker = useRef(null)
    const destinationRef = useRef();                              //destinationRef will contain the location of the marker that the user has clicked on
    const markers = useRef([]);                                   //an array to contain all the markers on the map
    const navigate = useNavigate(); 

    function handleClick(choosenRestaurant) {
        let restaurantName = choosenRestaurant.replace("'", "");
        navigate("/GoogleMap/" + restaurantName);
    }


    async function geocoding(address){
        let geocoder = new google.maps.Geocoder();
        let results = await new Promise((resolve)=>{
            geocoder.geocode({address: address}, (results, status) => {
                console.log()
                if(status != "OK") {
                    alert("Please enter a valid address");
                    return;  
                }
                resolve({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                })
     
            })
        });
        return results;
    }
    async function reverseGeocoding(lat_lng) {
        let geocoder = new google.maps.Geocoder();
        let results = await new Promise((resolve) => {
            geocoder.geocode({location: lat_lng}, 
            (results, status) => {        
                if(status != "OK") 
                    return;
                resolve(results[0].formatted_address)
            })
        }) 
        return results;
    }


    //the three functions below will be called in succession (bottom to top)
    async function calculateRoute(usersLocation) {
        let results;  
        try {       
            let directionService = new google.maps.DirectionsService(map);
            results = await directionService.route({                
                origin: usersLocation,                                                      
                destination: destinationRef.current,  
                travelMode: google.maps.TravelMode.DRIVING                
            });  
        }
        catch(error) {
            alert("Invalid Directions")
            return;
        } 
        setDirections(results);        
        setDuration(results.routes[0].legs[0].duration.text)  
    }    
    async function getLocationDetails(place, position, placesService) {
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
                        destinationRef.current = position;                  //we make the current marker the destination   
                        resolve(markerData);
                    }
                )
            }
        )
            return results;
    }    
    function searchNearbyRestaurants(usersLocation) {
        //just in case the user doesnt select one of the restaurants provided
        let choosenRestaurant = selectedRestaurant.current.value;
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
            if(status != "OK") {
                console.log(status);
                alert("Address is invalid");
                return;
            }
            //we remove all previously added markers from the map
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
                    //getting details of a location that is marked by a marker
                    let promise = getLocationDetails(place, position, placesService); 
                    promise.then((results)=> {
                        //we calculate the route between the users location and this marker
                        calculateRoute(usersLocation);                                   
                        //.selectedMarker will contain an img tag and another child element that has all marker data
                        let selectedMarker = document.querySelector(".selectedMarker");                       
                        //we delete any previous nested nodes within .selectedMarker
                        if(selectedMarker.hasChildNodes()) {                            
                            while(selectedMarker.lastChild){
                                selectedMarker.removeChild(selectedMarker.lastChild);   
                            }
                        } 
                        //we make the node visible to the document
                        selectedMarker.style.display = "block"; 
                        //creating a child container that will have all the marker data
                        let markerData = document.createElement("div");
                        markerData.setAttribute("class", "markerData");
                        selectedMarker.appendChild(markerData);
                        //storing all the details in dynamically created elements and appending them onto .selectedMarker
                        for(let key in results){
                            if(key == "markerImage") {
                                let image = document.createElement("img");
                                image.setAttribute("src", results[key]);
                                image.setAttribute("class", key)
                                selectedMarker.prepend(image)
                            }
                            else{
                               let currentElement = document.createElement("div");
                               currentElement.setAttribute("class", key);
                               currentElement.innerHTML = results[key]; 
                               selectedMarker.querySelector(".markerData").appendChild(currentElement);     //storing the marker data onto a child element of .selectedMarker
                            }
                        } 
                        //also creating a button to let user choose the restaurant marked by this marker
                        let button = document.createElement("button");
                        button.setAttribute("type", "button");
                        button.setAttribute("class","chooseRestaurant");
                        button.addEventListener("click", () =>{handleClick(results.markerName)})
                        button.innerHTML = "Choose Restaurant";
                        selectedMarker.querySelector(".markerData").appendChild(button);                   
                    })
                }) 
                //we keep track of the new markers by adding them onto an constant array
                markers.current.push(marker);                                   
            })        
        });         
    }
    function CreateHomeMarkerAndSearch(){
        //this function will first geocode the users address into lat and long
        //then it will create a home marker and position it based on the lat and long
        //then it will call searchNearbyRestaurants for places that are near the users' location
        let result = geocoding(usersLocationAddress.current.value);
            result.then((inputedAddress) => {
                if(inputedAddress == "")
                    return;  
                usersLocationLatLng.current = inputedAddress;
                let marker = new google.maps.Marker({
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
    function getUsersLocation(map) {
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
                let address = reverseGeocoding(currentPosition);                                      
                    address.then((formatted_address)=>{
                        usersLocationAddress.current.value = formatted_address;   //storing the address of the users location
                    })
                map.setCenter(currentPosition);
                var marker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    icon: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png"
                })
                usersLocationMarker.current = marker;                             //storing the marker used to mark the users location                             
                map.setZoom(15);},  
                () => {
                console.log("unable to retrieve your location")
                return;
            })
        }
    }
    const onLoad = useCallback((map)=>{
        getUsersLocation(map);
        setMap(map);
    }, []);


    function clearRoute() {
        setDirections(null);
        setDuration("");
        let selectedMarker = document.querySelector(".selectedMarker");
        selectedMarker.style.display = "none";
        if(selectedMarker.hasChildNodes()){
            while(selectedMarker.lastChild){
                selectedMarker.removeChild(selectedMarker.lastChild)
            }
        }
    }

    return isLoaded ? (
        <section className="container">
            <div className="instructionsContainer">
               <p className="instructionsTitle">                       
                    INSTRUCTIONS:
                </p><br/>
                <p className="instructions">                
                    1: Enter your address <br/>
                    2: Select restaurant <br/>
                    3: Click on one of the BLUE markers in the map <br/>
                    4: Click on the 'Choose Restaurant' button <br/>
                </p>
            </div>
            <GoogleMap 
             mapContainerClassName={"googleMapContainer"}       
             zoom={4}
             onLoad={onLoad}
             center= {usersLocationLatLng.current ? usersLocationLatLng.current : {lat: 39.381266, lng: -97.922211}}
             options={{
                mapTypeControl: false,
                styles: options.styles
            }}                                                                                           
             unMount={(map)=> setMap(null)}>
                <div className="inputContainer">
                    <div>
                        <img src="http://maps.gstatic.com/mapfiles/markers2/icon_green.png" className="originMarker"/>
                        <Autocomplete className="autocomplete">
                            <input className="usersAddress" type="text" ref={usersLocationAddress} />  
                        </Autocomplete>                    
                    </div>
                    <div>
                        <img src="http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png" className="destinationMarker"/>  
                        <select className="SelectRestaurant" ref={selectedRestaurant}>
                            <option value="">
                                Select restaurant..
                            </option>
                            <option value="McDonald's">
                                McDonalds
                            </option>
                            <option value="Jack In The Box">
                                Jack in the box
                            </option>
                        </select>                     
                    </div>
                    <br/>               
                    <button type="button" className="search" onClick={() => {CreateHomeMarkerAndSearch()}}>Search Restaurants</button>
                    <button type="button" className="clear" onClick={() => {clearRoute()}}> Clear Route </button>
                    {duration != "" && <div> Delivery Time: {duration}</div>}                
                </div>
                <div className="selectedMarker"> 
                </div>                  
                {directions && <DirectionsRenderer directions={directions}/> }
         
            </GoogleMap>                 
            
        </section>
    ): (<div>Loading...</div>)
}

export default Map;
