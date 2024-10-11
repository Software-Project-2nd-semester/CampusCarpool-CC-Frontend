import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MainTag = styled.main`
    padding:80px 1.25rem;
`;

const Main = () => {
    return (
        <MainTag className='main-wrapper'>
            <Outlet />
        </MainTag>
    );
};

export default Main;