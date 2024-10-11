import { Header } from '../scss/styled/Common';
import { ReactComponent as MyInfo } from '../assets/layout/header/MyInfo.svg';
import { ReactComponent as Notification } from '../assets/layout/header/Notification.svg';
import LogoSmall from '../assets/layout/header/LogoSmall.png';

const HeaderDefault = () => {
    return (
        <Header className='justify-between'>
            <div className='my-auto'>
                <img src={LogoSmall} alt="LogoSmall" />
            </div>
            <div className='flex gap-x-4'>
                <button className='my-auto'>
                    <MyInfo />
                </button>
                <button className='my-auto'>
                    <Notification />
                </button>
            </div>
        </Header>
    );
};

export default HeaderDefault;