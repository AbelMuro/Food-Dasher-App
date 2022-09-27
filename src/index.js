//initializing REACT.....
import React from "react";
import ReactDOM from "react-dom/client";

//initializing redux
//import {Provider} from 'react-redux';
//import store from './store';

//importing the actual app
//import App from './components/App';

import ButtonUnstyled from '@mui/base/ButtonUnstyled'; 
import BadgeUnstyled from "@mui/base/BadgeUnstyled";
import {styled} from '@mui/system';                         


const blue = {
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2"
}

const Button = styled(ButtonUnstyled)`
    color: white;
    background-color: ${blue[500]};
    border: none;
    border-radius: 20px;
    padding: 1.2rem;
    display: block;
    width: 100px;
    margin: auto;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: ${blue[600]};
    }

    &:active{                         
        background-color: ${blue[700]};
    }
`

const Badge = styled(BadgeUnstyled)`
    background-color: red;
    border-radius: 100%;
    position: absolute;
    padding: 5px 7px;
    top: -10px;
    right: 5px;
`


function MUI() {

    const handleClick = () => {
        console.log("it works");

    }

    return(
        <Button onClick={handleClick} className="whatever">
            hello world
            <Badge componentsProps={{badge: {className: 'whatever'}}} >1</Badge>       
        </Button>  

    )
 

}



//rendering the app to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
       <MUI/>
            
    </>
        //<Provider store={store}>
            //<App/>
        //</Provider> 
);
