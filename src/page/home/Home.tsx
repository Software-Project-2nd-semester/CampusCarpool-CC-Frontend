import React,{useEffect} from 'react';
import user from '../../store/userStore/user';
import axios from 'axios';

const Home = () => {
  const { name,nickname,age,gender,intro,setName,setNickname,setAge,setGender,setIntro} = user();
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const subValue = urlParams.get('sub');

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/sub`,{
          params: {
            sub: sessionStorage.getItem('sub'),
          }
        });
        console.log(response.data) 
        setName(response.data.name)
        setNickname(response.data.nickname)
        setAge(response.data.age)
        setGender(response.data.sex)
        setIntro(response.data.intro)
      } catch (err) {
        console.log('error')
      }
    };

    if (subValue) {
      sessionStorage.setItem('sub', subValue);
    } else {
      console.log('sub 값이 존재하지 않습니다.');
    }
    
  if(name===''){
    fetchData()
  } 
  }, []); 

  return (
    <div>
      home
    </div>
  );
};

export default Home;