import React from 'react';
import Review from '../../components/Review/Review';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import AllServices from '../../components/Services/AllServices ';
import CategoryServices from '../../components/Categories/Categories';

const Home = () => {
       return (
              <div>
                     <CategoryServices/>
                     <AllServices/>
                     <WhyChooseUs/>
                     <Review/>
                     
              </div>
       );
};

export default Home;