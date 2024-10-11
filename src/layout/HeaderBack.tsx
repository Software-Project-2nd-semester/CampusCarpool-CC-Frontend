import { useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from '../assets/layout/header/Back.svg';
import { Header } from '../scss/styled/Common';


const HeaderDefault = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <button onClick={() => { navigate(-1) }} className='my-auto'>
                <Back />
            </button>
        </Header>
    );
};

export default HeaderDefault;