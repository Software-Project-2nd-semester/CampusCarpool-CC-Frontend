import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios';
import Driver from '../../assets/user/tag/driver.svg'
import User from '../../assets/user/tag/user.svg'
import Taxi from '../../assets/user/tag/taxi.svg'
import Place from '../../assets/user/location.svg'
import Time from '../../assets/user/time.svg'
import { useNavigate } from 'react-router-dom';

interface PostData {
  id:number;
  title:string;
  tag:string;
  departurePlaceName:string;
  arrivePlaceName:string;
  departureAt:string;
}


const MyReserve = () => {
  const [data, setData] = useState<PostData | any>([]);
  const [tag,setTag]=useState('total')
  const navigate=useNavigate()
  let filteredData;
  console.log(data)
  useEffect(()=>{
    const sendRequest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles/my-reservation`,{
         headers:{
          'sub':sessionStorage.getItem('sub')
         }
        });

        setData(response.data); // 받은 데이터 state에 저장
      } catch (error) {
        console.error('Error while sending POST request:', error);
      }
    };
    sendRequest();
  },[])

  if (!Array.isArray(data) || data.length === 0) {
    return <div>loading</div>;
  }

  if(tag==='driver'){
    filteredData = data.filter(item => item.tag === 'CARPOOL_DRIVER');
  }else if(tag==='user'){
    filteredData = data.filter(item => item.tag === 'CARPOOL_USER');
  }else if(tag==='taxi'){
    filteredData = data.filter(item => item.tag === 'TAXI');
  }else{
    filteredData=data
  }
  
 
  

  return (
    <div>
      <div className='flex gap-2'>
        <div onClick={()=>setTag('total')} 
        style={{cursor:'pointer'}}
        className='w-1/4 py-1 flex-1 border border-solid border-black rounded-xl'>
          <p className='text-center'>전체</p>
        </div>
        <div onClick={()=>setTag('driver')} 
        style={{cursor:'pointer'}}
        className='flex py-1 w-1/4 flex-1 bg-[#4C3EED] rounded-xl justify-evenly'>
          <img src={Driver} alt='alt' style={{width:'16px'}}></img>
          <p>운전자</p>
        </div>
        <div onClick={()=>setTag('user')}  
        style={{cursor:'pointer'}}
        className='flex py-1 w-1/4 flex-1 justify-evenly rounded-xl bg-[#01A543]'>
         <img src={User} alt='alt' style={{width:'16px'}}></img>
          <p>탑승자</p>
        </div>
        <div onClick={()=>setTag('taxi')} 
        style={{cursor:'pointer'}} 
        className='flex py-1 w-1/4 flex-1 justify-evenly rounded-xl bg-[#E0CA00]'>
         <img src={Taxi} alt='alt' style={{width:'16px'}}></img>
          <p>택시</p>
        </div>
      </div>
      <div className='flex flex-col mt-8'>
        {filteredData.map((d,index)=>{
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
            border='border-2 border-[#4C3EED] border-solid rounded'
            image=Driver
            style='bg-[#4C3EED]'
            tagkor='운전자'
          }else if(d.tag==='CARPOOL_USER'){
            border='border-2 border-[#01A543] border-solid rounded'
            image=User
            style='bg-[#01A543]'
            tagkor='탑승자'
          }else{
            border='border-2 border-[#E0CA00] border-solid rounded'
            image=Taxi
            style='bg-[#E0CA00]'
            tagkor='택시'
          }

      

          return(
          <div key={index} 
            onClick={()=>{navigate(`/home/post/${d.id}`)}}
            style={{cursor:'pointer'}}
            className={` mb-4 px-4 py-4 ${border}`}
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

export default MyReserve;