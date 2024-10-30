import React from 'react';
import ProfileImage from '../../assets/user/profile.svg';
//import userStore from '../../store/userStore/user'
const genders=['남성','여성']

const ages=['20대','30대','40대','50대','60대','70대','80대','90대']

const Profile = () => {
  //const { name, nickname, gender, age, bio, setName, setNickname, setGender, setAge, setBio } = userStore();
 // console.log(name)
  return (
    <section className='flex flex-col gap-8'>
      <div>
        <img style={{width:'100px',height:'100px',margin:'0 auto'}}src={ProfileImage} alt='alt'></img>
        <p className='text-center font-bold'>프로필 설정</p>
      </div>
      <div>
        <p>이름</p>
        <input className='border border-solid border-black rounded h-8' type='text'></input>
      </div>
      <div>
        <p>닉네임</p>
        <input className='border border-solid border-black rounded h-8' type='text'></input>
      </div>
      <div>
        <p>성별</p>
        <div>
          {genders.map((gender)=>{
            return(
              <button className=''>{gender}</button>
            )
          })}
        </div>
      </div>
      <div>
        <p>나이</p>
        <div>
          {ages.map((age)=>{
            return(
              <button>{age}</button>
            )
          })}
        </div>
      </div>
      {/* <input type="file" /> */}
    </section>
  );
};

export default Profile;