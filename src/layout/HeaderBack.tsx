import {useNavigate} from 'react-router-dom';
import {ReactComponent as Back} from '../assets/layout/header/Back.svg';
import {Header} from '../scss/styled/Common';
import useKakaoMapStore from "../store/kakaoMapStore";

const HeaderDefault = () => {
    const navigate = useNavigate();
    const setStartEndPoint = useKakaoMapStore((state) => state.setStartEndPoint);

    return (
        <Header>
            <button onClick={() => {
                navigate(-1)
                setStartEndPoint(null, null);
            }} className='my-auto'>
                <Back/>
            </button>
        </Header>
    );
};

export default HeaderDefault;