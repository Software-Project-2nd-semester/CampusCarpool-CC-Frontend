import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get('http://ec2-15-164-222-34.ap-northeast-2.compute.amazonaws.com:8080/api/articles/sub',
      {
        headers: {
          sub: sessionStorage.getItem('sub')
        }
      }
     );
    
    return response.data
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};