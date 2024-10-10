import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MainTag = styled.main`
    padding:0 1.25rem;
    min-height:100vh;
`;

const Main = () => {
    return (
        <MainTag className='main-wrapper'>
            <Outlet />
        </MainTag>
    );
};

export default Main;