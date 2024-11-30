import React, {useEffect, useMemo, useState} from 'react';
import KakaoMap from "../../components/KakaoMap";
import useKakaoMapStore from "../../store/kakaoMapStore";
import PostPoint from '../../assets/map/PostPoint.svg';
import GetDirection from "../../api/kakaoMap/GetDirection";
import styled from "styled-components";
import GetPost from "../../api/post/GetPost";
import {getDistanceFromLatLonInKm} from "./components/calculateDistance";

interface Post {
    id: number;
    sub: string;
    content: string;
    departureAt: string;
    tag: string;
    departureLat: number;
    departureLng: number;
    arriveLat: number;
    arriveLng: number;
    sameSex: boolean;
    socialCarpool: boolean;
    maximumPeople: number;
    carInfo: string;
    expectBill: number;
    finish: boolean;
    departurePlaceName: string;
    arrivePlaceName: string;
    startPoint: {
        x: number;
        y: number;
    };
    endPoint: {
        x: number;
        y: number;
    };
}

const MapPageWrapper = styled.div`
    height: calc(100vh - 160px);
`;

const PostInfoWrapper = styled.div`

`;

const PostInfoId = styled.div``;
const PostInfoOrigin = styled.div``;
const PostInfoDestination = styled.div``;

const Map = () => {
    const currentMap = useKakaoMapStore((state) => state.currentMap);
    const location = useKakaoMapStore((state) => state.location);
    // latitude, longitude
    const [postPolyLine, setPostPolyLine] = useState<any>(null);
    const [postInfo, setPostInfo] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const [endMarker, setEndMarker] = useState<any>(null);
    const [postList, setPostList] = useState<any>([]);
    console.log(postList);

    useEffect(() => {
        const GetPostList = async () => {
            try {
                const result = await GetPost('');
                const formattedResult = result.map((post: Post) => ({
                    ...post,
                    startPoint: {
                        x: post.departureLng,
                        y: post.departureLat,
                    },
                    endPoint: {
                        x: post.arriveLng,
                        y: post.arriveLat,
                    }
                }));
                setPostList(formattedResult);
            } catch (error) {
                console.log(error);
            }
        }
        GetPostList();
    }, []);

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            MarkerMark();
            // NewBound();
        }
    }, [currentMap, postPolyLine, postList]);

    const FindDirection = async (postStartEndPoint: any) => {
        console.log(postStartEndPoint)
        try {
            const result = await GetDirection(postStartEndPoint);
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
        for (let i = 0; i < postList.length; i++) {
            bounds.extend(new window.kakao.maps.LatLng(postList[i].startPoint.y, postList[i].startPoint.x));
        }
        currentMap.setBounds(bounds);
    };

    const createMarker = (position: any, imageSrc: string, size: any) => {
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, size);
        return new window.kakao.maps.Marker({
            map: currentMap,
            position,
            image: markerImage,
            clickable: true,
        });
    };

    const MarkerMark = () => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);

        postList.forEach((post: Post) => {
            const distance = getDistanceFromLatLonInKm(
                location.latitude,
                location.longitude,
                post.startPoint.y,
                post.startPoint.x,
            );

            if (distance <= 1) {
                const startPosition = new window.kakao.maps.LatLng(post.startPoint.y, post.startPoint.x);
                const endPosition = new window.kakao.maps.LatLng(post.endPoint.y, post.endPoint.x);

                const startMarker = createMarker(startPosition, PostPoint, new window.kakao.maps.Size(45, 35));

                window.kakao.maps.event.addListener(startMarker, 'click', function () {
                    FindDirection(post);
                    setPostInfo(post);

                    if (endMarker) endMarker.setMap(null);
                    const endMarker1 = createMarker(endPosition, "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png", new window.kakao.maps.Size(45, 35));
                    setEndMarker(endMarker1);
                });
                setMarkers(prevMarkers => [...prevMarkers, startMarker]);
            }

        });
    };

    return (
        <MapPageWrapper>
            <h1 className='text-2xl text-center mb-2'>근처 카풀 위치를 찾아보세요!</h1>
            <KakaoMap/>
            <PostInfoWrapper>
                {postInfo && (
                    <>
                        <PostInfoId>게시글 아이디 : {postInfo.id}</PostInfoId>
                        <PostInfoOrigin>{postInfo.departurePlaceName}</PostInfoOrigin>
                        <PostInfoDestination>{postInfo.arrivePlaceName}</PostInfoDestination>
                    </>
                )}
            </PostInfoWrapper>
        </MapPageWrapper>
    );
};

export default Map;