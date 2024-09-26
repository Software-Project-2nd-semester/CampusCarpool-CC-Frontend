import React, { useState, useEffect } from 'react';
import Logo from '../../assets/login/logo.svg';
import Kakao from '../../assets/login/kakao.svg';
import Naver from '../../assets/login/naver.svg'
import Google from '../../assets/login/google.svg'

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(false);  // 3초 뒤에 showLogin 상태를 false로 변경
    }, 2000);

    return () => clearTimeout(timer);  // 컴포넌트가 언마운트 될 때 타이머 정리
  }, []);

  return (
    <div>
      {showLogin ? (
        <div className='login-first'>
          <img className='login-first-logo' src={Logo}></img>
          <p className='login-first-text'>등하교시에는 CC!</p>
        </div>
      ) : (
        <div className='login-second'>
          <img className='login-logo' src={Logo} alt=''/>
          <p className='login-text'>CC에 오신 것을 환영합니다!</p>
          <div className='login-buttons'>
            <button className='login-btn1'>
              <img className='login-kakao'src={Kakao}/>
              카카오톡으로 시작하기</button>
            <button className='login-btn2'>
              <img className='login-naver' src={Naver}/>
              네이버로 시작하기</button>
            <button className='login-btn3'>
              <img className='login-google' src={Google}/>
              Google로 시작하기</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Login;
