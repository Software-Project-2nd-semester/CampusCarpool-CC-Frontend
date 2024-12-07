import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Driver from '../../assets/user/tag/driver.svg'
import User from '../../assets/user/tag/user.svg'
import Taxi from '../../assets/user/tag/taxi.svg'
import Time from '../../assets/user/time.svg'
import Location from '../../assets/user/location.svg'
import { fetchData} from '../../api/user/fetchData'
import { useNavigate } from 'react-router-dom';

const Write : ()=>JSX.Element = () => {
  const navigate=useNavigate()
  let { tag } = useParams();
  let filteredData;
  const { data, error, isLoading } = useQuery({
    queryKey: ['myData1'],
    queryFn:fetchData,
    staleTime: 1000,  
    gcTime:900000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if(tag==='driver'){
   filteredData = data.filter((item:any) => item.tag === 'CARPOOL_DRIVER');
  }else if(tag==='user'){
   filteredData = data.filter((item:any) => item.tag === 'CARPOOL_USER');
  }else if(tag==='taxi'){
   filteredData = data.filter((item:any) => item.tag === 'TAXI');
  }else{
    filteredData=data
  }
  //console.log(data)
  return (
    <div>
      <div className='flex gap-2'>
        <div className='flex-1 py-1 text-center border-black border-solid border rounded-xl' style={{cursor:'pointer'}}
          onClick={()=>navigate('/user/write/total')}
        >
          전체
        </div>
        <div className='flex-1 py-1 flex justify-evenly rounded-xl bg-[#4C3EED] ' style={{cursor:'pointer'}}
          onClick={()=>navigate('/user/write/driver')}
        >
          <img src={Driver} alt='alt' style={{width:'16px'}}></img>
          <p>운전자</p>
        </div>
        <div className='flex-1 py-1 flex justify-evenly rounded-xl bg-[#01A543] ' style={{cursor:'pointer'}}
          onClick={()=>navigate('/user/write/user')}
        >
          <img src={User} alt='alt' style={{width:'16px'}}></img>
          <p>탑승자</p>
        </div>
        <div className='flex-1 py-1 flex justify-evenly rounded-xl bg-[#E0CA00] ' style={{cursor:'pointer'}}
          onClick={()=>navigate('/user/write/taxi')}
        >
          <img src={Taxi} alt='alt' style={{width:'16px'}}></img>
          <p>택시</p>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {filteredData.map((d:any,index:number)=>{
          let image;
          let style;
          let tag;
          let style2;
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
            image=Driver
            style='bg-[#4C3EED]'
            style2='border-[#4C3EED]'
            tag='운전자'
          }else if(d.tag==='CARPOOL_USER'){
            image=User
            style='bg-[#01A543]'
            style2='border-[#01A543]'
            tag='탑승자'
          }else if(d.tag==='TAXI'){
            image=Taxi
            style='bg-[#E0CA00]'
            style2='border-[#E0CA00]'
            tag='택시'
          }
          return(
            <div key={index} style={{cursor:'pointer'}} onClick={()=>navigate(`/user/post/${d.id}`,{state:{fetch:d,filter:{time:finalFormattedDate}}})}
              className={`rounded p-4 border-2  border-solid  ${style2}`}
            >
              <div className='flex justify-between'>
                <p className='font-bold text-lg'>{d.title}</p>
                <div className={`w-20 flex justify-evenly rounded-xl ${style}`} >
                  <img src={image} alt='alt' style={{width:'16px'}}></img>
                  <p>{tag}</p>
                </div>
              </div>
              <div className='flex'>
                <img style={{width:'16px'}} src={Time} alt='alt'></img>
                <p className='text-gray-500'>{d.departurePlaceName} -{'>'} {d.arrivePlaceName}</p>
              </div>
              <div className='flex'>
                <img  style={{width:'16px'}}src={Location} alt='alt'></img>
                <p className='text-gray-500 '>{finalFormattedDate}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Write;