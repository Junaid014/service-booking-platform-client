import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Root = () => {
       return (
              <div className='max-w-[1360px] lg:px-0 md:px-3 px-3  lg:mx-auto flex flex-col min-h-screen'>
              <div className="mb-3">
                        <Navbar/>
              </div>
                 
              <main className="flex-grow pt-10">
                <Outlet/>
            </main>
            <Footer/>
              </div>
       );
};

export default Root;