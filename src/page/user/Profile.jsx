import React from 'react';
import { useEffect, useState } from 'react';
import ProfileImage from '../../assets/user/profile.svg';
import { useNavigate } from 'react-router-dom';
import user from '../../store/userStore/user';
import axios from 'axios';

const genders=['남성','여성']
const ages=['20대','30대','40대','50대','60대','70대','80대','90대']
const genderToString = (gender) => {
  if (gender === false) {
    return '남성';
  } else if (gender === true) {
    return '여성';
  } 
};
const genderToBoolean = (gender) => {
  if (gender === '남성') {
    return false;
  } else if (gender === '여성') {
    return true;
  }
};
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


const Profile = () => {
 const navigate=useNavigate()
 const { name,nickname,age,gender,intro,setName,setNickname,setAge,setGender,setIntro} = user();
 const [name_, setName_] = useState(name);
 const [nickname_,setNickname_]=useState(nickname)
 const [age_,setAge_]=useState(age)
 const [gender_,setGender_]=useState(gender)
 const [intro_,setIntro_]=useState(intro)
const [profile,setProfile]=useState(ProfileImage)

const [file, setFile] = useState(null); // 업로드한 파일 상태


 //console.log(name,nickname,age,gender,intro)
 console.log(name_,nickname_,age_,gender_,intro_)

 const handleClick = async (event) => {
  event.preventDefault();   

  const addUserRequest = {
    name: name_,
    nickname:nickname_,
    intro:intro_,
    age: age_,
    sex:gender_,
    // sub:sessionStorage.getItem('sub')
  };

  const formData_ = new FormData();
  

  if (file) {
    // 파일이 존재하면 추가
    formData_.append('profileImg', file);
    formData_.append(
      'addInfoRequest',
      new Blob([JSON.stringify(addUserRequest)], { type: 'application/json' })
  );
  } else {
    try {
      // 파일이 null이면 이미지 URL을 파일로 변환하여 추가
      const url=profile
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'filename.extension', { type: blob.type });
      formData_.append('profileImg', file);
      formData_.append(
          'addInfoRequest',
          new Blob([JSON.stringify(addUserRequest)], { type: 'application/json' })
      );
    
    } catch (error) {
      console.error('Error converting image URL to file:', error);
      return; // 에러 발생 시 중단
    }
  }



  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/user/sub`, formData_,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'sub':sessionStorage.getItem('sub'),
      },
    });
    setName(name_)
    setNickname(nickname_)
    setAge(age_)
    setIntro(intro_)
    setGender(gender_)
    navigate('/user');
  } catch (error) {
    console.error('에러 발생:', error);
  }
};


const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  setFile(selectedFile);

  
  const previewUrl = URL.createObjectURL(selectedFile);
  setProfile(previewUrl)
};


useEffect(() => {
  // 비동기 함수 정의
  const fetchData = async () => {
    try {
      const response = await axios.get(
       `${process.env.REACT_APP_API_URL}/api/user/sub`,{
        params:{
          sub:sessionStorage.getItem('sub')
        }
       },
      );
      console.log(response.data)
      const processUrl = response.data.profileImg.replace('/home/ec2-user', '')
      console.log(processUrl)
      const profileImageUrl = `${process.env.REACT_APP_API_URL}${processUrl}`;
      console.log(profileImageUrl)
      setProfile(profileImageUrl); 
    } catch (err) {
      console.error('Error fetching');
    }
  };

  fetchData(); // 비동기 함수 호출
}, []); // 빈 배열로 한 번만 실행되도록 설정



 return (
    <section>
      <form className='flex flex-col gap-8' onSubmit={handleClick}>
        <div>
          <img style={{width:'100px',height:'100px',margin:'0 auto'}}src={profile} alt='alt' className='rounded-full'></img>
          <p className='text-center font-bold'>프로필 설정</p>
          <div className='text-center pl-20'><input type="file" accept="image/*" onChange={handleFileChange} /></div>

        </div>
        <div>
          <p>이름</p>
          <input value={name_}
          className='pl-2 border border-solid border-black rounded h-8 w-full'
          onChange={(e) => {setName_(e.target.value)}}
          type='text'></input>
        </div>
        <div>
          <p>닉네임</p>
          <input value={nickname_}
          onChange={(e)=>{setNickname_(e.target.value)}}
          className='pl-2 border border-solid border-black rounded h-8 w-full' type='text'></input>
        </div>
        <div>
          <p>성별</p>
          <div className='flex gap-4'>
            {genders.map((gen,index)=>{
              let classname;
              const btn1='px-8 py-2 bg-[#4C3EED] text-white rounded'
              const btn2='px-8 py-2 bg-[#D0D0D0] text-[#A7A7A7] rounded'
              if(gen===genderToString(gender_)){
                classname=btn1
              }else{
                classname=btn2
              }
              return(

                <button 
                  onClick={()=>{setGender_(genderToBoolean(gen))}}
                key={index} type='button' className={classname}>{gen}</button>
              )
            })}
          </div>
        </div>
        <div>
          <p>나이</p>
          <div className='flex flex-wrap gap-2'>
            {ages.map((a,index)=>{
              let classname;
              const btn1='px-8 py-2 bg-[#4C3EED] text-white rounded'
              const btn2='px-8 py-2 bg-[#D0D0D0] text-[#A7A7A7] rounded'
              if(ageToEnglish(a)===age_){
                classname=btn1
              }else{
                classname=btn2
              }
              return(
                <button
                  onClick={()=>{setAge_(ageToEnglish(a))}}
                key={index} type='button' className={classname} >{a}</button>
              )
            })}
          </div>
        </div>
        <div>
            <p>한줄 소개</p>
            <textarea 
            value={intro_}
            className='border-2 w-full h-20 border-black border-solid rounded'
            onChange={(e)=>{setIntro_(e.target.value)}}>
            </textarea>
        </div>
        {/* <input type="file" /> */}
        {/* <div className='w-screen h-16 px-8 py-2 fixed bottom-0 left-0 border-solid border-t-2 border-black bg-white'>
            <button type='submit' className='w-full  h-full inline-block  bg-blue-600 text-white rounded'>저장하기</button>
        </div> */}
            <button type='submit' className='w-full  h-16 inline-block  bg-blue-600 text-white rounded'>저장하기</button>

      </form>
    </section>
  );
};

export default Profile;