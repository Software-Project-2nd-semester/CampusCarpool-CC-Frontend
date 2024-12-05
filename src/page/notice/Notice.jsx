import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notice = () => {
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/notice`);
        setNotices(response.data);
      } catch (err) {
        console.log('Error fetching notices');
      }
    };

    fetchNotices();
  }, []);

  if (!notices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">공지사항</h1>
      <div>
        {notices.map((notice, index) => (
          <div className='border border-gray-500 border-solid'>
            <div className='text-xl text-blue-500'>{notice.title}</div>
            <div>{notice.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
