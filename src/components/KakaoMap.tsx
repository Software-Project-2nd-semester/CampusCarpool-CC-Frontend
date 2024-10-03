import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  // 현재 위치
  const [location, setLocation] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const [keyWord, setKeyWord] = useState('');
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [map1, setMap1] = useState<any>(null);

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

  // 현재위치 받아오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
      });
    }
  }, []);

  // 검색 실행 함수
  const SearchPlaces = () => {
    const ps = new window.kakao.maps.services.Places();

    if (!(!keyWord || keyWord.trim() === '' || !map1)) {
      ps.keywordSearch(keyWord, PlacesSearchCB);
    } else {
      console.log("검색어를 입력해주세요");
    }
  };

  // 검색 콜백 함수
  const PlacesSearchCB = (data: any, status: any, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      DisplayPlaces(data);

    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const DisplayPlaces = (places: any) => {
    // 장소 목록 추가
    setPlaceList(places);
    // 이전 마커 제거
    markers.forEach(marker => marker.setMap(null));

    // 새로운 마커 생성
    const newMarkers = places.map((place: any) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position: position,
        map: map1,
      });
      marker.setMap(map1);
      return marker;
    });
    // 새로운 마커 업데이트
    setMarkers(newMarkers);

    // 지도 중심 이동
    const firstPlace = places[0];
    const newCenter = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);

    map1.setCenter(newCenter);
  }


  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    setMap1(map);

    // 현재 위치 마커
    const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [location]);

  return (
    <div>
      <div id="map" style={{ height: "400px" }}></div>
      <input
        type="text"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="장소 검색"
      />
      <button onClick={SearchPlaces}>검색하기</button>
      <ul>
        {placeList.map((place, idx) => (
          <li key={idx}>
            {place.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMap;
