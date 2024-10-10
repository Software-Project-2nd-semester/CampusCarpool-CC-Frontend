import React from 'react';

interface MaximumPeopleProps {
    maximumPeople: number;
    setMaximumPeople: React.Dispatch<React.SetStateAction<number>>;
}

const MaximumPeople = ({ maximumPeople, setMaximumPeople }:MaximumPeopleProps) => {

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
        <div>
            <button onClick={DecreaseMaximumPeople}>-</button>
            {maximumPeople}
            <button onClick={IncreaseMaximumPeople}>+</button>
        </div>
    );
};

export default MaximumPeople;
