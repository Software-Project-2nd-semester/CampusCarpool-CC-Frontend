import { useState } from 'react';
import { Button, StyledH3 } from '../../../scss/styled/Common';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ReactComponent as Infomation } from '../../../assets/create/createForm/Infomation.svg'

const SelectButton = styled(Button) <{ isSelected: boolean }>`
    ${tw`w-1/3 text-base`}
    background-color: ${({ isSelected }) => (isSelected ? '#4C3EED' : '#D0D0D0')};
    color: ${({ isSelected }) => (isSelected ? 'white' : '#A7A7A7')};
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;

const Footer = styled.footer`
    ${tw`p-5`}
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;

    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width:430px;
    }
`;

const CreateForm = () => {
    const [sameSex, setSameSex] = useState<boolean>(true);
    const [socialCarpoolMode, setSocialCarpoolMode] = useState<boolean>(true);

    return (
        <div>
            <button>이전 버튼</button>
            <section>
                <StyledH3>출발시간</StyledH3>
                날짜, 시간을 선택해주세요(달력)
            </section>
            <section>
                <StyledH3>출발지 / 도착지</StyledH3>
                카카오 api
            </section>
            <section>
                <StyledH3>최대인원</StyledH3>
                <input type="number" placeholder="인원선택하는 부분" />
            </section>
            <section>
                <StyledH3>성별선택</StyledH3>
                <div className='flex gap-x-3'>
                    <SelectButton
                        onClick={() => { setSameSex(true); }}
                        isSelected={sameSex}>
                        성별무관
                    </SelectButton>
                    <SelectButton
                        onClick={() => { setSameSex(false); }}
                        isSelected={!sameSex}>
                        동성만
                    </SelectButton>
                </div>
            </section>
            <section>
                <StyledH3>소셜카풀 여부</StyledH3>
                <div className='flex gap-x-3'>
                    <SelectButton
                        onClick={() => { setSocialCarpoolMode(true); }}
                        isSelected={socialCarpoolMode}>
                        활발하게
                    </SelectButton>
                    <SelectButton
                        onClick={() => { setSocialCarpoolMode(false); }}
                        isSelected={!socialCarpoolMode}>
                        조용히
                    </SelectButton>
                </div>
                <div className='flex mt-2 items-center gap-x-1'>
                    <Infomation />
                    <i className='text-sm text-gray-400'>소셜카풀 : 운전자와 탑승자가 서로 가볍게 소통하며 가는 모드<br />조용히 : 운전자와 탑승자가 조용히 가는 모드</i>
                </div>
            </section>
            <section>
                <StyledH3>차량정보</StyledH3>
                <input type="text" placeholder="차량 정보를 입력해주세요" />
            </section>
            <section>
                <StyledH3>이동설명</StyledH3>
                <input type="text" placeholder="어떤 카풀인지 적어주세요" />
            </section>
            <Footer>
                <SubmitButton>등록</SubmitButton>
            </Footer>
        </div>
    );
};

export default CreateForm;
