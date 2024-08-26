import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Report from './pages/Report';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import NewReport from './pages/NewReport';

// provider
import { UserProvider } from './UserContext';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login/Login';

const MainContainer = styled.div`
  display: flex;
  overflow-y: hidden;
`;

function App() {
  return (
    <UserProvider>
    <MainContainer>
      <Router>
        <Navbar />
        <Sidebar /> 
        <Routes>
          <Route path='/' element={ <HomeUser /> }></Route>
          <Route path='/report/:reportId' element={ <Report /> }></Route>
          <Route path='/newReport' element={ <NewReport/>  }></Route>
          <Route path='/Login' element={ <Login/>  }></Route>
        </Routes>
      </Router>
      </MainContainer>
      </UserProvider>
  );
}

export default App;
