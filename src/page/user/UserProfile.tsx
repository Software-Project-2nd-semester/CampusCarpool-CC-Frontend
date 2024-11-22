import React from 'react';
import { useLocation } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios';
import Person1 from '../../assets/user/person1.svg'
import Person2 from '../../assets/user/person2.svg'


interface UserProfileData {
  nickname: string;
  name:string;
  age:string;
  sex:boolean;
  intro:string;
  id:number;
  profileImg:string;
}
const sexToString=(sex:any)=>{
  if(sex===true){
    return '여성'
  }else{
    return '남성'
  }
}
function ageToKorean(age: any) {
  if (age === 'TWENTY') {
    return '20대';
  } else if (age === 'THIRTY') {
    return '30대';
  } else if (age === 'FORTY') {
    return '40대';
  } else if (age === 'FIFTY') {
    return '50대';
  } else if (age === 'SIXTY') {
    return '60대';
  } else if (age === 'SEVENTY') {
    return '70대';
  } else if (age === 'EIGHTY') {
    return '80대';
  } else if (age === 'NINETY') {
    return '90대';
  }
}



const UserProfile = () => {
  const [data,setData]=useState<UserProfileData | null>(null)
  const location = useLocation();
  let imgurl;
  
  useEffect( ()=>{
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/sub`, {
          params: {
            sub: location.state.sub,
          }
      }); // 데이터 요청
        setData(response.data); // 응답 데이터 상태에 저장
      } catch (error) {
        console.error('Error fetching data:', error); // 에러 처리
      } 
    };
    fetchData();

  },[])

  if (!data) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
  console.log(data)
  
  
  if(data.profileImg){
    let url=data.profileImg
    let processurl = url.replace('/home/ec2-user', '')
   let  img=`${process.env.REACT_APP_API_URL}${processurl}`;
    imgurl=img
  }

  return (
    <div>
      <div className='flex items-center'>
        <div className='pt-2 '><img className='rounded-full' src={imgurl} alt='alt' style={{width:'100px'}} ></img></div>
        <div className='text-4xl mb-4 pt-4 '>{data.nickname}</div>

      </div>
      <div className='flex gap-2 mb-2'>
        <img src={Person1} alt='alt' style={{width:'16px'}}></img>
        <p>{sexToString(data.sex)}•{ageToKorean(data.age)}</p>
      </div>
      <div className='flex gap-2'>
        <img src={Person2} alt='alt' style={{width:'16px',height:'16px'}}></img>
        <div>
          <p>한줄 소개</p>
          <p className='text-gray-400'>{data.intro}</p>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;