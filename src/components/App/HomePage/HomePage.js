import React from 'react';
import ImageCarousel from './ImageCarousel';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function HomePage() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/Register');
    }

        return (
        <> 
            <section className={"homeBanner"}>
                <div className={"title"}> 
                    Food Dasher! 
                </div> 
                <p className={"descriptionOne"}>
                    The fastest delivery app in your area!
                </p>
                <p className={"descriptionTwo"}>
                    <span className={"customerSatisfaction"}> 
                        #1 in Customer Satisfaction 
                    </span>
                    <span className={"alwaysOnTime"}>
                        Always on time!
                    </span>
                </p>
                <p className={"descriptionThree"}>
                    Your delicious food is stored in a safe, 
                    temperature-controlled container until delivery.
                    Food is guaranteed fresh or your money back!
                    
                </p>
                <p className={"becomeDasher"}>
                    Want to become a Food Dasher? <br/>
                    You can sign up with a click of a button!   
                </p>
                <button className={"signUpButton"} onClick={handleSignUp}> Sign Up </button>
            </section>
            <section className={"imageCarousel"}>
                <ImageCarousel />
            </section>
            <section className={"footer"}>
                <div className={"RestaurantPartners"}>
                    <p className={"footerTitle"}>
                        Our Restaurant Partners
                    </p>
                    <p className={"description"}>
                         At the moment, we have only partnered with
                         McDonalds and Jack in the Box. But we will 
                         soon find other restaurant partners.   
                    </p>
                </div>
                <div className={"contactUs"}>
                    <p className={"footerTitle"}>
                        Contant Us
                    </p>
                    <p className={"description"}>
                        Questions or concerns? you can either
                        call us at <span className={"phoneNumber"}> 123-456-7898 </span>
                        or email us <span className={"email"}> someEmail@email.com </span>
                    </p>
                </div>
                <div className={"openHours"}>
                    <p className={"footerTitle"}>
                        Open Hours
                    </p>
                    <p className={"description"}>
                        It depends on the restaurant. But all
                        of our current partners are open 24/7
                    </p>
                </div>
            </section>
            <section className={"copyrightContainer"}>
                &copy; | Food Dasher App
            </section>
        </>

        )

}

HomePage.defaultProps = {
    name: "muro"
}

export default HomePage;