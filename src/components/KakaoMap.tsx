import {useEffect, useRef} from "react";
import useKakaoMapStore from "../store/kakaoMapStore";
import User from '../assets/create/User.svg';

declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoMap = () => {
    // 현재 위치
    console.log("랜더링");
    const mapRef = useRef<HTMLDivElement>(null);
    const location = useKakaoMapStore((state) => state.location);
    const setLocation = useKakaoMapStore((state) => state.setLocation);
    const setCurrentMap = useKakaoMapStore((state) => state.setCurrentMap);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_KAKAO_MAP_JS_API_KEY;
        if (window.kakao && window.kakao.maps) {
            return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => window.kakao.maps.load(InitializeMap);
        document.body.appendChild(script);
        GetLocation();

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            InitializeMap();
        }
    }, [location]);

    const InitializeMap = () => {
        if (!mapRef.current) return;

        const options = {
            center: new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude
            ),
            level: 3,
            draggable: true,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        setCurrentMap(map);

        const markerImageSrc = User;
        const markerImageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

        const markerPosition = new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
        );
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
        });

        marker.setMap(map);

        mapRef.current.addEventListener("touchmove", preventScroll);
    };

    // 현재위치 받아오기
    const GetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(success, error, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 10000,
            });
        }
    }

    // 현재위치 받아오기 성공
    const success = (position: any) => {
        console.log("성공");
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    };

    // 현재위치 받아오기 실패
    const error = () => {
        console.log("위치 받기 실패");
    };

    const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
    };

    return <div ref={mapRef} style={{height: "400px"}}></div>;
};

export default KakaoMap;
