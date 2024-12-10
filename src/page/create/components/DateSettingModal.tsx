import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Button, StyledH3, Footer } from '../../../scss/styled/Common';
import {dateFormat} from "../../../components/dateFormat";

interface DateProps {
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setOpenDateSettingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDiv = styled.div`
    ${tw`bg-black/50 fixed w-screen h-screen top-0 left-0 z-20`};

    @media (min-width: 500px) {
        transform: translateX(-50%);
        left: 50%;
        width:430px;
    }
`;

const ModalContent = styled.div`
    ${tw`bg-white fixed w-full px-5`};
    bottom : 80px;
`;

const ModalFooter = styled(Footer)`
    ${tw`z-20`}
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;

const DateSettingModal = ({ setDate, setOpenDateSettingModal }: DateProps) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const SettingDate = () => {
        if (!selectedDate||!selectedTime){
            alert('날짜를 선택해주세요!');
            return;
        }

        const dateTimeString = `${selectedDate}T${selectedTime}:00`; // 시간 부분에 :00 추가
        const newDate = new Date(dateTimeString); // 입력된 시간은 로컬 시간대 기준으로 처리

        // 로컬 시간대에서 UTC로 변환
        const offset = new Date().getTimezoneOffset() * 60000;
        const utcDate = new Date(newDate.getTime() - offset);

        const formattedDate = utcDate.toISOString();
        setDate(formattedDate);
        setOpenDateSettingModal(false);
    };

    return (
        <ModalDiv onClick={() => { setOpenDateSettingModal(false); }}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <div>
                    <StyledH3>언제 출발하시나요?</StyledH3>
                    <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
                <div>
                    <StyledH3>출발 시간을 알려주세요</StyledH3>
                    <input type="time" onChange={(e) => setSelectedTime(e.target.value)} />
                </div>
                <ModalFooter>
                    <SubmitButton onClick={SettingDate}>확인</SubmitButton>
                </ModalFooter>
            </ModalContent>
        </ModalDiv>
    );
};

export default DateSettingModal;