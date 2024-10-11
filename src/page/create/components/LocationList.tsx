import styled from "styled-components";
import tw from "twin.macro";
import { Button, StyledH3, Footer } from '../../../scss/styled/Common';
import KakaoMap from "../../../components/KakaoMap";

interface OwnProps {
    type: string
    setOpenLocationList: React.Dispatch<React.SetStateAction<{ isOpen: boolean, type: string }>>;
}

const LocationListModal = styled.div`
    ${tw`absolute bg-white`}
    width: calc(100% - 2.5rem);
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;

const LocationList = ({ type, setOpenLocationList }: OwnProps) => {
    return (
        <LocationListModal>
            <StyledH3>{type === 'origin' ? '출발지가 어디신가요?' : '목적지가 어디신가요?'}</StyledH3>
            <KakaoMap type={type} />
            <Footer>
                <SubmitButton onClick={() => { setOpenLocationList({ isOpen: false, type: '' }); }}>확인</SubmitButton>
            </Footer>
        </LocationListModal>
    );
};

export default LocationList;