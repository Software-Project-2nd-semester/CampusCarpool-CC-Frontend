import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [location, setLocation] = useState({
    latitude: 33.450701, 
    longitude: 126.570667, 
  });

  const success = (position:any)=>{
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  const error = () => {
    console.log("위치 받기 실패");
  }
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    
    marker.setMap(map);
  }, [location]); 

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default KakaoMap;
