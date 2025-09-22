import React from 'react';
import Review from '../../components/Review/Review';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import AllServices from '../../components/Services/AllServices ';
import CategoryServices from '../../components/Categories/Categories';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import ServiceStats from '../../components/ServiceStats/ServiceStats';
import TrendingServices from '../../components/Services/TrendingServices';

const Home = () => {
       return (
              <div>
                     <Banner/>
                     <TrendingServices/>
                     <CategoryServices/>
                     <AllServices/>
                     <WhyChooseUs/>
                     <ServiceStats/>
                     <Review/>
                     
                     
              </div>
       );
};

export default Home;