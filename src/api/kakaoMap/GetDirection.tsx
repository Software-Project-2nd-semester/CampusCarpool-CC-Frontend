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

        console.log(response.data);

        const data = response.data;
        data.routes[0].sections[0].roads.forEach((router: any) => {
            router.vertexes.forEach((vertex: number, index: number) => {
                if (index % 2 === 0) {
                    linePath.push(new window.kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
                }
            });
        });

        const polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: '#ff0000',
            strokeOpacity: 0.5,
            strokeStyle: 'solid',
        });

        polyline.setMap(currentMap);
        return polyline;
    } catch (error) {
        console.error('Error fetching directions:', error);
    }
};

export default GetDirection;