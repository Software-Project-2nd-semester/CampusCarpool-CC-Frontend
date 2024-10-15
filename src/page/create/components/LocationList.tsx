import styled from "styled-components";
import tw from "twin.macro";
import { Button, StyledH3, Footer, Header } from '../../../scss/styled/Common';
import KakaoMap from "../../../components/KakaoMap";
import { ReactComponent as Cancel } from '../../../assets/layout/header/Cancel.svg'

interface OwnProps {
    type: string
    setOpenLocationList: React.Dispatch<React.SetStateAction<{ isOpen: boolean, type: string }>>;
}

const LocationListModal = styled.div`
    ${tw`fixed bg-white w-screen h-screen left-0 top-0 py-20 px-5 z-20`}
    
    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width:430px;
    }
`;

const ModalFooter = styled(Footer)`
    ${tw`z-20`}
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;

const LocationList = ({ type, setOpenLocationList }: OwnProps) => {
    return (
        <LocationListModal>
            <Header>
                <button onClick={() => { setOpenLocationList({ isOpen: false, type: '' }); }} className='my-auto'>
                    <Cancel />
                </button>
            </Header>
            <StyledH3>{type === 'origin' ? '출발지가 어디신가요?' : '목적지가 어디신가요?'}</StyledH3>
            <KakaoMap type={type} />
            <ModalFooter>
                <SubmitButton onClick={() => { setOpenLocationList({ isOpen: false, type: '' }); }}>확인</SubmitButton>
            </ModalFooter>
        </LocationListModal>
    );
};

export default LocationList;