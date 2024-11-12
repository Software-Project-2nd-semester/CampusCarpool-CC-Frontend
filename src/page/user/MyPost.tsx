import React, { useEffect ,useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Driver from '../../assets/user/tag/driver.svg'
import User from '../../assets/user/tag/user.svg'
import Taxi from '../../assets/user/tag/taxi.svg'
import Depart from '../../assets/user/depart.svg'
import Arrive from '../../assets/user/arrive.svg'
import MaximumPeople from '../create/components/MaximumPeople';

const MyPost = () => {
  const location = useLocation();
  const [data, setData] = useState<any[]>([]);
  let image;
  let tagKor;
  let style;
  let samesex;
  let socialCarpool;
  console.log(data)

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reservation/article-id`,{
          params:{
            articleId:location.state.fetch.id
          }
        });

        setData(response.data); // 받은 데이터 state에 저장
       // console.log('Response data:', response.data);
      } catch (error) {
        console.error('Error while sending POST request:', error);
      }
    };
    sendRequest();
  }, []); 
  if(data===null){
    return(
      <div>Loading</div>
    )
  }
  
  if(location.state.fetch.tag==='CARPOOL_DRIVER'){
    image=Driver
    tagKor='운전자'
    style='bg-blue-500'
  }else if(location.state.fetch.tag==='CARPOOL_USER'){
    image=User
    tagKor='탑승자'
    style='bg-green-500'
  }else{
    image=Taxi
    tagKor='택시'
    style='bg-yellow-300'
  }

  if(location.state.fetch.samesex===true){
    samesex='동성만'
  }else{
    samesex='성별무관'
  }

  if(location.state.fetch.socialCarpool===true){
    socialCarpool='활발하게'
  }else{
    socialCarpool='조용히'
  }


  return (
    <div className='relative'>
      <div className='flex absolute z-20 -top-12 right-6 gap-2'>
        <button>수정하기</button>
        <button className='text-red-500'>삭제하기</button>
      </div>
      <div className='flex justify-between' >
        <p>{location.state.fetch.title}</p>
        <div className={`flex rounded gap-2 ${style}`}>
          <img src={image} alt='alt' style={{width:'16px'}}></img>
          <p>{tagKor}</p>
        </div>
      </div>
      <div className="mt-4 mb-4 relative w-[calc(100%+40px)] -left-5 border border-b-10 border-solid border-gray-300"></div>
      <div>
        <p>{location.state.filter.time}</p>
        <div className='flex'>
          <img src={Depart} alt='alt' style={{width:'24px'}}></img>
          <p>{location.state.fetch.departurePlaceName}</p>
        </div>
        <p>↓</p>
        <div className='flex'>
          <img src={Arrive} alt='alt' style={{width:'24px'}}></img>
          <p>{location.state.fetch.arrivePlaceName}</p>
        </div>
      </div>
      <div className="mt-4 mb-4 relative w-[calc(100%+40px)] -left-5 border border-b-10 border-solid border-gray-300"></div>

      <div>
        <p>이동 설명</p>
        <p className='text-gray-400 text-sm mb-4'>  {location.state.fetch.content} </p>
        {location.state.fetch.tag==='CARPOOL_USER'&&
        <p>탑승자 요구사항</p>
        }
        {location.state.fetch.tag==='CARPOOL_DRIVER'&&
        <p>운전자 요구사항</p>
        }{location.state.fetch.tag==='TAXI'&&
          <p>택시 동승자 요구사항</p>
        }
        <div className='flex gap-4'>
          <button className='bg-blue-700 text-white py-2 px-4 rounded-lg'>{samesex}</button>
          <button className='bg-blue-700 text-white py-2 px-4 rounded-lg'>{socialCarpool}</button>
        </div>
        {location.state.fetch.tag !== 'CARPOOL_USER' && 
        <div className='flex mt-4 justify-between'>
          <p>현재인원/최대인원</p>
          <p>잔여
            <span className="text-blue-500">{location.state.fetch.maximumPeople - data.length}석</span>
               /{location.state.fetch.maximumPeople}석
          </p>
        </div>
        }
        {location.state.fetch.tag === 'CARPOOL_DRIVER' &&
        <div className='mt-4'>
          <p >차량정보</p>
          <p className='text-gray-500 text-sm'>{location.state.fetch.carInfo}</p>
        </div>
      } 
      </div>
      
      {location.state.fetch.tag !== 'CARPOOL_USER' &&
      <div className='flex justify-evenly h-20 py-4 w-full fixed bottom-0 left-0 border border-solid border-black '>
        <button   className='bg-blue-700 px-8 text-white rounded-lg'>예약자</button>
        <button className='bg-blue-700 px-8 text-white rounded-lg'>채팅방</button>
      </div> 
      }
      {location.state.fetch.tag === 'CARPOOL_USER' &&
      <div className='flex justify-evenly h-20 py-4 w-full fixed bottom-0 left-0 border border-solid border-black '>
      <button className='w-80 bg-blue-700 px-8 text-white rounded-lg'>채팅방</button>
      </div> 
      }
    </div>
  );
};

export default MyPost;