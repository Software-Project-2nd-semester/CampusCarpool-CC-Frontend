import { useEffect, useState } from "react";
import GetDirection from "../api/kakaoMap/GetDirection";
import useKakaoMapStore from "../store/kakaoMapStore";

declare global {
  interface Window {
    kakao: any;
  }
}

interface OwnProps {
  type: string
}

const KakaoMap = ({ type }: OwnProps) => {
  // 현재 위치
  const location = useKakaoMapStore((state) => state.location);
  const setLocation = useKakaoMapStore((state) => state.setLocation);
  const startEndPoint = useKakaoMapStore((state) => state.startEndPoint);
  const setStartEndPoint = useKakaoMapStore((state) => state.setStartEndPoint);
  const currentMap = useKakaoMapStore((state) => state.currentMap);
  const setCurrentMap = useKakaoMapStore((state) => state.setCurrentMap);
  const startEndMarker = useKakaoMapStore((state) => state.startEndMarker);
  const setStartEndMarker = useKakaoMapStore((state) => state.setStartEndMarker);

  const [keyWordStart, setKeyWordStart] = useState<string>('');
  const [keyWordEnd, setKeyWordEnd] = useState<string>('');
  const [isOrigin, setIsOrigin] = useState<boolean>(true);
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [currentPolyline, setCurrentPolyline] = useState<any>(null);

  //길찾기API Get요청
  useEffect(() => {
    if (startEndPoint.startPoint.x && startEndPoint.endPoint.x) {
      if (currentPolyline) {
        currentPolyline.setMap(null);
      }

      GetDirection(startEndPoint, currentMap).then(newPolyline => {
        setCurrentPolyline(newPolyline);
      });
    }
  }, [startEndPoint, currentMap]);

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
  const SearchPlaces = (keyWord: string, isOrigin: boolean) => {
    setIsOrigin(isOrigin);

    const ps = new window.kakao.maps.services.Places();

    if (!(!keyWord || keyWord.trim() === '' || !currentMap)) {
      ps.keywordSearch(keyWord, PlacesSearchCB);
    } else {
      alert("검색어를 입력해주세요");
    }
  };

  // 검색 콜백 함수
  const PlacesSearchCB = (data: any, status: any) => {
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

    // 지도 중심 이동
    const firstPlace = places[0];
    const newCenter = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);

    currentMap.setCenter(newCenter);
  }

  const preventScroll = (e: TouchEvent) => {
    e.preventDefault();
  };

  const UpdateStartEndPoint = (place: any) => {
    const newPoint = {
      address_name: place.address_name,
      x: place.x,
      y: place.y,
    };

    // 지도 중심 이동
    const newCenter = new window.kakao.maps.LatLng(newPoint.y, newPoint.x);

    currentMap.setCenter(newCenter);
    setStartEndPoint(newPoint, isOrigin);
  }

  // 출발지, 도착지 아이콘 생성 및 이동
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder(); // Geocoder 객체 생성

    if (isOrigin && startEndPoint.startPoint) {
      if (startEndMarker.startMarker) {
        startEndMarker.startMarker.setMap(null);
      }

      const startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png',
        startSize = new window.kakao.maps.Size(50, 45),
        startOption = {
          offset: new window.kakao.maps.Point(15, 43)
        };

      const startImage = new window.kakao.maps.MarkerImage(startSrc, startSize, startOption);

      const startPosition = new window.kakao.maps.LatLng(startEndPoint.startPoint.y, startEndPoint.startPoint.x);

      const newStartMarker = new window.kakao.maps.Marker({
        map: currentMap,
        position: startPosition,
        draggable: true,
        image: startImage,
      });

      // 드래그 끝났을 때 이벤트 처리
      window.kakao.maps.event.addListener(newStartMarker, 'dragend', function () {
        const latlng = newStartMarker.getPosition();  // 마커의 새 좌표 가져오기

        // 좌표 -> 주소 변환
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            const startPoint = {
              address_name: address, // 변환한 주소를 저장
              x: latlng.getLng(),
              y: latlng.getLat(),
            }

            // startEndPoint에 새로운 좌표 및 주소 업데이트
            setStartEndPoint(startPoint, isOrigin);
          }
        });
      });

      setStartEndMarker(newStartMarker, isOrigin);
    }

    if (!isOrigin && startEndPoint.endPoint) {
      if (startEndMarker.endMarker) {
        startEndMarker.endMarker.setMap(null);
      }

      const arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png',
        arriveSize = new window.kakao.maps.Size(50, 45),
        arriveOption = {
          offset: new window.kakao.maps.Point(15, 43)
        };

      const arriveImage = new window.kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);

      const arrivePosition = new window.kakao.maps.LatLng(startEndPoint.endPoint.y, startEndPoint.endPoint.x);

      const newEndMarker = new window.kakao.maps.Marker({
        map: currentMap,
        position: arrivePosition,
        draggable: true,
        image: arriveImage,
      });

      // 도착지 드래그 끝났을 때 이벤트 처리
      window.kakao.maps.event.addListener(newEndMarker, 'dragend', function () {
        const latlng = newEndMarker.getPosition();  // 마커의 새 좌표 가져오기

        // 좌표 -> 주소 변환
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            const endPoint = {
              address_name: address, // 변환한 주소를 저장
              x: latlng.getLng(),
              y: latlng.getLat(),
            }
            // startEndPoint에 새로운 좌표 및 주소 업데이트
            setStartEndPoint(endPoint, isOrigin);

            // setStartEndPoint((prev: any) => ({
            //   ...prev,
            // endPoint: {
            //   address_name: address, // 변환한 주소를 저장
            //   x: latlng.getLng(),
            //   y: latlng.getLat(),
            // },
            // }));
          }
        });
      });

      setStartEndMarker(newEndMarker, isOrigin);
      // setStartEndMarker((prev: any) => ({
      //   ...prev,
      //   endMarker: newEndMarker,
      // }));
    }
  }, [startEndPoint, currentMap, isOrigin]);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
      draggable: true,
    };
    const map = new window.kakao.maps.Map(container, options);
    setCurrentMap(map);

    // 현재 위치 마커
    const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    container?.addEventListener('touchmove', preventScroll);

    return () => {
      container?.removeEventListener('touchmove', preventScroll);
    };

  }, [location]);

  return (
    <div>
      <div id="map" style={{ height: "400px" }}></div>
      {type === 'origin' ?
        <>
          <input
            type="text"
            value={keyWordStart}
            onChange={(e) => setKeyWordStart(e.target.value)}
            placeholder="출발지 검색"
          />
          <button onClick={() => { SearchPlaces(keyWordStart, true) }}>검색하기</button>
        </>
        :
        <>
          <input
            type="text"
            value={keyWordEnd}
            onChange={(e) => setKeyWordEnd(e.target.value)}
            placeholder="도착지 검색"
          />
          <button onClick={() => { SearchPlaces(keyWordEnd, false) }}>검색하기</button>
        </>
      }
      <ul>
        {placeList.map((place, idx) => (
          <li key={idx} onClick={() => { UpdateStartEndPoint(place) }}>
            {place.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMap;  