import styled from 'styled-components';
import tw from 'twin.macro';
import CreateImg from '../../assets/create/CreateImg.png';
import { Button, StyledH3 } from '../../scss/styled/Common';
import { ReactComponent as Driver } from '../../assets/create/Driver.svg'
import { ReactComponent as Passenger } from '../../assets/create/Passenger.svg'
import { ReactComponent as Taxi } from '../../assets/create/Taxi.svg'
import { useNavigate } from 'react-router-dom';

const CreatePageWrapper = styled.div`
  ${tw`flex flex-col justify-evenly`}
  height:calc(100vh - 120px);
`;

const Create = () => {
  const navigate = useNavigate()

  const NavigateCreateForm = () => {
    navigate('/create/createForm');
  }

  return (
    <CreatePageWrapper>
      <div>
        <h1 className='font-bold text-2xl text-center'>어떤 여정을 함께 할까요?</h1>
        <img src={CreateImg} alt="create-img" />
      </div>
      <section>
        <StyledH3 className='font-bold text-lg'>카풀</StyledH3>
        <div className='flex gap-x-6'>
          <Button onClick={NavigateCreateForm}><Driver />운전자</Button>
          <Button onClick={NavigateCreateForm}><Passenger />탑승자</Button>
        </div>
        <StyledH3 className='font-bold text-lg mt-9'>택시팟</StyledH3>
        <Button onClick={NavigateCreateForm}><Taxi />택시</Button>
      </section>
    </CreatePageWrapper>
  );
};

export default Create;