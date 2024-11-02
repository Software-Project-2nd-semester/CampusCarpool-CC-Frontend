import React,{useEffect} from 'react';

const Home = () => {
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const subValue = urlParams.get('sub');

    if (subValue) {
      sessionStorage.setItem('sub', subValue);
    } else {
      console.log('sub 값이 존재하지 않습니다.');
    }
  }, []); 

  return (
    <div>
      home
    </div>
  );
};

export default Home;