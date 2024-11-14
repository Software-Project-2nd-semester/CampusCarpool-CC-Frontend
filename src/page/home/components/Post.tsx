import React from 'react';
import styled from "styled-components";
import {dateFormat} from "../../../components/dateFormat";

const PostWrapper = styled.article`
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const OriginDiv = styled.div``;
const DestinationDiv = styled.div``;
const StartTime = styled.div``;

const Post = ({content}: any) => {
    console.log(content)
    const startDate = dateFormat(content.departureAt);

    return (
        <PostWrapper>
            {content.title}
            <OriginDiv>출발: {content.departurePlaceName}</OriginDiv>
            <DestinationDiv>도착 : {content.arrivePlaceName}</DestinationDiv>
            <StartTime>{startDate}</StartTime>
        </PostWrapper>
    );
};

export default Post;