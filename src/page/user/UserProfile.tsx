import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios';
import Person1 from '../../assets/user/person1.svg'
import Person2 from '../../assets/user/person2.svg'
import Driver from '../../assets/user/tag/driver.svg'
import User from '../../assets/user/tag/user.svg'
import Taxi from '../../assets/user/tag/taxi.svg'
import Place from '../../assets/user/location.svg'
import Time from '../../assets/user/time.svg'


interface UserProfileData {
  nickname: string;
  name:string;
  age:string;
  sex:boolean;
  intro:string;
  id:number;
  profileImg:string;
}


interface Article{
 id:number;
 title:string;
 tag:string;
 departurePlaceName:string;
 arrivePlaceName:string;
departureAt:string;
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
  const [article,setArticle]=useState<Article[] | null>(null)
  const location = useLocation();
  const navigate=useNavigate()
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

        const response2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles/sub`, {
          headers: {
            sub: location.state.sub,
          }
      }); // 데이터 요청
      setArticle(response2.data)
      console.log(response2.data)

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
      
      <div className='flex flex-col mt-8'>
        {article?.map((d,index)=>{
          let border;
          let image;
          let style;
          let tagkor;
          const dateString = d.departureAt; // 입력된 날짜 문자열
          const date = new Date(dateString); // Date 객체로 변환
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // 12시간제로 설정
          };
           // 날짜와 시간 포맷팅
           const formattedDate = date.toLocaleString('ko-KR', options);
           // '오후'와 시간을 포함하여 원하는 형식으로 변환
           const finalFormattedDate = formattedDate.replace(/(\d{1,2})(:)(\d{2})/, "$1시 $3분") + " 출발";


          if(d.tag==='CARPOOL_DRIVER'){
            border='border-2 border-blue-500 border-solid rounded'
            image=Driver
            style='bg-blue-500'
            tagkor='운전자'
          }else if(d.tag==='CARPOOL_USER'){
            border='border-2 border-green-500 border-solid rounded'
            image=User
            style='bg-green-500'
            tagkor='탑승자'
          }else{
            border='border-2 border-yellow-300 border-solid rounded'
            image=Taxi
            style='bg-yellow-300'
            tagkor='택시'
          }

      

          return(
          <div key={index} 
            onClick={()=>{navigate(`/home/post/${d.id}`)}}
            style={{cursor:'pointer'}}
            className={`bg-gray-200 mb-4 px-4 py-4 ${border}`}
          >
            <div className=' flex justify-between'>
              <p>{d.title}</p>
              <div className={`flex gap-2 ${style} py-1 px-2 rounded-lg`}>
                 <img src={image} alt='alt' style={{width:'16px'}}></img>
                 <p>{tagkor}</p>
              </div>
            </div>
            <div className='flex text-gray-400'>
              <img src={Time} alt='alt' style={{width:'16px'}}></img>
              <p>{finalFormattedDate}</p>
            </div>
            <div className='flex text-gray-400'>
              <img src={Place} alt='alt' style={{width:'16px'}}></img>
              <p>{d.departurePlaceName}-{'>'}{d.arrivePlaceName}</p>
            </div>
          </div>
          )
        })}
      </div>


    </div>
  );
};

export default UserProfile;