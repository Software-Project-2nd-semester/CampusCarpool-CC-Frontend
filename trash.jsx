import React, { useState, useEffect } from 'react';
import Image from '../../assets/signup/image.svg';
import Success from './components/Success';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    sex: "",
    age: "",
    intro: "",
    sub: ""
  });
  

  // 뒤로가기 함수
  const goBack = () => {
    navigate(-1);
  };

  // 컴포넌트 로드시 토큰에서 sub 값을 추출하여 formData에 설정
  useEffect(() => {
    const sub = localStorage.getItem('oauthId');  // oauthId를 sub으로 설정
    if (sub) {
      setFormData((prevData) => ({
        ...prevData,
        sub: sub
      }));
      console.log("설정된 formData:", formData);
    } else {
      console.error("oauthId 값이 존재하지 않습니다.");
    }
  }, []);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 성별 선택 핸들러
  const handleGenderClick = (sex) => {
    setFormData({
      ...formData,
      sex,
    });
  };

  // 나이 선택 핸들러
  const handleAgeClick = (age) => {
    setFormData({
      ...formData,
      age: age,  // 선택된 나이를 그대로 저장
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // JWT 토큰 가져오기(로그인 시 저장한 토큰 사용)
      const token = localStorage.getItem('token');
      const enumAge = {
        "20대" : "TWENTY",
        "30대" : "THIRTY",
        "40대" : "FOURTY",
        "50대" : "FIFTY",
        "60대" : "SIXTY",
        "70대" : "SEVENTY",
        "80대" : "EIGHTY",
        "90대" : "NINETY",
      };  
      const booleanSex = formData.sex === "남성";

      // 백엔드로 POST 요청(회원가입 엔드포인트)
      const response = await axios.post("http://localhost:8080/signup", {
        ...formData,
        age: enumAge[formData.age],
        sex: booleanSex
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // JWT 토큰을 헤더에 추가
        }
      });

      // 응답 성공 시
      console.log("응답 데이터 : ", response.data);
      setIsSubmitted(true);  // 성공시 성공 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패 : ", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
    console.log("제출되는 formData:", formData);
  };

  // 모든 필드가 채워졌는지 확인
  const isFormValid = Object.entries(formData).every(([key, value]) => key === 'sub' || value !== "");

  // 버튼의 클래스 설정
  const buttonClass = isFormValid ? 'button' : 'button-disabled'; // 버튼 스타일 변경


  return (
    <div className='signup-wrapper' style={{ paddingBottom: '85px' }}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className='signup-container'>
            <div className='container1'>
              <div onClick={goBack} className='arrow'>{'<'}</div>
              <div className='text'>회원정보 입력</div>
            </div>
            <div className='container2'>
              <div className='img'><img src={Image} style={{ width: 100, height: 100 }} alt="프로필 설정" /></div>
              <div className='text'>프로필 설정</div>
            </div>
            <div className='container3'>
              <div className='text'>이름</div>
              <div className='input-wrapper'>  
                <input className='input' type="text"
                  name="name"
                  placeholder="이름을 입력해주세요."
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='container4'>
              <div className='text'>닉네임</div>
              <div className='input-wrapper'>
                <input className='input' type='text'
                  name="nickname"
                  placeholder="닉네임을 입력해주세요(최대 8자)"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>
              <div className='button'>
                <button type='button' className='button-button'>중복 확인</button> 
              </div>
            </div>

            <div className='container5'>
              <div className='text'>성별</div>
              <div className='button-wrapper'>
                <button type='button' 
                  className={formData.sex === "남성" ? "button1" : "button2"}
                  onClick={() => handleGenderClick("남성")}
                >남성</button>
                <button type='button' 
                  className={formData.sex === "여성" ? "button1" : "button2"}
                  onClick={() => handleGenderClick("여성")}
                >여성</button>
              </div>
            </div>

            <div className='container6'>
              <div className='text'>나이</div>
              <div className='button-wrapper'>
                {["20대", "30대", "40대", "50대", "60대", "70대", "80대", "90대"].map((ageLabel) => (
                  <button
                    type="button"
                    key={ageLabel}
                    className={formData.age === ageLabel ? "button1" : "button2"}
                    onClick={() => handleAgeClick(ageLabel)}
                  >
                    {ageLabel}  
                  </button>
                ))}
              </div>
            </div>

            <div className='container7'>
              <div className='text'>한줄 소개</div>
              <div className='textarea-wrapper'>
                <textarea
                  className='textarea'
                  name="intro"
                  placeholder="한줄 본인소개를 해주세요! (최대 50자)"
                  value={formData.intro}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='container8'>
              <div className='button-wrapper'>
                <button type="submit" className={buttonClass} disabled={!isFormValid}>확인</button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Success />
      )}
    </div>
  );
};

export default Signup;
