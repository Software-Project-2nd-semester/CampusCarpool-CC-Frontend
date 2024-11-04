import React from 'react';
import { useEffect, useState } from 'react';
import ProfileImage from '../../assets/user/profile.svg';
import { useNavigate } from 'react-router-dom';
import user from '../../store/userStore/user';

const genders=['남성','여성']
const ages=['20대','30대','40대','50대','60대','70대','80대','90대']

const Profile = () => {
 const navigate=useNavigate()
 const { name,nickname,age,gender,intro,setName,setNickname,setAge,setGender,setIntro} = user();

 console.log(name,nickname,age,gender,intro)
 
  return (
    <section>
      <form className='flex flex-col gap-8' onSubmit={()=>{
        navigate('/user')
      }}>
        <div>
          <img style={{width:'100px',height:'100px',margin:'0 auto'}}src={ProfileImage} alt='alt'></img>
          <p className='text-center font-bold'>프로필 설정</p>
        </div>
        <div>
          <p>이름</p>
          <input className='pl-2 border border-solid border-black rounded h-8 w-full' type='text'></input>
        </div>
        <div>
          <p>닉네임</p>
          <input className='pl-2 border border-solid border-black rounded h-8 w-full' type='text'></input>
        </div>
        <div>
          <p>성별</p>
          <div className='flex gap-4'>
            {genders.map((gender)=>{
              return(
                <button type='button' className='px-8 py-2 bg-[#D0D0D0] text-[#A7A7A7] rounded'>{gender}</button>
              )
            })}
          </div>
        </div>
        <div>
          <p>나이</p>
          <div className='flex flex-wrap gap-2'>
            {ages.map((age)=>{
              return(
                <button type='button' className='px-8 py-2 bg-[#D0D0D0] text-[#A7A7A7] rounded' >{age}</button>
              )
            })}
          </div>
        </div>
        {/* <input type="file" /> */}
        <div className='w-screen h-16 px-8 py-2 fixed bottom-0 left-0 border-solid border-t-2 border-black'>
            <button type='submit' className='w-full  h-full inline-block  bg-blue-600 text-white rounded'>저장하기</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;