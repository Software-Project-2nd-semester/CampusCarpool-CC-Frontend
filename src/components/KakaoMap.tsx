import { useEffect, useRef } from "react";
import useKakaoMapStore from "../store/kakaoMapStore";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  // 현재 위치
  const location = useKakaoMapStore((state) => state.location);
  const setLocation = useKakaoMapStore((state) => state.setLocation);
  const startEndPoint = useKakaoMapStore((state) => state.startEndPoint);

  const setCurrentMap = useKakaoMapStore((state) => state.setCurrentMap);
  const mapRef = useRef<HTMLDivElement>(null);

  // 현재위치 받아오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
      });
    }
  }, []);

  // 현재위치 받아오기 성공
  const success = (position: any) => {
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

  useEffect(() => {
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

    // 현재 위치 마커
    const markerPosition = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    mapRef.current?.addEventListener("touchmove", preventScroll);

  }, [location]);
  return <div ref={mapRef} style={{ height: "400px" }}></div>;
};

export default KakaoMap;
