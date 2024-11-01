import React from 'react';
import { useEffect, useState } from 'react';
import ProfileImage from '../../assets/user/profile.svg';
import { useNavigate } from 'react-router-dom';
//import userStore from '../../store/userStore/user'
const genders=['남성','여성']
const ages=['20대','30대','40대','50대','60대','70대','80대','90대']

const Profile = () => {
//const { name, nickname, gender, age, bio, setName, setNickname, setGender, setAge, setBio } = userStore();
//console.log(name)
 const navigate=useNavigate()

 //나중에 GET할때 사용예정
 //const [data, setData] = useState([]);
 //const [loading, setLoading] = useState(true);
 //const [error, setError] = useState('');
 
//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // GET 요청 보내기
//       const response = await axios.get('');
//       setData(response.data); // 응답 데이터 설정
//     } catch (err) {
//       setError('데이터를 가져오는 데 오류가 발생했습니다.'); // 오류 처리
//     } finally {
//       setLoading(false); // 로딩 상태 업데이트
//     }
//   };

//   fetchData(); // 데이터 가져오기 함수 호출
// }, []);

//  if (loading) {
//   return <p>로딩 중...</p>;
// }

// if (error) {
//   return <p>{error}</p>;
// }


  return (
    <section>
      <form className='flex flex-col gap-8' onSubmit={()=>{
        navigate('/user')
      }}>
        <div>
          <img style={{width:'100px',height:'100px',margin:'0 auto'}}src={ProfileImage} alt='alt'></img>
          <p className='text-center font-bold'>프로필 설정</p>
        </div>
        <div>
          <p>이름</p>
          <input className='pl-2 border border-solid border-black rounded h-8 w-full' type='text'></input>
        </div>
        <div>
          <p>닉네임</p>
          <input className='pl-2 border border-solid border-black rounded h-8 w-full' type='text'></input>
        </div>
        <div>
          <p>성별</p>
          <div className='flex gap-4'>
            {genders.map((gender)=>{
              return(
                <button type='button' className='px-8 py-2 bg-[#D0D0D0] text-[#A7A7A7] rounded'>{gender}</button>
              )
            })}
          </div>
        </div>
        <div>
          <p>나이</p>
          <div className='flex flex-wrap gap-2'>
            {ages.map((age)=>{
              return(
                <button type='button' className='px-8 py-2 bg-[#D0D0D0] text-[#A7A7A7] rounded' >{age}</button>
              )
            })}
          </div>
        </div>
        {/* <input type="file" /> */}
        <div className='w-screen h-16 px-8 py-2 fixed bottom-0 left-0 border-solid border-t-2 border-black'>
            <button type='submit' className='w-full  h-full inline-block  bg-blue-600 text-white rounded'>저장하기</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;