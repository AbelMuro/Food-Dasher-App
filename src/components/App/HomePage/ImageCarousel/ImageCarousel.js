import React, { useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';
import spicyburgerImage from './images/hot & spicy burgers.png';
import sodasImage from './images/buy 2 sodas, get 1 free.png';
import fooddeliveredImage from './images/food delivered with care.png';


function updateSlides(currentSlide, nextOrPrevSlide, tracker) {
    //moving the image tracker 
    const imageWidth = nextOrPrevSlide.getBoundingClientRect().width;
    const moveThisAmount = imageWidth * nextOrPrevSlide.getAttribute("data-image");
    tracker.style.transform = "translateX(-" + moveThisAmount + "px)";        
    currentSlide.classList.remove("currentSlide");
    nextOrPrevSlide.classList.add("currentSlide");
}


const RePositionTracker = () => {
    let carouselTracker = document.querySelector(".carouselTracker");
    carouselTracker.style.transform = "translateX(0px)"; 
    let currentSlide = document.querySelector(".currentSlide");
    currentSlide.classList.remove("currentSlide");
    let firstSlide = carouselTracker.firstElementChild;
    firstSlide.classList.add("currentSlide");
   
}


function ImageCarousel() {

    useEffect(() => {
        window.addEventListener("resize", RePositionTracker);

        return () => {window.removeEventListener("resize", RePositionTracker);}
    })   


    const handleClickLeft = () => {
        //getting the current slide and determining the previous slide
        const tracker = document.querySelector(".carouselTracker");
        const currentSlide = document.querySelector(".carouselImage.currentSlide");
        const prevSlide = currentSlide.previousElementSibling;
        if(prevSlide == null)
            return;
        updateSlides(currentSlide, prevSlide, tracker);
    }

    const handleClickRight = () => {
        //selecting the current slide and determining the next slide
        const tracker = document.querySelector(".carouselTracker");
        const currentSlide = document.querySelector(".carouselImage.currentSlide");
        const nextSlide = currentSlide.nextElementSibling;
        if(nextSlide == null)
            return;
        updateSlides(currentSlide, nextSlide, tracker);
    }

    return(
            <div className="carouselContainer">
                <div className="carouselWindow">
                    <div className="carouselTracker">
                        <img className="carouselImage currentSlide" data-image={0} src={spicyburgerImage} alt="pizza"/>
                        <img className="carouselImage" data-image={1} src={sodasImage} alt="burger"/>
                        <img className="carouselImage" data-image={2} src={fooddeliveredImage} alt="hot dogs"/>
                    </div>
                </div>
                <button className="leftButton" onClick={handleClickLeft}>
                    <span> <FontAwesomeIcon icon={faArrowLeft} /> </span> 
                </button>  
                <button className="rightButton" onClick={handleClickRight}>
                    <span> <FontAwesomeIcon icon={faArrowRight} /> </span> 
                </button>
            </div>
    )









}

export default ImageCarousel;