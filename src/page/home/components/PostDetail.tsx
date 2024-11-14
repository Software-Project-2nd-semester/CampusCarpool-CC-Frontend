import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import GetPostDetail from "../../../api/post/GetPostDetail";

const PostDetail = () => {
    const {id} = useParams();

    useEffect(() => {
        const GetPostDetailList = async () => {
            if (id) {
                try {
                    const result = await GetPostDetail(id);
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        GetPostDetailList();
    }, []);

    return (
        <div>
            {id}
        </div>
    );
};

export default PostDetail;