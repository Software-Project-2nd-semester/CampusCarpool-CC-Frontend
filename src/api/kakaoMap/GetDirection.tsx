import axios from 'axios';

const GetDirection = async (startEndPoint: any, currentMap: any) => {

    const REST_API_KEY = process.env.REACT_APP_KAKAO_MAP_REST_API_KEY;
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    const origin = `${startEndPoint.startPoint.x},${startEndPoint.startPoint.y}`;
    const destination = `${startEndPoint.endPoint.x},${startEndPoint.endPoint.y}`;

    const linePath: any[] = [];

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
        // 경로 소요 시간
        const duration = data.routes[0].summary.duration;
        // 택시 요금 반환
        const taxiCharge = data.routes[0].summary.fare.taxi;

        data.routes[0].sections[0].roads.forEach((router: any) => {
            router.vertexes.forEach((vertex: number, index: number) => {
                if (index % 2 === 0) {
                    linePath.push(new window.kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
                }
            });
        });

        const polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 6,
            strokeColor: '#4C3EED',
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
        });

        polyline.setMap(currentMap);


        return { polyline, taxiCharge };
    } catch (error) {
        console.error('Error fetching directions:', error);
    }
};

export default GetDirection;