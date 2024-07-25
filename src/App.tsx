import './App.css';
import styled from 'styled-components';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

const MainContainer = styled.div`
`;

function App() {
  return (
    <MainContainer>
        <Navbar />
        <Sidebar />
    </MainContainer>
  );
}

export default App;
