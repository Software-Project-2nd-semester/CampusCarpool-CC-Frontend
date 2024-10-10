import { useState } from "react";

const MaximumPeople = () => {
    const [maximumPeople,setMaximumPeople] = useState<number>(5);

    const DecreaseMaximumPeoPle = () => {
        if(maximumPeople > 1){
            setMaximumPeople(prev=>prev-1);
        }
    }

    const IncreaseMaximumPeoPle = () => {
        if(maximumPeople < 10){
            setMaximumPeople(prev=>prev+1);
        }
    }

    return (
        <div>
            <button onClick={DecreaseMaximumPeoPle}>-</button>
                {maximumPeople}
            <button onClick={IncreaseMaximumPeoPle}>+</button>
        </div>
    );
};

export default MaximumPeople;