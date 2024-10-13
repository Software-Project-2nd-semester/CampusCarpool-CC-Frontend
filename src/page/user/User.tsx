import React from 'react';
import Profile from '../../assets/user/profile.svg';
import Medal from '../../assets/user/medal.svg';
import Img1 from '../../assets/user/img1.svg';
import Img2 from '../../assets/user/img2.svg';
import Img3 from '../../assets/user/img3.svg';
import Img4 from '../../assets/user/img4.svg';
import Img5 from '../../assets/user/img5.svg';
import Img6 from '../../assets/user/img6.svg';

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
  },
  {
    id:2,
    img:Img2,
    text: '내가쓴글',
  },
  {
    id:3,
    img:Img3,
    text: '내 예약',
  },
  {
    id:4,
    img:Img4,
    text: '작성한 후기',
  },
  {
    id:5,
    img:Img5,
    text: '받은후기',
  },
  {
    id:6,
    img:Img6,
    text:'공지사항' ,
  },
]

const User = () => {
 
  return (
    <div className='my-wrapper'>
      <div className='con1'>
        <div><img src={user.profile} alt='alt'></img></div>
        <div>
          <div className='nick'>{user.nickname}</div>
          <div className='intro'>{user.intro}</div>
        </div>
      </div>
      <div className='border'></div>
      <div className='con2'>
        <div className='scorebox'>
          <div  className='score'style={{fontSize:'14px'}}>
            <div>매너점수</div>
            <div style={{display:'flex',fontSize:'12px'}}><img style={{width:'16px',height:'16px'}}src={Medal} alt='alt'/><span>{user.score}점</span></div>
          </div>
          <div className='rank'style={{fontSize:'16px'}}>
            {user.nickname}님의 매너 티어는 <br></br>{user.rank}입니다
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
                
              };
            } else if (index === 2) {
              boxStyle = {
                borderBottom: '1px solid #d4d4d4',
              };
            } else if (index === 3 || index === 4) {
              boxStyle = {
                borderRight: '1px solid #d4d4d4',
              };
            }

            return(
              <div className='box' style={boxStyle}>
                <img style={{width:'30px',height:'30px'}}src={box.img} alt='alt'></img>
                <p>{box.text}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='border' style={{marginTop:'8px'}}></div>
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
        <div className='text-con'>
          <div className='text'>로그아웃</div>
          <div className='arrow'>{'>'}</div>
        </div>
      </div>
    </div>
  );
};

export default User;