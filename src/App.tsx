import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reports from './pages/Reports';
import Report from './pages/Report';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

const MainContainer = styled.div`
display: flex;
overflow-y: hidden;
`;

function App() {
  return (
    <MainContainer>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={ <Reports /> }></Route>
          <Route path='/report' element={ <Report /> }></Route>
        </Routes>
      </Router>
      </MainContainer>
  );
}

export default App;
