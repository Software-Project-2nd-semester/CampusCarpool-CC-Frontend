import { useState } from 'react';
import { Button, StyledH3, Footer } from '../../scss/styled/Common';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ReactComponent as Infomation } from '../../assets/create/createForm/Infomation.svg'
import { ReactComponent as RightArrow } from '../../assets/create/createForm/RightArrow.svg'
import { ReactComponent as Calendar } from '../../assets/create/createForm/Calendar.svg'
import MaximumPeople from './components/MaximumPeople';

const SelectButton = styled(Button) <{ $isSelected: boolean }>`
    ${tw`w-1/3 text-base`}
    background-color: ${({ $isSelected }) => ($isSelected ? '#4C3EED' : '#D0D0D0')};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : '#A7A7A7')};
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;

const TextArea = styled.textarea`
    width:100%;
`;

const CreateForm = () => {
    const location = useLocation();

    const [maximumPeople,setMaximumPeople] = useState<number>(5);
    const [sameSex, setSameSex] = useState<boolean>(true);
    const [socialCarpoolMode, setSocialCarpoolMode] = useState<boolean>(true);
    const [carInfo,setCarInfo] = useState<string>('');
    const [content,setContent] = useState<string>('');

    const category = location.state as string;

    return (
        <>
            <section className=''>
                <StyledH3>출발시간</StyledH3>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-x-3'>
                        <p className='text-base text-gray-400'>날짜, 시간을 선택해주세요.</p>
                        <Calendar/>
                    </div>
                    <RightArrow/>
                </div>
            </section>
            <section>
                <StyledH3>출발지 / 도착지</StyledH3>
                카카오 api
            </section>
            <section>
                <StyledH3>최대인원</StyledH3>
                <MaximumPeople maximumPeople={maximumPeople} setMaximumPeople={setMaximumPeople}/>
            </section>
            <section>
                <StyledH3>성별선택</StyledH3>
                <div className='flex gap-x-3'>
                    <SelectButton
                        onClick={() => { setSameSex(true); }}
                        $isSelected={sameSex}>
                        성별무관
                    </SelectButton>
                    <SelectButton
                        onClick={() => { setSameSex(false); }}
                        $isSelected={!sameSex}>
                        동성만
                    </SelectButton>
                </div>
            </section>
            <section>
                <StyledH3>소셜카풀 여부</StyledH3>
                <div className='flex gap-x-3'>
                    <SelectButton
                        onClick={() => { setSocialCarpoolMode(true); }}
                        $isSelected={socialCarpoolMode}>
                        활발하게
                    </SelectButton>
                    <SelectButton
                        onClick={() => { setSocialCarpoolMode(false); }}
                        $isSelected={!socialCarpoolMode}>
                        조용히
                    </SelectButton>
                </div>
                <div className='flex mt-2 items-center gap-x-1'>
                    <Infomation />
                    <i className='text-sm text-gray-400'>소셜카풀 : 서로 가볍게 소통하며 가는 모드<br />조용히 : 조용히 가는 모드</i>
                </div>
            </section>
            <section>
                <StyledH3>차량정보</StyledH3>
                <input type="text" value={carInfo} onChange={(e)=>{setCarInfo(e.target.value)}} placeholder="차량 정보를 입력해주세요" />
            </section>
            <section>
                <StyledH3>이동설명</StyledH3>
                <TextArea value={content} onChange={(e)=>{setContent(e.target.value)}}  rows={5}  placeholder="이동에 대한 설명을 적어주세요!자세히 올리면 사용자에게 도움이 됩니다!
                (예시 : 터미널에 1명 내리고 두정역으로 가요)" ></TextArea>
            </section>
            <Footer>
                <SubmitButton>등록</SubmitButton>
            </Footer>
        </>
    );
};

export default CreateForm;
