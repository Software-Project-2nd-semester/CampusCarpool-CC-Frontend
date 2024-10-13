import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../assets/layout/footer/home.svg';
import Car from '../assets/layout/footer/car.svg';
import Map from '../assets/layout/footer/map.svg';
import Chat from '../assets/layout/footer/chat.svg';
import My from '../assets/layout/footer/my.svg';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='footer-wrapper' style={{backgroundColor:'white'}}>
      <div className='con1' onClick={() => navigate('/home')}>
        <img style={{ width: 34, height: 34 }} src={Home}></img>
        <div className='text'>홈</div>
      </div>
      <div className='con2' onClick={() => navigate('/create')}>
        <img style={{ width: 38, height: 38 }} src={Car}></img>
        <div className='text'>카풀 생성</div>
      </div>
      <div className='con3' onClick={() => navigate('/map')}>
        <img style={{ width: 28, height: 28 }} src={Map}></img>
        <div className='text'>근처 카풀</div>
      </div>
      <div className='con4' onClick={() => { navigate('/chat') }}>
        <img style={{ width: 32, height: 32 }} src={Chat}></img>
        <div className='text'>채팅</div>
      </div>
      <div className='con5' onClick={() => { navigate('./user') }}>
        <img style={{ width: 32, height: 32 }} src={My}></img>
        <div className='text'>MY</div>
      </div>


    </div>
  );
};

export default Footer;