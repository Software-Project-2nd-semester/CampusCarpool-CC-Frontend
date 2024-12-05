import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ChatRoom {
  id: number; // 채팅방 id
  articleId: number; // 게시글 id
  title: string; // 제목
  lastMessage: string; // 마지막 메세지 내용
  lastMessageTime: string; // 마지막 메세지 시간
  createdAt: string; // 채팅방 개설시간
}

const Chat = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ChatRoom[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ChatRoom[]>(
          `${process.env.REACT_APP_API_URL}/api/chat/room`,
          {
            params: {
              participantSub: sessionStorage.getItem('sub'),
            },
          }
        );
        setData(response.data);
      } catch (err: any) {
        console.error('Error fetching', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4 p-4">
      {data?.map((room, index) => {
        let time: string = room.lastMessageTime;
        const currentTime: Date = new Date(); // 현재 시간
        const date: Date = new Date(time); // 'time'을 Date 객체로 변환

        // 날짜에 9시간 추가
        date.setHours(date.getHours() + 9);

        // 시간 차이를 밀리초로 구함
        let timeDifferenceInMillis: number = currentTime.getTime() - date.getTime();

        // 밀리초를 분으로 변환
        let timeDifferenceInMinutes: number = timeDifferenceInMillis / 60000;

        // 시간 차이를 올림 처리
        let roundedTimeDifferenceInMinutes = Math.ceil(timeDifferenceInMinutes);

        // createdAt 시간을 9시간 더하는 처리
        let createdAtDate: Date = new Date(room.createdAt); // 'createdAt'을 Date 객체로 변환
        createdAtDate.setHours(createdAtDate.getHours() + 9); // 9시간 더하기

        return (
          <div
            key={index}
            onClick={() => {
              navigate(`/chatroom/${room.articleId}`);
            }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl font-semibold text-gray-800">{room.title}</p>
              <p className="text-sm text-gray-500">
                {roundedTimeDifferenceInMinutes}분 전
              </p>
            </div>
            <p className="text-gray-600 text-sm truncate">{room.lastMessage}</p>
            <div className="mt-2 border-t pt-2 text-gray-400 text-xs">
              {createdAtDate.toLocaleString()} {/* 수정된 createdAt 시간 */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
