import React,{useState,useEffect} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';

const ReviewWrite = () => {
  const [data,setData]=useState('')
  const {id}=useParams()
  const [nick,setNick]=useState('')
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0); // 상태로 선택된 별점 관리
  const [hovered, setHovered] = useState(null); // 마우스 hover 상태 관리
  const [sub,setSub]=useState('')
  const navigate=useNavigate()

   // 별 클릭 시 실행되는 함수
   const handleClick = (ratingValue) => {
    setRating(ratingValue);
  };

  // 마우스 hover 시 실행되는 함수
  const handleMouseEnter = (ratingValue) => {
    setHovered(ratingValue);
  };

  // 마우스 leave 시 실행되는 함수
  const handleMouseLeave = () => {
    setHovered(null);
  };

  // 별 생성 함수
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hovered || rating); // hover 중일 때 또는 선택한 별점에 따라 색 변경
      stars.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: 'pointer',
            color: isFilled ? 'rgb(220,200,57)' : 'gray', // 노란색(선택/hover) 또는 회색(미선택)
            fontSize: '30px',
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };
  const handleTextChange = (event) => {
    setText(event.target.value); // 입력값을 상태에 저장
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles/id`,{
          params: {
            id: id
          }
        });
         setData(response.data)
         setSub(response.data.sub)


         const response2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/sub`, {
          params: {
            sub: response.data.sub
          },
        });
        setNick(response2.data.nickname)
        

      } catch (err) {
        console.log('error')
      }
    };

    fetchData(); 
  }, []); 


  const getRatingDescription = (rating) => {
    switch (rating) {
      case 1:
        return "VERY_BAD";
      case 2:
        return "BAD";
      case 3:
        return "SO_SO";
      case 4:
        return "GOOD";
      case 5:
        return "VERY_GOOD";
      default:
        return "Invalid rating"; 
    }
  };

  const handleSubmit = async () => {

    

    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        writerSub:sessionStorage.getItem('sub'),
        articleId:id,
        receiverSub:sub,
        rating: getRatingDescription(rating),
        content: text,
      });
      
      navigate('/home')
     
    } catch (error) {
      if(error.status===400){
        alert('이미 리뷰를 작성하였습니다')
      navigate('/home')

      }
    }
  };

  if(!data){
    return(
      <div>loading</div>
    )
  }

  return (
    <div>
      <div className='text-center text-2xl'>{nick}님의 이동은 어떠셨나요?</div>
      <div className='text-center'>{renderStars()}</div>
      <div className='text-center'>별점을 선택해주세요</div>
      <div className='text-center'>선택한 별점: {rating}</div>
      <div>
        <div>내용을 입력해주세요</div>
        <textarea
        value={text} 
        onChange={handleTextChange} 
        placeholder="여기에 텍스트를 입력하세요"
        rows="20"
        cols="30"
        style={{ width: '100%', padding: '10px' }}
        className='bg-gray-400'
      />
      </div>
      <div>
        <button onClick={()=>{handleSubmit()}} className='bg-blue-600 text-white text-2xl rounded-2xl w-full py-4' >작성하기</button>
      </div>
    </div>
  );
};

export default ReviewWrite;