import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ChatRoom {
  id: number ;// 채팅방 id
  articleId: number;//게시글 id
  title: string;//제목
  lastMessage: string;//마지막메세지 내용
  lastMessageTime: string;//마지막메세지 시간
  createdAt: string; //채팅방 개설시간
}

const Chat = () => {
  const navigate=useNavigate()
  const [data,setData]=useState<ChatRoom[] | null>(null)
  // console.log(data)

  useEffect(()=>{
    const fetchData = async () => {
      
      try {
        const response = await axios.get<ChatRoom[]>(
          `${process.env.REACT_APP_API_URL}/api/chat/room`,
          {
            params: {
            participantSub:sessionStorage.getItem('sub')
            },
          }
        );
        // console.log(response.data)
        setData(response.data)
      } catch (err:any) {
        console.error('Error fetching',err);
      }
    };

    fetchData(); // 데이터 가져오기
  },[])

  // if(data===null){
  //   return <div>loading</div>
  // }

  return (
    <div>
      {data?.map((room,index) => {
         let time: string = room.lastMessageTime;
         const currentTime: Date = new Date(); // 현재 시간
         const date: Date = new Date(time);  // 'time'을 Date 객체로 변환
         
         // 날짜에 9시간 추가
         date.setHours(date.getHours() + 9);
         
         // 시간 차이를 밀리초로 구함
         let timeDifferenceInMillis: number = currentTime.getTime() - date.getTime(); 
         
         // 밀리초를 분으로 변환
         let timeDifferenceInMinutes: number = timeDifferenceInMillis / 60000;
         
         // 시간 차이를 올림 처리
         let roundedTimeDifferenceInMinutes = Math.ceil(timeDifferenceInMinutes);
         
         console.log(date);
         console.log(currentTime);
         console.log('시간 차이 (분, 올림 처리):', roundedTimeDifferenceInMinutes); // 올림 처리된 값 출력

          return(
            <div key={index}
              onClick={()=>{navigate(`/chatroom/${room.articleId}`)}}
              className='px-2 py-1 border border-solid border-gray-300 rounded'
            >
              <p className='text-lg'>{room.title}</p>
              <div className='flex justify-between'>
                <p className='text-gray-500'>{room.lastMessage}</p>
                <p className='text-blue-500'>{roundedTimeDifferenceInMinutes}분전</p>
              </div>
              
            </div>
           )
        })}
    </div>
  );
};

export default Chat;