import React, {useEffect, useState} from 'react';
import KakaoMap from "../../components/KakaoMap";
import useKakaoMapStore from "../../store/kakaoMapStore";
import PostPoint from '../../assets/map/PostPoint.svg';
import GetDirection from "../../api/kakaoMap/GetDirection";

const Map = () => {
    const currentMap = useKakaoMapStore((state) => state.currentMap);
    const [postPolyLine, setPostPolyLine] = useState<any>(null);

    const postList = [
        {
            startPoint: {address_name: '출발위치1', x: "127.14894257701431", y: "36.833981274461074"},
            endPoint: {address_name: '도착위치1', x: "127.17832701965428", y: "36.83367680902326"},
        },
        {
            startPoint: {address_name: '출발위치2', x: "127.17752805742471", y: "36.83090349722775"},
            endPoint: {address_name: '도착위치2', x: '127.15468113252068', y: '36.81898672152359'},
        },
        {
            startPoint: {address_name: '출발위치3', x: "127.16030154041664", y: "36.826863975586406"},
            endPoint: {address_name: '도착위치3', x: '127.15691178604727', y: '36.81911896536101'},
        },
    ];

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            MarkerMark();
            NewBound();
        }
    }, [currentMap, postPolyLine]);

    const FindDirection = async (postStartEndPoint: any) => {
        try {
            const result = await GetDirection(postStartEndPoint);
            if (result) {
                DrawLinePath(result);
            }
        } catch (error) {
            // console.error("경로 요청 중 오류 발생:", error);
        }
    };

    const DrawLinePath = (data: any) => {
        if (postPolyLine) {
            postPolyLine.setMap(null);
        }

        const postLinePath: any[] = [];

        data.routes[0].sections[0].roads.forEach((router: any) => {
            router.vertexes.forEach((vertex: number, index: number) => {
                if (index % 2 === 0) {
                    postLinePath.push(
                        new window.kakao.maps.LatLng(
                            router.vertexes[index + 1],
                            router.vertexes[index]
                        )
                    );
                }
            });
        });

        const polyline = new window.kakao.maps.Polyline({
            path: postLinePath,
            strokeWeight: 6,
            strokeColor: "#4C3EED",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
        });

        setPostPolyLine(polyline);
        polyline.setMap(currentMap);
    };

    const NewBound = () => {
        const bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0; i < postList.length; i++) {
            bounds.extend(new window.kakao.maps.LatLng(postList[i].startPoint.y, postList[i].startPoint.x));
        }
        currentMap.setBounds(bounds);
    }

    const MapMarker = (position: any) => {
        const markerSize = new window.kakao.maps.Size(45, 35);
        const markerImage = new window.kakao.maps.MarkerImage(PostPoint, markerSize);

        return new window.kakao.maps.Marker({
            map: currentMap,
            position: position,
            image: markerImage,
            clickable: true,
        });
    };

    const MarkerMark = () => {
        for (let i = 0; i < postList.length; i++) {
            const postMarkerPosition = new window.kakao.maps.LatLng(postList[i].startPoint.y, postList[i].startPoint.x);
            const marker = MapMarker(postMarkerPosition);

            window.kakao.maps.event.addListener(marker, 'click', function () {
                FindDirection(postList[i]);
            });
        }
    };

    return (
        <div>
            <KakaoMap/>
        </div>
    );
};

export default Map;