import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <main className='main-wrapper p-5'>
            <Outlet />
        </main>
    );
};

export default Main;