import { useState } from 'react';
import { Button, StyledH3, Footer } from '../../scss/styled/Common';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ReactComponent as Infomation } from '../../assets/create/createForm/Infomation.svg'
import { ReactComponent as RightArrow } from '../../assets/create/createForm/RightArrow.svg'
import { ReactComponent as Calendar } from '../../assets/create/createForm/Calendar.svg'
import { ReactComponent as Destination } from '../../assets/create/createForm/Destination.svg'
import { ReactComponent as Origin } from '../../assets/create/createForm/Origin.svg'
import { ReactComponent as DirectionArrow } from '../../assets/create/createForm/DirectionArrow.svg'
import MaximumPeople from './components/MaximumPeople';
import LocationList from './components/LocationList';
import useKakaoMapStore from "../../store/kakaoMapStore";

const SelectButton = styled(Button) <{ $isSelected: boolean }>`
    ${tw`w-1/3 text-base`}
    background-color: ${({ $isSelected }) => ($isSelected ? '#4C3EED' : '#D0D0D0')};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : '#A7A7A7')};
`;

const InputButton = styled.button`
    ${tw`flex justify-between items-center w-full`}
`;

const SubmitButton = styled(Button)`
    ${tw`text-2xl`}
`;
const GrayBaseP = styled.p`
    ${tw`text-gray-400 text-base`}
`;

const TextArea = styled.textarea`
    width:100%;
`;

const MtSection = styled.section`
    ${tw`mt-8`};
    `;

const TaxiSection = styled(MtSection) <{ $isSelected: boolean }>`
    ${tw`flex justify-between`}
    color:${({ $isSelected }) => ($isSelected ? 'black' : '#A7A7A7')};
`;

const CreateForm = () => {
    const location = useLocation();

    const startEndPoint = useKakaoMapStore((state) => state.startEndPoint);
    const taxiCharge = useKakaoMapStore((state) => state.taxiCharge);
    const [maximumPeople, setMaximumPeople] = useState<number>(5);
    const [sameSex, setSameSex] = useState<boolean>(true);
    const [socialCarpoolMode, setSocialCarpoolMode] = useState<boolean>(true);
    const [carInfo, setCarInfo] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [openLocationList, setOpenLocationList] = useState<{ isOpen: boolean, type: string }>({
        isOpen: false,
        type: ''
    });

    const category = location.state as string;

    const OpenLocationList = (type: string) => {
        setOpenLocationList({
            isOpen: !openLocationList.isOpen,
            type: type
        });
    }

    return (
        <>
            {!openLocationList.isOpen ?
                <>
                    <section>
                        <StyledH3>출발시간</StyledH3>
                        <InputButton>
                            <div className='flex gap-x-3'>
                                <GrayBaseP>날짜, 시간을 선택해주세요.</GrayBaseP>
                                <Calendar />
                            </div>
                            <RightArrow />
                        </InputButton>
                    </section>

                    <MtSection>
                        <StyledH3>출발지 / 도착지</StyledH3>
                        <InputButton onClick={() => { OpenLocationList("origin") }}>
                            <div className='flex gap-x-3'>
                                <Origin color={startEndPoint.startPoint.address_name ? 'black' : '#A7A7A7'} />
                                {startEndPoint.startPoint.address_name ?
                                    <p className='text-base'>{startEndPoint.startPoint.address_name}</p>
                                    :
                                    <GrayBaseP>출발지를 입력해주세요.</GrayBaseP>
                                }
                            </div >
                            <RightArrow />
                        </InputButton >
                        <DirectionArrow className='my-3' color={startEndPoint.startPoint.address_name && startEndPoint.endPoint.address_name ? 'black' : '#A7A7A7'} />
                        <InputButton onClick={() => { OpenLocationList("destination") }}>
                            <div className='flex gap-x-3'>
                                <Destination color={startEndPoint.endPoint.address_name ? 'black' : '#A7A7A7'} />
                                {startEndPoint.endPoint.address_name ?
                                    <p className='text-base'>{startEndPoint.endPoint.address_name}</p>
                                    :
                                    <GrayBaseP>도착지를 입력해주세요.</GrayBaseP>
                                }
                            </div >
                            <RightArrow />
                        </InputButton >
                    </MtSection >

                    <MtSection>
                        <StyledH3>최대인원</StyledH3>
                        <MaximumPeople maximumPeople={maximumPeople} setMaximumPeople={setMaximumPeople} />
                    </MtSection>

                    <MtSection>
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
                    </MtSection>

                    <MtSection>
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
                    </MtSection>

                    {category === "driver" &&
                        <MtSection>
                            <StyledH3>차량 정보</StyledH3>
                            <input type="text" value={carInfo} onChange={(e) => { setCarInfo(e.target.value) }} placeholder="차량 정보를 입력해주세요" className='text-base' />
                        </MtSection >
                    }

                    <MtSection>
                        <StyledH3>이동 설명</StyledH3>
                        <TextArea value={content} onChange={(e) => { setContent(e.target.value) }} rows={3} placeholder="이동에 대한 설명을 적어주세요!자세히 올리면 사용자에게 도움이 됩니다!
                        (예시 : 터미널에 1명 내리고 두정역으로 가요)" className='text-base'></TextArea>
                    </MtSection >

                    {category === "taxi" &&
                        <>
                            <TaxiSection $isSelected={startEndPoint.startPoint.address_name && startEndPoint.endPoint.address_name}>
                                <StyledH3>택시 예상 요금</StyledH3>
                                <StyledH3>{taxiCharge}원</StyledH3>
                            </TaxiSection>
                            <TaxiSection $isSelected={startEndPoint.startPoint.address_name && startEndPoint.endPoint.address_name}>
                                <StyledH3>1인당 지불할 예상 금액</StyledH3>
                                <StyledH3>{~~(taxiCharge / maximumPeople)}원</StyledH3>
                            </TaxiSection>
                        </>
                    }

                    <Footer>
                        <SubmitButton onClick={() => console.log("등록")}>등록</SubmitButton>
                    </Footer>
                </>
                :
                <LocationList type={openLocationList.type} setOpenLocationList={setOpenLocationList} />
            }
        </>
    );
};

export default CreateForm;
