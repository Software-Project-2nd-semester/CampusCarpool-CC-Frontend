import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import GetPostDetail from "../../../api/post/GetPostDetail";
import {dateFormat} from "../../../components/dateFormat";
import {ReactComponent as Destination} from "../../../assets/create/createForm/Destination.svg";
import {ReactComponent as Origin} from "../../../assets/create/createForm/Origin.svg";
import {ReactComponent as DirectionArrow} from "../../../assets/create/createForm/DirectionArrow.svg";
import {ReactComponent as Driver} from '../../../assets/create/Driver.svg'
import {ReactComponent as Passenger} from '../../../assets/create/Passenger.svg'
import {ReactComponent as Taxi} from '../../../assets/create/Taxi.svg'

import styled from "styled-components";
import {StyledH3} from "../../../scss/styled/Common";

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


const PostDetail = () => {
    const {id} = useParams();
    const [postDetailData, setPostDetailData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const GetPostDetailList = async () => {
            if (id) {
                try {
                    const result = await GetPostDetail(id);
                    setPostDetailData(result);
                    setLoading(false);
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        GetPostDetailList();
    }, []);

    if (loading) return <div>로딩 중...</div>;

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

    return (
        <div>
            <section>
                {renderTag()}
            </section>
            <section className='font-bold text-xl'>
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
                <div className='mb-4'>
                    <h5 className='font-bold'>현재인원/최대인원</h5>
                    <span>잔여 ?석 / {postDetailData.maximumPeople}석</span>
                </div>
                {postDetailData.tag === 'CARPOOL_DRIVER' && (
                    <div className='mb-4'>
                        <h5 className='font-bold'>차량정보</h5>
                        <p>{postDetailData.carInfo}</p>
                    </div>
                )}
            </section>
            <section>
                지도 (나중에 추가)
            </section>
            <MyHr/>
            <section>
                <h5 className='font-bold'>작성자</h5>
                <div>

                </div>
            </section>
        </div>
    );
};

export default PostDetail;