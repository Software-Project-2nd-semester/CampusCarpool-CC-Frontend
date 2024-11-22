import React from 'react';
import { useParams } from 'react-router-dom';
import {useState,useEffect,useRef} from 'react'
import axios from 'axios';
import { Client } from '@stomp/stompjs';



const Chatroom = () => {
  const [messages, setMessages] = useState(null);
  const [input, setInput] = useState('');
  const client = useRef(null);
  const { postid } = useParams();
  const [id,setId]=useState('')
  const messagesContainerRef = useRef(null); // 메시지 컨테이너 div를 위한 ref
  // console.log('렌더링')
  //console.log(postid)
  useEffect(()=>{
    console.log('useEffect[]')
    const fetchData = async () => {
      try {
        let id;
        
        //1.chatid 받아오는 작업
        const response1=await axios.post(`${process.env.REACT_APP_API_URL}/api/chat/room/${postid}`);
        // console.log(response1.data.id)
        id=response1.data.id
        setId(id)

        //2.이전 대화글 가져오는 작업
        const response2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chat/room/${id}/messages`
        );
        // console.log(response2.data)
        setMessages(response2.data)

        //3.websocket연결
        const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/ws-stomp`);

        client.current = new Client({
          webSocketFactory: () => socket,
          onConnect: () => {
            console.log('Connected to WebSocket ');

            // 특정 채팅방 구독
            client.current.subscribe(`/room/${id}`, (message) => {
                if (message.body) {
                    try {
                        const parsedMessage = JSON.parse(message.body); // JSON 파싱
                        console.log("Received message:", parsedMessage); // 데이터 확인
                        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
                    } catch (error) {
                        console.error("Failed to parse message:", error);
                    }
                  }
              });
           },
          onStompError: (frame) => {
              console.error('STOMP error', frame);
          },
      });

      client.current.activate();

    

    } catch (err) {
        console.log('error')
      } 
    };
    fetchData();

    return () => {
      if (client.current) {
          client.current.deactivate();
          console.log('out')
      }
  };

  },[])

// 메시지가 추가된 후에 스크롤을 맨 아래로 이동시키는 useEffect
useEffect(() => {
  console.log('useEffect[messages]');

  // 메시지 컨테이너 div의 스크롤을 맨 아래로 이동시킴
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }
}, [messages]); // messages가 변경될 때마다 스크롤을 맨 아래로 이동

  if(messages===null){
    // console.log('loading')
    return<div>loading</div>
  }

  const sendMessage = () => {
    if (client.current && input.trim()) {
        console.log("Sending message:", {
            content: input,
            senderSub: sessionStorage.getItem('sub'), // 전송자 정보
            chatRoomId: id,
        });

        client.current.publish({
            destination: `/send/chat/${id}`, // 메시지 전송 경로
            body: JSON.stringify({
                content: input,
                senderSub: sessionStorage.getItem('sub'), // 전송자 정보
                chatRoomId: id,
            }),
        });

        setInput(''); // 입력값 초기화
    }
};

  return (
    <div className='h-screen'
    >
      <div className='w-full h-2/3 flex flex-col overflow-y-auto' 
        ref={messagesContainerRef}
      >
        {messages.map((msg, index) => {
          const  isMe = (msg.senderSub === sessionStorage.getItem('sub'));
         // console.log(isMe)
         

        return(
          <div key={index} className={`${isMe ? 'self-end' : 'self-start'}   flex flex-col max-w-[80%] m-1 `}>
          {!isMe && <p className=' text-sm'>{msg.nickname}</p> } 
          <p className={`text-lg rounded-xl px-4 py-2 box-content ${isMe ? 'text-white' : 'text-black'} ${isMe ? 'bg-blue-500' : 'bg-gray-200'}`}>
            {msg.content}</p>
          </div>
        )  
        })}
      </div>
      <div className='flex justify-center'>
        <div className='pt-2'>
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className='bg-gray-200 rounded-xl text-xl pl-4'
          />
        </div>
        <button onClick={sendMessage}
          className='text-blue-500 text-4xl'
        >{'>'}</button>
      </div>
    </div>
  );
};

export default Chatroom;