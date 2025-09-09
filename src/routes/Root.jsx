import React from 'react';
import { Outlet } from 'react-router';

const Root = () => {
       return (
              <div className='max-w-[1460px]  mx-auto'>
              <main>
                   
                <Outlet/>
            </main>
              </div>
       );
};

export default Root;