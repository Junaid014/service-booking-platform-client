import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const AuthLayout = () => {
       return (
              <div className=' flex flex-col min-h-screen'>
              <div className="mb-3">
                        <Navbar/>
              </div>
                 
              <main className="flex-grow pt-30">
                <Outlet/>
            </main>
            <Footer/>
              </div>
       );
};

export default AuthLayout;