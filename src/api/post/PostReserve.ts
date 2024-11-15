import axios from "axios";

const PostReserve = async (id: number) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reservation`, {
            sub: sessionStorage.getItem('sub'),
            articleId: id,
        });
        return response.data;
    } catch (error) {
        console.error('에러 발생', error);
    }
}

export default PostReserve;