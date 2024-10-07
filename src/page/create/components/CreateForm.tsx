import { useState } from 'react';
import { Button, StyledH3 } from '../../../scss/styled/Common';
import styled from 'styled-components';
import tw from 'twin.macro';

const SelectButton = styled(Button) <{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? '#4C3EED' : '#D0D0D0')};
    color: ${({ isSelected }) => (isSelected ? 'white' : '#A7A7A7')};
`;

const CreateForm = () => {
    const [genderSelect, setGenderSelect] = useState<string>('no');
    const [socialSelect, setSocialSelect] = useState<string>('brisk');

    return (
        <div>
            <button>이전 버튼</button>
            <section>
                <StyledH3>출발시간</StyledH3>
                날짜, 시간을 선택해주세요(달력)
            </section>
            <section>
                <StyledH3>출발지/도착지</StyledH3>
                카카오 api
            </section>
            <section>
                <StyledH3>최대인원</StyledH3>
                <input type="number" placeholder="인원선택하는 부분" />
            </section>
            <section>
                <StyledH3>성별선택</StyledH3>
                <div className='flex'>
                    <SelectButton
                        onClick={() => { setGenderSelect('no'); }}
                        isSelected={genderSelect === 'no'}>
                        성별무관
                    </SelectButton>
                    <SelectButton
                        onClick={() => { setGenderSelect('same'); }}
                        isSelected={genderSelect === 'same'}>
                        동성만
                    </SelectButton>
                </div>
            </section>
            <section>
                <StyledH3>소셜카풀 여부</StyledH3>
                <div className='flex'>
                    <SelectButton
                        onClick={() => { setSocialSelect('brisk'); }}
                        isSelected={socialSelect === 'brisk'}>
                        활발하게
                    </SelectButton>
                    <SelectButton
                        onClick={() => { setSocialSelect('quiet'); }}
                        isSelected={socialSelect === 'quiet'}>
                        조용히
                    </SelectButton>
                </div>
                <i>소셜카풀 : 운전자와 탑승자가 서로 가볍게 소통하며 가는 모드
                    조용히 : 운전자와 탑승자가 조용히 가는 모드</i>
            </section>
            <section>
                <StyledH3>차량정보</StyledH3>
                <input type="text" placeholder="차량 정보를 입력해주세요" />
            </section>
            <section>
                <StyledH3>이동설명</StyledH3>
                <input type="text" placeholder="어떤 카풀인지 적어주세요" />
            </section>
            <Button>등록</Button>
        </div>
    );
};

export default CreateForm;
