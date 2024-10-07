import tw from "twin.macro";
import styled from 'styled-components';

const Button = styled.button`
    ${tw`rounded-lg flex p-3 w-full justify-center gap-x-7 text-lg font-bold items-center`}
    background-color:#4C3EED;
    color:white;
`;

const StyledH3 = styled.h3`
    ${tw`font-bold text-lg mt-8`}
`;

export { Button, StyledH3 };