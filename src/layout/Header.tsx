import styled from 'styled-components';
import tw from 'twin.macro';
import { ReactComponent as Back } from '../assets/header/Back.svg';
import { useNavigate } from 'react-router-dom';

const HeaderTag = styled.header`
    ${tw`w-screen fixed top-0 left-0 bg-white flex px-4 py-5 `}
    
    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width:430px;
    }
`;

const Header = () => {
    const navigate = useNavigate();

    return (
        <HeaderTag>
            <button onClick={() => { navigate(-1) }}>
                <Back />
            </button>
        </HeaderTag>
    );
};

export default Header;