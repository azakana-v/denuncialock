import './App.css';
import styled from 'styled-components';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Main from './components/main'

const MainContainer = styled.div`
display: flex;
`;

function App() {
  return (
    <MainContainer>
      <Navbar />
        <Sidebar />
        <Main />
    </MainContainer>
  );
}

export default App;
