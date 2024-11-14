import React, {useEffect, useState} from 'react';
import user from '../../store/userStore/user';
import axios from 'axios';
import styled from "styled-components";
import {StyledH3} from "../../scss/styled/Common";
import Post from "./components/Post";
import GetPost from "../../api/post/GetPost";
import {ReactComponent as Driver} from '../../assets/create/Driver.svg'
import {ReactComponent as Passenger} from '../../assets/create/Passenger.svg'
import {ReactComponent as Taxi} from '../../assets/create/Taxi.svg'

const HomePageWrapper = styled.div``;
const CategorySection = styled.section`
    display: flex;
    gap: 0.5rem;
`;
const CategoryButton = styled.button<{ $isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 25%;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;

    svg {
        width: 30%;
        height: auto;
    }
`;

const AllCategoryButton = styled(CategoryButton)`
    border: 1px solid black;
`;
const DriverCategoryButton = styled(CategoryButton)`
    background-color: ${({$isSelected}) => $isSelected ? "#4C3EED" : "#838CDF"};
`;
const PassengerCategoryButton = styled(CategoryButton)`
    background-color: ${({$isSelected}) => $isSelected ? "#01A543" : "#8FE5B2"};
`;
const TaxiCategoryButton = styled(CategoryButton)`
    background-color: ${({$isSelected}) => $isSelected ? "#E0CA00" : "#F1E89A"};
`;

const PostUl = styled.ul`
    margin-top: 1rem;
`;

const Home = () => {
    const {name, nickname, age, gender, intro, setName, setNickname, setAge, setGender, setIntro} = user();
    const [postList, setPostList] = useState<any[]>([]);
    const [postCategory, setPostCategory] = useState<string>('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const subValue = urlParams.get('sub');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/sub`, {
                    params: {
                        sub: sessionStorage.getItem('sub'),
                    }
                });
                console.log(response.data)
                setName(response.data.name)
                setNickname(response.data.nickname)
                setAge(response.data.age)
                setGender(response.data.sex)
                setIntro(response.data.intro)
            } catch (err) {
                console.log('error')
            }
        };

        if (subValue) {
            sessionStorage.setItem('sub', subValue);
        } else {
            console.log('sub 값이 존재하지 않습니다.');
        }

        if (name === '') {
            fetchData()
        }
    }, []);

    useEffect(() => {
        const GetPostList = async () => {
            try {
                const result = await GetPost(postCategory);
                setPostList(result);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        GetPostList();
    }, [postCategory]);

    return (
        <HomePageWrapper>
            <StyledH3>내 근처 이동</StyledH3>
            <CategorySection>
                <AllCategoryButton onClick={() => {
                    setPostCategory('')
                }} $isSelected={postCategory === ''}>
                    전체
                </AllCategoryButton>
                <DriverCategoryButton onClick={() => {
                    setPostCategory('CARPOOL_DRIVER')
                }} $isSelected={postCategory === 'CARPOOL_DRIVER'}><Driver/> 운전자</DriverCategoryButton>
                <PassengerCategoryButton onClick={() => {
                    setPostCategory('CARPOOL_USER')
                }} $isSelected={postCategory === 'CARPOOL_USER'}><Passenger/> 탑승자</PassengerCategoryButton>
                <TaxiCategoryButton onClick={() => {
                    setPostCategory('TAXI')
                }} $isSelected={postCategory === 'TAXI'}>
                    <Taxi/> 택시
                </TaxiCategoryButton>
            </CategorySection>
            <PostUl>
                {postList.map(content =>
                    <Post key={content.id} content={content}/>
                )}
            </PostUl>
        </HomePageWrapper>
    );
};

export default Home;