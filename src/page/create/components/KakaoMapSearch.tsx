import { useEffect, useState } from "react";
import GetDirection from "../../../api/kakaoMap/GetDirection";
import useKakaoMapStore from "../../../store/kakaoMapStore";
import KakaoMap from "../../../components/KakaoMap";

declare global {
  interface Window {
    kakao: any;
  }
}

interface OwnProps {
  type: string;
}

const KakaoMapSearch = ({ type }: OwnProps) => {
  const startEndPoint = useKakaoMapStore((state) => state.startEndPoint);
  const setStartEndPoint = useKakaoMapStore((state) => state.setStartEndPoint);
  const currentMap = useKakaoMapStore((state) => state.currentMap);
  const startEndMarker = useKakaoMapStore((state) => state.startEndMarker);
  const setStartEndMarker = useKakaoMapStore(
    (state) => state.setStartEndMarker
  );
  const setTaxiCharge = useKakaoMapStore((state) => state.setTaxiCharge);

  const [keyWordStart, setKeyWordStart] = useState<string>("");
  const [keyWordEnd, setKeyWordEnd] = useState<string>("");
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [currentPolyline, setCurrentPolyline] = useState<any>(null);

  //길찾기API Get요청
  useEffect(() => {
    const FindDirection = async () => {
      try {
        if (startEndPoint.startPoint.x && startEndPoint.endPoint.x) {
          const result = await GetDirection(startEndPoint);

          if (result) {
            const duration = result.routes[0].summary.duration;
            const taxiCharge = result.routes[0].summary.fare.taxi;

            DrawLinePath(result);
            setTaxiCharge(taxiCharge);
          }
        }
      } catch (error) {
        // console.error("경로 요청 중 오류 발생:", error);
      }
    };

    FindDirection();
  }, [startEndPoint, currentMap]);

  const DrawLinePath = (data: any) => {
    if (currentPolyline) {
      currentPolyline.setMap(null);
    }

    const linePath: any[] = [];

    data.routes[0].sections[0].roads.forEach((router: any) => {
      router.vertexes.forEach((vertex: number, index: number) => {
        if (index % 2 === 0) {
          linePath.push(
            new window.kakao.maps.LatLng(
              router.vertexes[index + 1],
              router.vertexes[index]
            )
          );
        }
      });
    });

    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 6,
      strokeColor: "#4C3EED",
      strokeOpacity: 0.8,
      strokeStyle: "solid",
    });

    setCurrentPolyline(polyline);
    polyline.setMap(currentMap);
  };

  // 검색 실행 함수
  const SearchPlaces = (keyWord: string) => {
    const ps = new window.kakao.maps.services.Places();

    if (!(!keyWord || keyWord.trim() === "" || !currentMap)) {
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
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  const DisplayPlaces = (places: any) => {
    // 장소 목록 추가
    setPlaceList(places);
    NewCenter(places[0].y, places[0].x);
  };

  const UpdateStartEndPoint = (place: any) => {
    const newPoint = {
      address_name: place.address_name,
      x: place.x,
      y: place.y,
    };
    
    const isOrigin = (type === 'origin');
    setStartEndPoint(newPoint, isOrigin);
    NewCenter(newPoint.y, newPoint.x);
  };

  const NewCenter = (centerY: number, centerX: number) => {
    // 지도 중심 이동
    const newCenter = new window.kakao.maps.LatLng(centerY, centerX);

    currentMap.setCenter(newCenter);
  };

  // 출발지, 도착지 아이콘 생성 및 이동
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder(); // Geocoder 객체 생성

    const createMarker = (point: any, isOrigin: boolean) => {
      const markerSrc = isOrigin
        ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png"
        : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png";
      const markerSize = new window.kakao.maps.Size(50, 45);
      const markerOption = { offset: new window.kakao.maps.Point(15, 43) };
      const markerImage = new window.kakao.maps.MarkerImage(
        markerSrc,
        markerSize,
        markerOption
      );

      const markerPosition = new window.kakao.maps.LatLng(point.y, point.x);

      const newMarker = new window.kakao.maps.Marker({
        map: currentMap,
        position: markerPosition,
        draggable: true,
        image: markerImage,
      });

      // 드래그 끝났을 때 이벤트 처리
      window.kakao.maps.event.addListener(newMarker, "dragend", function () {
        const latlng = newMarker.getPosition(); // 마커의 새 좌표 가져오기
        // 좌표 -> 주소 변환
        geocoder.coord2Address(
          latlng.getLng(),
          latlng.getLat(),
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              const newPoint = {
                address_name: address, 
                x: latlng.getLng(),
                y: latlng.getLat(),
              };
              
              setStartEndPoint(newPoint, isOrigin);
            }
          }
        );
      });

      return newMarker;
    };
    
    // 출발지 마커 생성 및 업데이트
    if (startEndPoint.startPoint.x) {
      if (startEndMarker.startMarker) {
        startEndMarker.startMarker.setMap(null);
      }
      
      NewCenter(startEndPoint.startPoint.y, startEndPoint.startPoint.x);
      const newStartMarker = createMarker(startEndPoint.startPoint, true);
      setStartEndMarker(newStartMarker, true);
    }

    // 도착지 마커 생성 및 업데이트
    if (startEndPoint.endPoint.x) {
      if (startEndMarker.endMarker) {
        startEndMarker.endMarker.setMap(null);
      }
      
      NewCenter(startEndPoint.endPoint.y, startEndPoint.endPoint.x);
      const newEndMarker = createMarker(startEndPoint.endPoint, false);
      setStartEndMarker(newEndMarker, false);
    }
  }, [startEndPoint, currentMap]);

  return (
    <div>
      <KakaoMap />
      {type === "origin" ? (
        <>
          <input
            type="text"
            value={keyWordStart}
            onChange={(e) => setKeyWordStart(e.target.value)}
            placeholder="출발지 검색"
          />
          <button
            onClick={() => {
              SearchPlaces(keyWordStart);
            }}
          >
            검색하기
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={keyWordEnd}
            onChange={(e) => setKeyWordEnd(e.target.value)}
            placeholder="도착지 검색"
          />
          <button
            onClick={() => {
              SearchPlaces(keyWordEnd);
            }}
          >
            검색하기
          </button>
        </>
      )}
      <ul>
        {placeList.map((place, idx) => (
          <li
            key={idx}
            onClick={() => {
              UpdateStartEndPoint(place);
            }}
          >
            {place.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMapSearch;
