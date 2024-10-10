import styled from 'styled-components';
import tw from 'twin.macro';
import { ReactComponent as Back } from '../assets/header/Back.svg';

const AnchorTag = styled.div`
    ${tw`flex px-4 py-3 invisible`}
`;

const Anchor = () => {
    return (
        <AnchorTag>
            <Back />
        </AnchorTag>
    );
};

export default Anchor;