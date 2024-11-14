import React from 'react';
import styled from "styled-components";
import {dateFormat} from "../../../components/dateFormat";
import {ReactComponent as Origin} from "../../../assets/create/createForm/Origin.svg";
import {ReactComponent as Destination} from "../../../assets/create/createForm/Destination.svg";
import Time from "../../../assets/user/time.svg";

const PostWrapper = styled.li<{ $tag: string }>`
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-weight: 600;
    border: ${({$tag}) => {
        switch ($tag) {
            case '':
                return '2px solid black';
            case 'CARPOOL_DRIVER':
                return '2px solid #4C3EED';
            case 'CARPOOL_USER':
                return '2px solid #01A543';
            case 'TAXI':
                return '2px solid #E0CA00';
        }
    }};
`;


const Post = ({content}: any) => {
    const startDate = dateFormat(content.departureAt);
    const tag = content.tag;

    return (
        <PostWrapper $tag={tag}>
            <h6 className="text-xl mb-2.5 font-bold">{content.title}</h6>
            <div className="text-gray-500 flex gap-2 mb-1.5">
                출발지역:
                <span>{content.departurePlaceName}</span>
            </div>
            <div className="text-gray-500 flex gap-2 mb-1.5">
                도착지역:
                <span>{content.arrivePlaceName}</span>
            </div>
            <div className="text-gray-500 gap-2 flex">
                <img style={{width: '24px'}} src={Time} alt='alt'></img>
                <span>{startDate}</span>
            </div>
        </PostWrapper>
    );
};

export default Post;