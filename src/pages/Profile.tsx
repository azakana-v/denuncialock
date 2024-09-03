import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import profile from '../assets/icons/profile.svg';
import { useUser } from '../UserContext';


interface SwitchProps {
    isChecked: boolean;
  }

const MainContainer = styled.div`
display: flex;
width: 100%;
align-items: center;
justify-content: center;
`

const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
align-items : center;
`

const ProfileImg = styled.img`
    width: 150px;
`

const ProfileName = styled.span`
font-size: 2.6rem;
color: #5B0390;
border-bottom: 0.2rem solid #5B0390;
padding: 1rem;
`

const UserTypeSelectionContainer = styled.div`
width: 85%;
`


const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 1rem;
  width: 100%;
`;


const SwitchLabel = styled.label`
  font-size: 16px;
  color: #5B0390; 
  font-weight: bold;
`;

const SwitchButton = styled.div<SwitchProps>`
  position: absolute;
  top: 2.5px;
  left: ${({ isChecked }) => (isChecked ? '25px' : '2.5px')};
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.3s ease;
`;

const Switch = styled.div<SwitchProps>`
  position: relative;
  width: 50px;
  height: 25px;
  background-color: ${({ isChecked }) => (isChecked ? '#5B0390' : '#ccc')};
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Profile = () => {
    const { admin, agent, setAdmin, setAgent} = useUser();
    const [isChecked, setIsChecked] = useState<boolean[]>([admin, agent, admin || agent ? false : true]);

    const toggleSwitch = (id:number) => {
        // setIsChecked(!isChecked);
        let newArr = [];
        for (let index = 0; index < isChecked.length; index++) {
            const element = isChecked[index];
            if(id == index){
                newArr.push(true)
            }else{
                newArr.push(false)
            }
        }
        setIsChecked(newArr);
      };

      useEffect(() => {
        setAdmin(isChecked[0]);
        setAgent(isChecked[1]);

      }, [isChecked])
      

  return (
    <MainContainer>
        <ProfileContainer>
            <ProfileImg src={profile}></ProfileImg>
            <ProfileName>Nome do user</ProfileName>
            <UserTypeSelectionContainer>

            <SwitchContainer>
                <SwitchLabel>Admin</SwitchLabel>
                <Switch onClick={()=>toggleSwitch(0)} isChecked={isChecked[0]}>
                    <SwitchButton isChecked={isChecked[0]} />
                </Switch>
            </SwitchContainer>
            <SwitchContainer>
                <SwitchLabel>Agent</SwitchLabel>
                <Switch onClick={()=>toggleSwitch(1)} isChecked={isChecked[1]}>
                    <SwitchButton isChecked={isChecked[1]} />
                </Switch>
            </SwitchContainer>
            <SwitchContainer>
                <SwitchLabel>User</SwitchLabel>
                <Switch onClick={()=>toggleSwitch(2)} isChecked={isChecked[2]}>
                    <SwitchButton isChecked={isChecked[2]} />
                </Switch>
            </SwitchContainer>
            </UserTypeSelectionContainer>

        </ProfileContainer>
    </MainContainer>
  )
}

export default Profile