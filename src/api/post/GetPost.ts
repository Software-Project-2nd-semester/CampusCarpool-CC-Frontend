import axios from 'axios';

const GetPost = async (tag: string) => {
    try {
        const url = tag
            ? `${process.env.REACT_APP_API_URL}/api/articles/tag`
            : `${process.env.REACT_APP_API_URL}/api/articles`;

        const params = tag ? {tag: tag} : {};

        const response = await axios.get(url, {
            params: params,
        });
        return response.data;
    } catch (error) {
        console.error('에러 발생', error);
    }
};

export default GetPost;