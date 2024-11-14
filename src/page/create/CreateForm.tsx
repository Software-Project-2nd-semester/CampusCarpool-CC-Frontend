import {useEffect, useState} from "react";
import {Button, StyledH3, Footer} from "../../scss/styled/Common";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import {ReactComponent as Infomation} from "../../assets/create/createForm/Infomation.svg";
import {ReactComponent as RightArrow} from "../../assets/create/createForm/RightArrow.svg";
import {ReactComponent as Calendar} from "../../assets/create/createForm/Calendar.svg";
import {ReactComponent as Destination} from "../../assets/create/createForm/Destination.svg";
import {ReactComponent as Origin} from "../../assets/create/createForm/Origin.svg";
import {ReactComponent as DirectionArrow} from "../../assets/create/createForm/DirectionArrow.svg";
import MaximumPeople from "./components/MaximumPeople";
import LocationList from "./components/LocationList";
import DateSettingModal from "./components/DateSettingModal";
import useKakaoMapStore from "../../store/kakaoMapStore";
import GetDirection from "../../api/kakaoMap/GetDirection";
import KakaoMap from "../../components/KakaoMap";
import GetPost from "../../api/post/GetPost";
import CreatePost from "../../api/post/CreatePost";
import {dateFormat} from "../../components/dateFormat";

const SelectButton = styled(Button) <{ $isSelected: boolean }>`
    ${tw`w-1/3 text-base`}
    background-color: ${({$isSelected}) =>
            $isSelected ? "#4C3EED" : "#D0D0D0"};
    color: ${({$isSelected}) => ($isSelected ? "white" : "#A7A7A7")};
`;

const InputButton = styled.button`
    ${tw`flex justify-between items-center w-full`}
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;

const GrayBaseP = styled.p`
    ${tw`text-gray-400 text-base`}
`;

const TextArea = styled.textarea`
    width: 100%;
`;

const MtSection = styled.section`
    ${tw`mt-8`};
`;

const TaxiSection = styled(MtSection) <{ $isSelected: boolean }>`
    ${tw`flex justify-between`}
    color: ${({$isSelected}) => ($isSelected ? "black" : "#A7A7A7")};
