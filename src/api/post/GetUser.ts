import axios from "axios";

const GetUser = async (sub: string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/sub`, {
            params: {sub: sub},
        });
        return response.data;
    } catch (error) {
        console.error('에러 발생', error);
    }
}

export default GetUser;