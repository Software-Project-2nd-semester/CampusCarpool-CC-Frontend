import axios from 'axios';

const GetDirection = async (startEndPoint: any) => {

    const REST_API_KEY = process.env.REACT_APP_KAKAO_MAP_REST_API_KEY;
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    const origin = `${startEndPoint.startPoint.x},${startEndPoint.startPoint.y}`;
    const destination = `${startEndPoint.endPoint.x},${startEndPoint.endPoint.y}`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`,
                'Content-Type': 'application/json',
            },
            params: {
                origin: origin,
                destination: destination,
                priority: 'RECOMMEND',
            },
        });
        const data = response.data;
        
        return data;
    } catch (error) {
        console.error('에러 발생', error);
    }
};

export default GetDirection;