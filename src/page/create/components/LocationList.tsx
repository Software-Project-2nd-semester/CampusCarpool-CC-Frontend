import styled from "styled-components";
import tw from "twin.macro";
import { Button, StyledH3, Footer, Header } from "../../../scss/styled/Common";
import { ReactComponent as Cancel } from "../../../assets/layout/header/Cancel.svg";
import { useEffect, useState } from "react";
import useKakaoMapStore from "../../../store/kakaoMapStore";
import KakaoMap from "../../../components/KakaoMap";

interface OwnProps {
  type: string;
  setOpenLocationList: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; type: string }>
  >;
}

const LocationListModal = styled.div`
  ${tw`fixed bg-white w-screen h-screen left-0 top-0 py-20 px-5 z-20`}

  @media (min-width: 500px) {
    transform: translateX(-50%);
    left: 50%;
    width: 430px;
  }
`;

const ModalFooter = styled(Footer)`
  ${tw`z-20`}
`;

const SubmitButton = styled(Button)`
  ${tw`text-2xl`}
`;

const LocationList = ({ type, setOpenLocationList }: OwnProps) => {
  const currentMap = useKakaoMapStore((state) => state.currentMap);
  const startEndPoint = useKakaoMapStore((state) => state.startEndPoint);
  const setStartEndPoint = useKakaoMapStore((state) => state.setStartEndPoint);
  const startEndMarker = useKakaoMapStore((state) => state.startEndMarker);
  const setStartEndMarker = useKakaoMapStore(
    (state) => state.setStartEndMarker
  );

  const [keyWord, setKeyWord] = useState<string>("");
  const [placeList, setPlaceList] = useState<any[]>([]);

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

    const isOrigin = type === "origin";
    setStartEndPoint(newPoint, isOrigin);
    NewCenter(newPoint.y, newPoint.x);
  };

  const NewCenter = (centerY: number, centerX: number) => {
    // 지도 중심 이동
    const newCenter = new window.kakao.maps.LatLng(centerY, centerX);

    currentMap.panTo(newCenter);
  };

  // 출발지, 도착지 아이콘 생성 및 이동
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder(); // Geocoder 객체 생성

    const createListMarker = (point: any, isOrigin: boolean) => {
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

    if (type === "origin") {
      // 출발지 마커 생성 및 업데이트
      if (startEndPoint.startPoint.x) {
        if (startEndMarker.startMarker) {
          startEndMarker.startMarker.setMap(null);
        }
        NewCenter(startEndPoint.startPoint.y, startEndPoint.startPoint.x);

        const newStartMarker = createListMarker(startEndPoint.startPoint, true);
        setStartEndMarker(newStartMarker, true);
      }
    } else {
      // 도착지 마커 생성 및 업데이트
      if (startEndPoint.endPoint.x) {
        if (startEndMarker.endMarker) {
          startEndMarker.endMarker.setMap(null);
        }
        NewCenter(startEndPoint.endPoint.y, startEndPoint.endPoint.x);

        const newEndMarker = createListMarker(startEndPoint.endPoint, false);
        setStartEndMarker(newEndMarker, false);
      }
    }
  }, [startEndPoint, currentMap]);

  return (
    <LocationListModal>
      <Header>
        <button
          onClick={() => {
            setOpenLocationList({ isOpen: false, type: "" });
          }}
          className="my-auto"
        >
          <Cancel />
        </button>
      </Header>
      <StyledH3>
        {type === "origin" ? "출발지가 어디신가요?" : "목적지가 어디신가요?"}
      </StyledH3>
      <KakaoMap />
      <input
        type="text"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder={type === "origin" ? "출발지 검색" : "도착지 검색"}
      />
      <button onClick={() => { SearchPlaces(keyWord) }}>검색하기</button>
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
      <ModalFooter>
        <SubmitButton
          onClick={() => {
            setOpenLocationList({ isOpen: false, type: "" });
          }}
        >
          확인
        </SubmitButton>
      </ModalFooter>
    </LocationListModal>
  );
};

export default LocationList;
