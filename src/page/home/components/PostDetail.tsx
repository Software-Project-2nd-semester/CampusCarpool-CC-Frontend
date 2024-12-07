import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import GetPostDetail from "../../../api/post/GetPostDetail";
import GetUser from "../../../api/post/GetUser";
import {dateFormat} from "../../../components/dateFormat";
import {ReactComponent as Destination} from "../../../assets/create/createForm/Destination.svg";
import {ReactComponent as Origin} from "../../../assets/create/createForm/Origin.svg";
import {ReactComponent as DirectionArrow} from "../../../assets/create/createForm/DirectionArrow.svg";
import {ReactComponent as Driver} from '../../../assets/create/Driver.svg'
import {ReactComponent as Passenger} from '../../../assets/create/Passenger.svg'
import {ReactComponent as Taxi} from '../../../assets/create/Taxi.svg'
import styled from "styled-components";
import {Button, Footer} from "../../../scss/styled/Common";
import PostReserve from "../../../api/post/PostReserve";
import GetPostReservation from "../../../api/post/GetPostReservation";
import KakaoMap from "../../../components/KakaoMap";
import useKakaoMapStore from "../../../store/kakaoMapStore";
import GetDirection from "../../../api/kakaoMap/GetDirection";

const TagSpan = styled.span<{ $tag: string }>`
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
    width: 20%;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
    margin-bottom: 1rem;
    background-color: ${({$tag}) => {
        switch ($tag) {
            case 'CARPOOL_DRIVER':
                return '#4C3EED';
            case 'CARPOOL_USER':
                return '#01A543';
            case 'TAXI':
                return '#E0CA00';
        }
    }};

    svg {
        width: 30%;
        height: auto;
    }
`;

const MyHr = styled.hr`
    margin: 1rem 0;
    background-color: #C9C9C9;
    height: 2px;
`;

const RequireDiv = styled.div`
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background-color: #4C3EED;
    color: white;
`;

const StyledButton = styled(Button)<{ disabled: boolean }>`
    background-color: ${({disabled}) => (disabled ? '#ccc' : '#4C3EED')};
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
`;

