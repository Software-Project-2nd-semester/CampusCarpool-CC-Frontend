import React from 'react';
import { useNavigate } from 'react-router-dom';

const Reserve = (prop:any) => {
  const navigate=useNavigate()  
  
  const handleProfile=()=>{
    navigate('/')
  }
  
  return (
    <div className='flex flex-col'>
      {prop.data.map((d:any,index:number)=>{
        return(
          <>
          <div onClick={handleProfile} className='flex justify-between px-4 py-4'
            style={{cursor:'pointer'}}
          >
            <p>{d.nickname}</p>
            <p>{'>'}</p>
          </div>
        <div className="mt-4 mb-4 relative w-[calc(100%+40px)] -left-5 border border-b-10 border-solid border-gray-300"></div>
          </>
        )
      })}
      
    </div>
  );
};

export default Reserve;