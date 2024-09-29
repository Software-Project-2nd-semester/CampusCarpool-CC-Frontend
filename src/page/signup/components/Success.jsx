import React from 'react';
import Img2 from '../../../assets/signup/img2.svg'
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate('/home')
  }

  return (
    <div className='success-wrapper'>
      <div  className='content1'>
        <div>파마산치즈 님</div>
        <div>만나서 반가워요!</div>
      </div>
      <div className='content2'>
        <div>여정을 떠날 준비 되셨나요?</div>
      </div>
      <div className='content3'>
        <img  style={{width:250,height:208}} src={Img2}></img>
      </div>
      <div className='content4'>
        <div>새로운 경험이 기다리고 있어요</div>
        <div>지금 시작해볼까요?</div>
      </div>
      <div className='content5'>
        <button onClick={handleClick}>시작하기</button>
      </div>
    </div>
  );
};

export default Success;