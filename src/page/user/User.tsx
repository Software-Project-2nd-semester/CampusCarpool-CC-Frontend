import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/user/profile.svg';
import Medal from '../../assets/user/medal.svg';
import Img1 from '../../assets/user/img1.svg';
import Img2 from '../../assets/user/img2.svg';
import Img3 from '../../assets/user/img3.svg';
import Img4 from '../../assets/user/img4.svg';
import Img5 from '../../assets/user/img5.svg';
import Img6 from '../../assets/user/img6.svg';
import userStore from '../../store/userStore/user';


const user={
  profile:Profile,
  nickname:'우주최강코딩용사',
  intro:'안녕하세요 제 이름은 우주최강코딩용사입니다 잘 부탁드립니다~~!!',
  score:74,
  rank:'다이아',
}


const boxes=[
  {
    id:1,
    img:Img1,
    text:'프로필 수정' ,
    url:"/user/profile"
  },
  {
    id:2,
    img:Img2,
    text: '내가쓴글',
    url:"/user/2"
  },
  {
    id:3,
    img:Img3,
    text: '내 예약',
    url:"/user/3"
  },
  {
    id:4,
    img:Img4,
    text: '작성한 후기',
    url:"/user/4"
  },
  {
    id:5,
    img:Img5,
    text: '받은후기',
    url:"/user/5"
  },
  {
    id:6,
    img:Img6,
    text:'공지사항' ,
    url:"/user/6"
  },
]

const User = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const { nickname,intro,setName,setNickname,setAge,setGender,setIntro} = userStore();

const navigate = useNavigate();

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

const handleLogout=()=>{
  openModal()
}
const handleCheck=()=>{
  navigate('/')
  sessionStorage.removeItem('sub')
  setName('')
  setNickname('')
  setAge('')
  setGender('')
  setIntro('')
}

  return (
    <div className='my-wrapper relative'>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 opacity-50 z-30"></div>
      )}
      {isModalOpen &&<div className='absolute bg-white z-40 w-full top-56 h-40 rounded-2xl'>
                      <div className='font-bold text-center mt-8'>로그아웃</div>
                      <div className='text-gray-500 text-center'>정말 로그아웃 할까요?</div>
                      <div className='flex gap-4 justify-evenly mt-4'>
                        <button onClick={closeModal} className='bg-gray-300 w-32 h-10 text-white rounded-xl'>취소</button>
                        <button onClick={handleCheck} className='bg-blue-500 w-32 h-10 text-white rounded-xl'>확인</button>
                      </div>
                     </div>}
      <div className='con1'>
        <div><img src={user.profile} alt='alt'></img></div>
        <div>
          <div className='nick'>{nickname}</div>
          <div className='intro'>{intro}</div>
        </div>
      </div>
      <div className='border z-10'></div>
      <div className='con2'>
        <div className='scorebox'>
          <div  className='score'style={{fontSize:'14px'}}>
            <div>매너점수</div>
            <div style={{display:'flex',fontSize:'12px'}}><img style={{width:'16px',height:'16px'}}src={Medal} alt='alt'/><span>{user.score}점</span></div>
          </div>
          <div className='rank'style={{fontSize:'16px'}}>
            {nickname}님의 매너 티어는 <br></br>{user.rank}입니다
          </div>
        </div>
        <div className='box-container'style={{display:'flex'}}>
          {boxes.map((box,index)=>{
            let boxStyle = {};

            // 조건에 따라 스타일을 다르게 설정
            if (index === 0 || index === 1) {
              boxStyle = {
                borderRight: '1px solid #d4d4d4',
                borderBottom: '1px solid #d4d4d4',
                cursor:'pointer'
              };
            } else if (index === 2) {
              boxStyle = {
                borderBottom: '1px solid #d4d4d4',
                cursor:'pointer'
              };
            } else if (index === 3 || index === 4) {
              boxStyle = {
                borderRight: '1px solid #d4d4d4',
                cursor:'pointer'
              };
            }else{
              boxStyle={
                cursor:'pointer'
              }}

            return(
              <div className='box' style={boxStyle} onClick={()=>{navigate(box.url)}}>
                <img style={{width:'30px',height:'30px'}}src={box.img} alt='alt'></img>
                <p>{box.text}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='border z-10' style={{marginTop:'8px'}}></div>
      <div className='con3'>
        <div style={{fontWeight:'bold',fontSize:'12px',color:'#8d8d8d',marginTop:'16px'}}>서비스 안내</div>
        <div className='text-con'>
          <div className='text'>자주 묻는 질문</div>
          <div className='arrow'>{'>'}</div>
        </div>
        <div className='text-con'>
          <div className='text'>서비스 이용약관</div>
          <div className='arrow'>{'>'}</div>
        </div>
        <div className='text-con'>
          <div className='text'>알림설정</div>
          <div className='arrow'>{'>'}</div>
        </div>
        <div className='text-con' onClick={handleLogout} style={{cursor:'pointer'}}>
          <div className='text' >로그아웃</div>
          <div className='arrow'>{'>'}</div>
        </div>
      </div>
    </div>
  );
};

export default User;