const PostDetail = () => {
    const currentMap = useKakaoMapStore((state) => state.currentMap);
    const [postPolyLine, setPostPolyLine] = useState<any>(null);

    const navigate = useNavigate()
    const {id} = useParams();
    const [postDetailData, setPostDetailData] = useState<any>(null);
    const [postCreateUserInfo, setPostCreateUserInfo] = useState<any>('');
    const [reservePeople, setReservePeople] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const postDetailResult = await GetPostDetail(id);
                    const postReservation = await GetPostReservation(id);
                    const userResult = await GetUser(postDetailResult.sub);
                    setPostDetailData(postDetailResult);
                    setPostCreateUserInfo(userResult);
                    setLoading(false);
                    setReservePeople(postReservation);
                    console.log(postDetailResult);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, []);

    const ClickPostReserve = async (id: number) => {
        try {
            const result = await PostReserve(id);
            console.log(result);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (postDetailData && window.kakao) {
            MarkerMark();
            NewBound();
            FindDirection();
            currentMap.setDraggable(false);
        }
    }, [currentMap]);

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

        const originMarkerPosition = new window.kakao.maps.LatLng(postDetailData.departureLat, postDetailData.departureLng);
        const destinationMarkerPosition = new window.kakao.maps.LatLng(postDetailData.arriveLat, postDetailData.arriveLng);

        createFormMarker(originMarkerPosition, "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png");
        createFormMarker(destinationMarkerPosition, "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png");
    };

    const FindDirection = async () => {
        const startEndPoint = {
            startPoint: {
                x: postDetailData.departureLng,
                y: postDetailData.departureLat,
            },
            endPoint: {
                x: postDetailData.arriveLng,
                y: postDetailData.arriveLat,
            },
        };
        try {
            const result = await GetDirection(startEndPoint);
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
            strokeOpacity: 1,
            strokeStyle: "solid",
        });

        setPostPolyLine(polyline);
        polyline.setMap(currentMap);
    };

    const NewBound = () => {
        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(new window.kakao.maps.LatLng(postDetailData.departureLat, postDetailData.departureLng));
        bounds.extend(new window.kakao.maps.LatLng(postDetailData.arriveLat, postDetailData.arriveLng));

        currentMap.setBounds(bounds);
    };

    const renderTag = () => {
        switch (postDetailData?.tag) {
            case 'CARPOOL_DRIVER':
                return <TagSpan $tag="CARPOOL_DRIVER"><Driver/> 운전자</TagSpan>;
            case 'CARPOOL_USER':
                return <TagSpan $tag="CARPOOL_USER"><Passenger/> 탑승자</TagSpan>;
            case 'TAXI':
                return <TagSpan $tag="TAXI"><Taxi/> 택시</TagSpan>;
            default:
                return null;
        }
    };

    const isCreatePeople = () => {
        const userSub = sessionStorage.getItem('sub');
        return postDetailData.sub === userSub;
    };

    const isUserReserved = () => {
        const userSub = sessionStorage.getItem('sub');
        return reservePeople?.some((person: any) => person.sub === userSub);
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <>
            <section className='flex justify-between'>
                {renderTag()}
                <button onClick={() => {
                    navigate(`/review/write/${id}`)
                }} className='bg-blue-700 py-2 text-white px-2 rounded-xl'>리뷰쓰기
                </button>
            </section>
            <section className='font-bold text-2xl'>
                {postDetailData.title}
            </section>
            <section className='font-medium text-l'>
                {dateFormat(postDetailData.departureAt)}
            </section>
            <MyHr/>
            <section>
                <div className="flex gap-x-3 font-bold text-lg items-center">
                    <Origin/>
                    <span>{postDetailData.departurePlaceName}</span>
                </div>
                <DirectionArrow
                    className="my-3"
                />
                <div className="flex gap-x-3 font-bold text-lg items-center">
                    <Destination/>
                    <span>{postDetailData.arrivePlaceName}</span>

                </div>
            </section>
            <MyHr/>
            <section>
                <div className='mb-4'>
                    <h5 className='font-bold'>이동설명</h5>
                    <p>{postDetailData.content}</p>
                </div>
                <div className='mb-4'>
                    <h5 className='font-bold'>탑승 요구사항</h5>
                    <div className='flex gap-x-3'>
                        {postDetailData.socialCarpool ? <RequireDiv>성별무관</RequireDiv> : <RequireDiv>동성만</RequireDiv>}
                        {postDetailData.sameSex ? <RequireDiv>활발하게</RequireDiv> : <RequireDiv>조용히</RequireDiv>}
                    </div>
                </div>
                <div className='mb-4 flex justify-between'>
                    <h5 className='font-bold'>현재인원/최대인원</h5>
                    <span> {reservePeople.length}석 / {postDetailData.maximumPeople}석</span>
                </div>
                {postDetailData.tag === 'CARPOOL_DRIVER' && (
                    <div className='mb-4'>
                        <h5 className='font-bold'>차량정보</h5>
                        <p>{postDetailData.carInfo}</p>
                    </div>
                )}
                {postDetailData.tag === 'TAXI' && (
                    <>
                        <div className='mb-4 flex justify-between'>
                            <h5 className='font-bold'>택시 예상 요금</h5>
                            <p>{postDetailData.expectBill} 원</p>
                        </div>
                        <div className='mb-4 flex justify-between'>
                            <h5 className='font-bold'>1인당 지불할 예상 금액</h5>
                            <p>{~~(postDetailData.expectBill / postDetailData.maximumPeople)} 원</p>
                        </div>
                    </>
                )}
            </section>
            <section>
                <KakaoMap/>
            </section>
            <MyHr/>
            <section>
                <h5 className='font-bold'>작성자</h5>
                <div>
                    {postCreateUserInfo.nickname}
                </div>
            </section>
            <Footer className='flex gap-x-3'>
                {!isCreatePeople() && (
                    <StyledButton onClick={() => {
                        ClickPostReserve(postDetailData.id)
                    }} disabled={isUserReserved()}
                    >{isUserReserved() ? '예약 완료' : '예약하기'}</StyledButton>
                )}
                <Button onClick={() => {
                    navigate(`/chatroom/${postDetailData.id}`)
                }}>채팅하기</Button>
            </Footer>
        </>
    );
};

export default PostDetail;