`;

const CreateForm = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const category = location.state as string;

    const startEndPoint = useKakaoMapStore((state) => state.startEndPoint);
    const setStartEndPoint = useKakaoMapStore((state) => state.setStartEndPoint);
    const currentMap = useKakaoMapStore((state) => state.currentMap);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [openDateSettingModal, setOpenDateSettingModal] = useState<boolean>(false);
    const [maximumPeople, setMaximumPeople] = useState<number>(5);
    const [sameSex, setSameSex] = useState<boolean>(true);
    const [socialCarpoolMode, setSocialCarpoolMode] = useState<boolean>(true);
    const [carInfo, setCarInfo] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [expectBill, setExpectBill] = useState<number>(0);
    const [openLocationList, setOpenLocationList] = useState<{
        isOpen: boolean;
        type: string;
    }>({
        isOpen: false,
        type: "",
    });
    const [currentPolyline, setCurrentPolyline] = useState<any>(null);

    const ClickCreatePost = async () => {
        const postData = {
            sub: sessionStorage.getItem('sub'),
            tag: category,
            title: title,
            content: content,
            departureAt: date,
            departureLat: startEndPoint.startPoint.y,
            departureLng: startEndPoint.startPoint.x,
            arriveLat: startEndPoint.endPoint.y,
            arriveLng: startEndPoint.endPoint.x,
            sameSex: sameSex,
            socialCarpool: socialCarpoolMode,
            carInfo: carInfo,
            maximumPeople: maximumPeople,
            expectBill: expectBill,
            finish: false,
            departurePlaceName: startEndPoint.startPoint.address_name,
            arrivePlaceName: startEndPoint.endPoint.address_name,
        };
        try {
            const result = await CreatePost(postData);
            setStartEndPoint(null, null);
            console.log(result);
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    //길찾기API Get요청
    useEffect(() => {
        const FindDirection = async () => {
            try {
                if (startEndPoint.startPoint.x && startEndPoint.endPoint.x) {
                    const result = await GetDirection(startEndPoint);

                    if (result) {
                        // const duration = result.routes[0].summary.duration;
                        const taxi = result.routes[0].summary.fare.taxi;

                        DrawLinePath(result);
                        setExpectBill(taxi);
                        MarkerMark();
                        NewBound();
                    }
                }
            } catch (error) {
                // console.error("경로 요청 중 오류 발생:", error);
            }
        };
        if (openLocationList.type === "") {
            FindDirection();
        }
    }, [currentMap]);

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

    const MarkerMark = () => {
        const createFormMarker = (position: any, imageSrc: string) => {
            const markerSize = new window.kakao.maps.Size(50, 45);
            const markerOption = {offset: new window.kakao.maps.Point(15, 43)};
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, markerSize, markerOption);

            return new window.kakao.maps.Marker({
                map: currentMap,
                position,
                image: markerImage,
            });
        };

        const originMarkerPosition = new window.kakao.maps.LatLng(startEndPoint.startPoint.y, startEndPoint.startPoint.x);
        const destinationMarkerPosition = new window.kakao.maps.LatLng(startEndPoint.endPoint.y, startEndPoint.endPoint.x);

        createFormMarker(originMarkerPosition, "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png");
        createFormMarker(destinationMarkerPosition, "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png");
    };

    const NewBound = () => {
        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(new window.kakao.maps.LatLng(startEndPoint.startPoint.y, startEndPoint.startPoint.x));
        bounds.extend(new window.kakao.maps.LatLng(startEndPoint.endPoint.y, startEndPoint.endPoint.x));

        currentMap.setBounds(bounds);
    }

    const OpenLocationList = (type: string) => {
        setOpenLocationList({
            isOpen: !openLocationList.isOpen,
            type: type,
        });
    };

    return (
        <>
            {/* Date선택 모달 */}
            {openDateSettingModal ? (
                <DateSettingModal
                    setDate={setDate}
                    setOpenDateSettingModal={setOpenDateSettingModal}
                />
            ) : null}

            <section>
                <StyledH3>제목</StyledH3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    placeholder="이동의 제목을 정해주세요"
                    className="text-base"
                />
            </section>
            <MtSection>
                <StyledH3>출발시간</StyledH3>
                <InputButton
                    onClick={() => {
                        setOpenDateSettingModal(true);
                    }}
                >
                    <div className="flex gap-x-3">
                        {date ? (
                            <p className="text-base">{dateFormat(date)}</p>
                        ) : (
                            <GrayBaseP>날짜, 시간을 선택해주세요.</GrayBaseP>
                        )}
                        <Calendar/>
                    </div>
                    <RightArrow/>
                </InputButton>
            </MtSection>

            <MtSection>
                <StyledH3>출발지 / 도착지</StyledH3>
                <InputButton
                    onClick={() => {
                        OpenLocationList("origin");
                    }}
                >
                    <div className="flex gap-x-3">
                        <Origin
                            color={
                                startEndPoint.startPoint.address_name ? "black" : "#A7A7A7"
                            }
                        />
                        {startEndPoint.startPoint.address_name ? (
                            <p className="text-base">
                                {startEndPoint.startPoint.address_name}
                            </p>
                        ) : (
                            <GrayBaseP>출발지를 입력해주세요.</GrayBaseP>
                        )}
                    </div>
                    <RightArrow/>
                </InputButton>
                <DirectionArrow
                    className="my-3"
                    color={
                        startEndPoint.startPoint.address_name &&
                        startEndPoint.endPoint.address_name
                            ? "black"
                            : "#A7A7A7"
                    }
                />
                <InputButton
                    onClick={() => {
                        OpenLocationList("destination");
                    }}
                >
                    <div className="flex gap-x-3">
                        <Destination
                            color={startEndPoint.endPoint.address_name ? "black" : "#A7A7A7"}
                        />
                        {startEndPoint.endPoint.address_name ? (
                            <p className="text-base">{startEndPoint.endPoint.address_name}</p>
                        ) : (
                            <GrayBaseP>도착지를 입력해주세요.</GrayBaseP>
                        )}
                    </div>
                    <RightArrow/>
                </InputButton>
            </MtSection>

            {/* 출발지 도착지 검색 모달 */}
            {openLocationList.isOpen ? (
                <LocationList
                    type={openLocationList.type}
                    setOpenLocationList={setOpenLocationList}
                />
            ) : <KakaoMap/>}

            <MtSection>
                <StyledH3>최대인원</StyledH3>
                <MaximumPeople
                    maximumPeople={maximumPeople}
                    setMaximumPeople={setMaximumPeople}
                />
            </MtSection>

            <MtSection>
                <StyledH3>성별선택</StyledH3>
                <div className="flex gap-x-3">
                    <SelectButton
                        onClick={() => {
                            setSameSex(true);
                        }}
                        $isSelected={sameSex}
                    >
                        성별무관
                    </SelectButton>
                    <SelectButton
                        onClick={() => {
                            setSameSex(false);
                        }}
                        $isSelected={!sameSex}
                    >
                        동성만
                    </SelectButton>
                </div>
            </MtSection>

            <MtSection>
                <StyledH3>소셜카풀 여부</StyledH3>
                <div className="flex gap-x-3">
                    <SelectButton
                        onClick={() => {
                            setSocialCarpoolMode(true);
                        }}
                        $isSelected={socialCarpoolMode}
                    >
                        활발하게
                    </SelectButton>
                    <SelectButton
                        onClick={() => {
                            setSocialCarpoolMode(false);
                        }}
                        $isSelected={!socialCarpoolMode}
                    >
                        조용히
                    </SelectButton>
                </div>
                <div className="flex mt-2 items-center gap-x-1">
                    <Infomation/>
                    <i className="text-sm text-gray-400">
                        소셜카풀 : 서로 가볍게 소통하며 가는 모드
                        <br/>
                        조용히 : 조용히 가는 모드
                    </i>
                </div>
            </MtSection>

            {category === "CARPOOL_DRIVER" && (
                <MtSection>
                    <StyledH3>차량 정보</StyledH3>
                    <input
                        type="text"
                        value={carInfo}
                        onChange={(e) => {
                            setCarInfo(e.target.value);
                        }}
                        placeholder="차량 정보를 입력해주세요"
                        className="text-base"
                    />
                </MtSection>
            )}

            <MtSection>
                <StyledH3>이동 설명</StyledH3>
                <TextArea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    rows={3}
                    placeholder="이동에 대한 설명을 적어주세요!자세히 올리면 사용자에게 도움이 됩니다!
                        (예시 : 터미널에 1명 내리고 두정역으로 가요)"
                    className="text-base"
                ></TextArea>
            </MtSection>

            {category === "TAXI" && (
                <>
                    <TaxiSection
                        $isSelected={
                            startEndPoint.startPoint.address_name &&
                            startEndPoint.endPoint.address_name
                        }
                    >
                        <StyledH3>택시 예상 요금</StyledH3>
                        <StyledH3>{expectBill}원</StyledH3>
                    </TaxiSection>
                    <TaxiSection
                        $isSelected={
                            startEndPoint.startPoint.address_name &&
                            startEndPoint.endPoint.address_name
                        }
                    >
                        <StyledH3>1인당 지불할 예상 금액</StyledH3>
                        <StyledH3>{~~(expectBill / maximumPeople)}원</StyledH3>
                    </TaxiSection>
                </>
            )}

            <Footer>
                <SubmitButton onClick={ClickCreatePost}>등록</SubmitButton>
            </Footer>
        </>
    );
};

export default CreateForm;
