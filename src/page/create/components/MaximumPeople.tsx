import React from 'react';
import { ReactComponent as Minus } from '../../../assets/create/createForm/Minus.svg'
import { ReactComponent as Plus } from '../../../assets/create/createForm/Plus.svg'
import styled from 'styled-components';
import tw from 'twin.macro';

interface MaximumPeopleProps {
    maximumPeople: number;
    setMaximumPeople: React.Dispatch<React.SetStateAction<number>>;
}

const MaximumDiv = styled.div`
    ${tw`rounded-lg flex font-bold py-1 justify-around w-1/3`}
    background-color:#D0D0D0;
`;

const MaximumPeople = ({ maximumPeople, setMaximumPeople }: MaximumPeopleProps) => {

    const DecreaseMaximumPeople = () => {
        if (maximumPeople > 1) {
            setMaximumPeople(prev => prev - 1);
        }
    };

    const IncreaseMaximumPeople = () => {
        if (maximumPeople < 10) {
            setMaximumPeople(prev => prev + 1);
        }
    };

    return (
        <MaximumDiv>
            <button onClick={DecreaseMaximumPeople}>
                <Minus />
            </button>
            <div className='bg-white rounded-lg w-1/3 text-center'>
                {maximumPeople}
            </div>
            <button onClick={IncreaseMaximumPeople}>
                <Plus />
            </button>
        </MaximumDiv>
    );
};

export default MaximumPeople;
