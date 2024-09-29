import React from 'react';
import { useState } from 'react';
import Image from '../../assets/signup/image.svg'
import Success from './components/Success'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate =useNavigate()
  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    gender: "",
    age: "",
    bio: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderClick = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleAgeClick = (age) => {
    setFormData({
      ...formData,
      age,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // form submission logic
    console.log(formData);
    setIsSubmitted(true);
  };

  // 모든 필드가 채워졌는지 확인
  const isFormValid = Object.values(formData).every(field => field !== "");

  // 버튼의 클래스 설정
  const buttonClass = isFormValid ? 'button' : 'button-disabled'; // 버튼 스타일 변경



  return (
  
    <div className='signup-wrapper'>
      {!isSubmitted?
      
      (<form onSubmit={handleSubmit}>
        <div className='signup-container'>
          <div className='container1'>
            <div onClick={goBack}className='arrow'>{'<'}</div>
            <div className='text'>회원정보 입력</div>
          </div>
          <div className='container2'>
            <div className='img'><img src={Image} style={{width:100,height:100}}></img></div>
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
              ></input>
            </div>
          </div>
          <div className='container4'>
            <div className='text'>닉네임</div>
            <div className='input-wrapper'>
              <input className='input'type='text'
                    name="nickname"
                    placeholder="닉네임을 입력해주세요(최대 8자)"
                    value={formData.nickname}
                    onChange={handleChange}
              ></input>
            </div>
            <div className='button'>
              <button type='button'className='button-button'>중복 확인</button> 
            </div>
          </div>

          <div className='container5'>
            <div className='text'>성별</div>
            <div className='button-wrapper'>
              <button type='button' 
                className={formData.gender === "남성" ? "button1" : "button2"}
                onClick={() => handleGenderClick("남성")}
              >남성</button>
              <button type='button' 
                className={formData.gender === "여성" ? "button1" : "button2"}
                onClick={() => handleGenderClick("여성")}
              >여성</button>
            </div>
          </div>

          <div className='container6'>
            <div className='text'>나이</div>
            <div className='button-wrapper'>
              {["20대", "30대", "40대", "50대", "60대", "70대", "80대", "90대"].map((age) => (
                <button
                  type="button"
                  // key={age}
                  className={formData.age === age ? "button1" : "button2"}
                  onClick={() => handleAgeClick(age)}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className='container7'>
            <div className='text'>한줄 소개</div>
            <div className='textarea-wrapper'>
              <textarea
                className='textarea'
                name="bio"
                placeholder="한줄 본인소개를 해주세요! (최대 50자)"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='container8'>
            <div className='button-wrapper'>
              <button type="submit" className={buttonClass} disabled={!isFormValid}
                
              >확인</button>
            </div>
          </div>


        </div>
      </form>):(
        
        <Success></Success>)}
    </div>
  )
  
};

export default Signup;