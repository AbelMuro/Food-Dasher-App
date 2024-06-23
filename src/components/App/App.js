import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationBar from './NavigationBar'
import HomePage from './HomePage';
import Map from './Map'
import DisplayRestaurantInfo from './DisplayRestaurantInfo'
import DisplayItem from './DisplayItem'
import Checkout from './Checkout';
import Register from './Register';
import AccountOrLogin from './AccountOrLogin';
import DisplayAllOrders from './DisplayAllOrders';
import PickUpOrder from './PickUpOrder';

function App() {

    return(
            <BrowserRouter> 
                <NavigationBar />
                <Routes>
                    <Route index element={<HomePage/>} /> 
                    <Route path="/GoogleMap" element={<Map />}/>
                    <Route path="/Menu" element={<DisplayRestaurantInfo />}/>
                    <Route path="/MenuItem" element={<DisplayItem />}/>
                    <Route path="/Checkout" element={<Checkout/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/AccountOrLogin" element={<AccountOrLogin/>}/>
                    <Route path="/DisplayAllOrders" element={<DisplayAllOrders/>}/>
                    <Route path="/PickUpOrder" element={<PickUpOrder/>}/>
                    <Route path='*' element={<div>404 page not found</div>}/>
                </Routes>            
            </BrowserRouter>
    )
}

export default App;