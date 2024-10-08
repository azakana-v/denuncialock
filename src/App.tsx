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
import InvestigateAction from './components/investigateAction';
import Action from './pages/Action';
import NewAction from './pages/NewAction';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import NewConclusion from './pages/NewConclusion';
import ConclusionDetails from './components/detailsConclusion';
import Conclusion from './pages/Conclusion';

const MainContainer = styled.div`
  display: flex;
  overflow-y: hidden;
`;

function App() {

 const mocado:any = ["", ""]

  return (
    <UserProvider>
    <MainContainer>
      <Router>
        <Navbar />
        <Sidebar /> 
        <Routes>
          <Route path='/' element={ <HomeUser /> }></Route>
          <Route path='/report/:reportId' element={ <Report /> }></Route>
          <Route path='/report/:reportId/newAction/:agentId' element={ <NewAction /> }></Route>
          <Route path='/newReport' element={ <NewReport/>  }></Route>
          <Route path='/newAction' element={ <Action/>  }></Route>
          <Route path='/Login' element={ <Login/>  }></Route>
          <Route path='/Profile' element={ <Profile/>  }></Route>
          <Route path='/' element={ <Login/>  }></Route>
          <Route path='/home' element={ <HomeUser /> }></Route>
          <Route path='/home/report/:reportId' element={ <Report /> }></Route>
          <Route path='/report/:reportId/action/:agentId' element={ <Report action/> }></Route>
          <Route path='/newReport' element={ <NewReport/>  }></Route>
          <Route path='/report/:reportId/newConclusion' element={ <NewConclusion/>  }></Route>
          <Route path='/report/:reportId/conclusion/:conclusionId' element={ <Conclusion/>  }></Route>
        </Routes>
      </Router>
      </MainContainer>
      </UserProvider>
  );
}

export default App;
