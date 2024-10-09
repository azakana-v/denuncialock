import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Report from './pages/Report';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import NewReport from './pages/NewReport';

// provider
import { UserProvider, useUser } from './UserContext';
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

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { logged } = useUser();
  if (!logged) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <UserProvider>
    <MainContainer>
      <Router>
        <Navbar />
        <Sidebar /> 
        <Routes>
          {/* <Route path='/' element={ <HomeUser /> }></Route> */}
          <Route path='/' element={ <Login/>  }></Route>
          
          <Route path='/home' element={
              <PrivateRoute>
                <HomeUser />
              </PrivateRoute>
            } />
          <Route path='/report/:reportId' 
          element={ 
          <PrivateRoute>
            <Report /> 
          </PrivateRoute>  
          }
          />
          <Route path='/report/:reportId/newAction/:agentId' 
          element={
          <PrivateRoute> 
            <NewAction /> 
          </PrivateRoute> } 
          />
          <Route path='/newReport' 
          element={ 
          <PrivateRoute>
            <NewReport/>
          </PrivateRoute>
          } 
          />
          <Route path='/newAction'
           element={
            <PrivateRoute>
              <NewAction />
            </PrivateRoute>
           } />
          <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          <Route path='/home/report/:reportId' 
          element={ 
          <PrivateRoute>
            <Report />
          </PrivateRoute> } />
          <Route path='/report/:reportId/action/:agentId' 
          element={
          <PrivateRoute> 
            <Report action/>
          </PrivateRoute> } />
          <Route path='/newReport' 
          element={
          <PrivateRoute> 
            <NewReport/> 
          </PrivateRoute> } 
          />
          <Route path='/report/:reportId/newConclusion' element={
              <PrivateRoute>
                <NewConclusion />
              </PrivateRoute>
            } />
             <Route path='/report/:reportId/conclusion/:conclusionId' element={
              <PrivateRoute>
                <Conclusion />
              </PrivateRoute>
            } />
        </Routes>
      </Router>
      </MainContainer>
      </UserProvider>
  );
}

export default App;
