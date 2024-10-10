import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = styled.button`
  margin-top: 1rem;
  border: none;
  background-color: #5B0390;
  font-size: 1.7rem;
  color: white;
  font-weight: semibold;
  border-radius: 0.5rem;
  width: 100%;
  height: 3rem;
  cursor: pointer;
  transition: all ease 150ms;

  &:hover{
    background-color: #B783D7;
  }
`

export const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/');
    }
  return (
    <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
  )
}
