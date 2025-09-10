import React from 'react';
import Review from '../../components/Review/Review';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import AllServices from '../../components/Services/AllServices ';

const Home = () => {
       return (
              <div>
                     <AllServices/>
                     <WhyChooseUs/>
                     <Review/>
                     
              </div>
       );
};

export default Home;