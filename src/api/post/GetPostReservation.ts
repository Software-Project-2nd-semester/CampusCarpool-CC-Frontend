import axios from 'axios';

const GetPostReservation = async (articleId: string) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/api/reservation/article-id`;

        const response = await axios.get(url, {
            params: {articleId: articleId},
        });
        return response.data;
    } catch (error) {
        console.error('에러 발생', error);
    }
};

export default GetPostReservation;