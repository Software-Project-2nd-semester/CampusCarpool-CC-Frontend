import tw from "twin.macro";
import styled from 'styled-components';

const Button = styled.button`
    ${tw`rounded-lg flex p-3 w-full justify-center gap-x-7 text-lg font-bold items-center`}
    background-color:#4C3EED;
    color:white;
`;

const StyledH3 = styled.h3`
    ${tw`font-bold text-xl mb-2`}
`;

const Header = styled.header`
    ${tw`w-screen fixed top-0 left-0 bg-white flex px-5 z-10`}
    height:80px;

    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width:430px;
    }
`;

const Footer = styled.footer`
    ${tw`px-5 w-screen fixed bottom-0 left-0 bg-white flex items-center z-10`}
    height:80px;
    
    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width:430px;
    }
`;

export { Button, StyledH3, Footer, Header };