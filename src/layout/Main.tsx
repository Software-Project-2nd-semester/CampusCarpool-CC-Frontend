import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MainTag = styled.main`
    padding:0 1.25rem;
    margin: 68px 0 96px 0;
`;

const Main = () => {
    return (
        <MainTag className='main-wrapper'>
            <Outlet />
        </MainTag>
    );
};

export default Main;