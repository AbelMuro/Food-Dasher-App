import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationBar from './NavigationBar'
import HomePage from './HomePage';
import Map from './Map'
import DisplayRestaurantInfo from './DisplayRestaurantInfo'
import DisplayItem from './DisplayItem'

function App() {
    return(
            <BrowserRouter> 
                <NavigationBar />
                <Routes>
                    <Route index element={<HomePage/>} /> 
                    <Route path="/GoogleMap" element={<Map />}/>
                    <Route path="/GoogleMap/:choosenRestaurant" element={<DisplayRestaurantInfo />}/>
                    <Route path="/GoogleMap/:choosenRestaurant/:choosenItem" element={<DisplayItem />}/>
                </Routes>            
            </BrowserRouter>
    )
}

export default App;