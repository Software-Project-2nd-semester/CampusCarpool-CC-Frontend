import axios from 'axios';

const GetPostDetail = async (id: string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles/id`, {
            params: {id: id},
        });
        return response.data;
    } catch (error) {
        console.error('에러 발생', error);
    }
};

export default GetPostDetail;