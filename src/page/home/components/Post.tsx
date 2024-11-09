import React from 'react';
import styled from "styled-components";

const PostWrapper = styled.article`
    border:1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const OriginDiv = styled.div``;
const DestinationDiv = styled.div``;
const StartTime  = styled.div``;

const Post = ({content}:any) => {
    return (
        <PostWrapper>
            게시글 아이디: {content.id}
            <OriginDiv></OriginDiv>
            <DestinationDiv></DestinationDiv>
            <StartTime>{content.departureAt}</StartTime>
        </PostWrapper>
    );
};

export default Post;