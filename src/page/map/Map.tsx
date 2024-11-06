import React, {useEffect} from 'react';
import KakaoMap from "../../components/KakaoMap";
import useKakaoMapStore from "../../store/kakaoMapStore";
import PostPoint from '../../assets/map/PostPoint.svg';

const Map = () => {
    const currentMap = useKakaoMapStore((state) => state.currentMap);

    const postList = [
        {x: "127.14894257701431", y: "36.833981274461074"},
        {x: "127.17832701965428", y: "36.83367680902326"},
        {x: "127.1556340253515", y: "36.819093611280394"},
    ];

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            MarkerMark();
            NewBound();
        }
    }, [currentMap]);

    const NewBound = () => {
        const bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0; i < postList.length; i++) {
            bounds.extend(new window.kakao.maps.LatLng(postList[i].y,postList[i].x));
        }
        currentMap.setBounds(bounds);
    }

    const createFormMarker = (position: any) => {
        const markerSize = new window.kakao.maps.Size(45, 35);
        const markerImage = new window.kakao.maps.MarkerImage(PostPoint, markerSize);

        return new window.kakao.maps.Marker({
            map: currentMap,
            position: position,
            image: markerImage,
        });
    };

    const MarkerMark = () => {
        for (let i = 0; i < postList.length; i++) {
            const postMarkerPosition = new window.kakao.maps.LatLng(postList[i].y, postList[i].x);
            createFormMarker(postMarkerPosition);
        }
    };

    return (
        <div>
            <KakaoMap/>
        </div>
    );
};

export default Map;