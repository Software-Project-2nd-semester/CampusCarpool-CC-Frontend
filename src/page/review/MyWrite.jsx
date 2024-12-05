import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userStore from '../../store/userStore/user';
import { useNavigate } from 'react-router-dom';

const MyWrite = () => {
  const [data, setNotices] = useState(null);
  const { nickname } = userStore();
  const navigate=useNavigate()
  console.log(data)
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/written`, {
          params: {
            writerSub: sessionStorage.getItem('sub'),
          },
        });
        setNotices(response.data);
      } catch (err) {
        console.log('Error fetching notices');
      }
    };

    fetchNotices();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // 별을 그리는 함수
  const renderStars = (rating) => {
    let starCount = 0;

    switch (rating) {
      case 'VERY_BAD':
        starCount = 1;
        break;
      case 'BAD':
        starCount = 2;
        break;
      case 'SO_SO':
        starCount = 3;
        break;
      case 'GOOD':
        starCount = 4;
        break;
      case 'VERY_GOOD':
        starCount = 5;
        break;
      default:
        starCount = 0;
    }

    // 별을 다섯 개까지 그리기
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(
          <span key={i} className="text-yellow-500">&#9733;</span> // 채워진 별 (★)
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">&#9733;</span> // 빈 별 (☆)
        );
      }
    }
    return stars;
  };

  // 버튼 색상 결정 함수
  const renderButton = (articleType) => {
    switch (articleType) {
      case 'CARPOOL_DRIVER':
        return (
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
            운전자
          </button>
        );
      case 'CARPOOL_USER':
        return (
          <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors duration-300">
            탑승자
          </button>
        );
      case 'TAXI':
        return (
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition-colors duration-300">
            택시
          </button>
        );
      default:
        return null; 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{nickname}님이 작성한 후기</h1>
      <div className="space-y-6">
        {data.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{review.articleTitle}</h2>
              <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-600">카풀유형</span>
              <div className="mt-2">
                {renderButton(review.articleType)}
              </div>
            </div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-600">남긴 별점</span>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
            </div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-600">내용</span>
              <p className="text-gray-800">{review.content}</p>
            </div>
            <div onClick={()=>{navigate(`/user/profile/${review.receiverSub}`,{state:{sub:review.receiverSub}})}}>
              <button className='text-white bg-blue-500 px-2 py-2 rounded-xl'>게시글 작성자 프로필 보러가기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWrite;
