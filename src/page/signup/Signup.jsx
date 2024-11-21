import React from 'react';
import { useState,useEffect } from 'react';
import Image from '../../assets/signup/image.svg'
import Success from './components/Success'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import userStore from '../../store/userStore/user'
function ageToEnglish(age) {
  if (age === '20대') {
    return 'TWENTY';
  } else if (age === '30대') {
    return 'THIRTY';
  } else if (age === '40대') {
    return 'FORTY';
  } else if (age === '50대') {
    return 'FIFTY';
  } else if (age === '60대') {
    return 'SIXTY';
  } else if (age === '70대') {
    return 'SEVENTY';
  } else if (age === '80대') {
    return 'EIGHTY';
  } else if (age === '90대') {
    return 'NINETY';
  }
}

const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate =useNavigate()
  const [file, setFile] = useState(null); // 업로드한 파일 상태
  const [preview, setPreview] = useState(Image); // 이미지 미리보기 URL

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };
  //const { name, nickname, gender, age, intro, setName, setNickname, setGender, setAge, setBio } = userStore();
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    gender: "",
    age: "",
    intro: "",
    sub:""
  });
  //console.log(name)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //setName(value);
  };

  const handleGenderClick = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleAgeClick = (age) => {
    
    const strAge=ageToEnglish(age)
    setFormData({
      ...formData,
      age:strAge
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // 이미지 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const addUserRequest = {
      name: formData.name,
      nickname:formData.nickname,
      intro:formData.intro,
      age: formData.age,
      sex:formData.gender,
      sub:sessionStorage.getItem('sub')
    };


    const formData_ = new FormData();
   
    formData_.append('profileImg',file)
    formData_.append(
      'addUserRequest',
      new Blob([JSON.stringify(addUserRequest)], { type: 'application/json' })
    );
    
    // for (const [key, value] of formData_.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    formData_.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    console.log(formData)

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, formData_,{
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'sub':sessionStorage.getItem('sub'),
          },
        });
        console.log('Response:', response.data);
        setIsSubmitted(true); // 제출 성공 시 상태 업데이트
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Upload failed!');
      }
  }
  

    // form submission logic
    // try {
    //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
    //     name: formData.name,
    //     nickname: formData.nickname,
    //     sex: formData.sex,
    //     age: formData.age,
    //     intro: formData.intro,
    //     sub:formData.sub
    //   });
    //   console.log('Response:', response.data);
    //   setIsSubmitted(true); // 제출 성공 시 상태 업데이트
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  


  // 모든 필드가 채워졌는지 확인
  const isFormValid = Object.values(formData).every(field => field !== "");

  // 버튼의 클래스 설정
  const buttonClass = isFormValid ? 'button' : 'button-disabled'; // 버튼 스타일 변경


 useEffect(() => {
    // URL의 쿼리 문자열에서 sub 파라미터를 추출
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const subValue = urlParams.get('sub');

    if (subValue) {
      setFormData({...formData,sub:subValue}); // 상태 업데이트
      sessionStorage.setItem('sub', subValue);
    } else {
      console.log('sub 값이 존재하지 않습니다.');
    }
  }, []); // 빈 배열을 두어 컴포넌트 마운트 시 한 번 실행
  return (
    
    <div className='signup-wrapper' style={{paddingBottom:'85px'}}>
      {!isSubmitted?
      
      (<form onSubmit={handleSubmit}>
        <div className='signup-container'>
          <div className='container1'>
            <div onClick={goBack}className='arrow'>{'<'}</div>
            <div className='text'>회원정보 입력</div>
          </div>
          <div className='container2'>
            <div className='img'><img src={preview} style={{width:100,height:100}} alt='alt'></img></div>
            <div className='text'>프로필 설정</div>
            <div className='pl-20'>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
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
                className={formData.gender === true ? "button1" : "button2"}
                onClick={() => handleGenderClick(true)}
              >남성</button>
              <button type='button' 
                className={formData.gender === false ? "button1" : "button2"}
                onClick={() => handleGenderClick(false)}
              >여성</button>
            </div>
          </div>

          <div className='container6'>
            <div className='text'>나이</div>
            <div className='button-wrapper'>
              {["20대", "30대", "40대", "50대", "60대", "70대", "80대", "90대"].map((age) =>{
                const strAge=ageToEnglish(age)
                return(
                <button
                  type="button"
                  // key={age}
                  className={formData.age === strAge ? "button1" : "button2"}
                  onClick={() => handleAgeClick(age)}
                >
                  {age}
                </button>
              )})}
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