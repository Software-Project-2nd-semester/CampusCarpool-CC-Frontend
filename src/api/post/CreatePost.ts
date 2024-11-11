import axios from "axios";

const CreatePost = async (postData: any) => {
    console.log(postData)
    try {

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/article`, {
            ...postData
        });
        return response.data;
    } catch (error) {
        console.error('에러 발생', error);
    }
}

export default CreatePost;