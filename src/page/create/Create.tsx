import styled from 'styled-components';
import tw from 'twin.macro';
import CreateImg from '../../assets/create/CreateImg.png';
import Button from '../../scss/styled/Button';
import { ReactComponent as Driver } from '../../assets/create/Driver.svg'
import { ReactComponent as Passenger } from '../../assets/create/Passenger.svg'
import { ReactComponent as Taxi } from '../../assets/create/Taxi.svg'

const CreatePageWrapper = styled.div`
  ${tw`flex flex-col justify-evenly`}
  height:calc(100vh - 120px);
`;

const Create = () => {
  return (
    <CreatePageWrapper>
      <div>
        <h1 className='font-bold text-2xl text-center'>어떤 여정을 함께 할까요?</h1>
        <img src={CreateImg} alt="create-img" />
      </div>
      <section>
        <h2 className='font-bold text-lg'>카풀</h2>
        <div className='flex gap-x-6'>
          <Button><Driver />운전자</Button>
          <Button><Passenger />탑승자</Button>
        </div>
        <h2 className='font-bold text-lg mt-9'>택시팟</h2>
        <Button><Taxi />택시</Button>
      </section>
    </CreatePageWrapper>
  );
};

export default Create;