import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Root = () => {
       return (
              <div className=' flex flex-col min-h-screen'>
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