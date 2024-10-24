import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Report from './pages/Report';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import NewReport from './pages/NewReport';
import NewUser from './pages/NewUser';
import NewPassword from './pages/NewPassword';
import UserlessReport from './pages/UserlessReport';

// provider
import { UserProvider, useUser } from './UserContext';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login/Login';
import NewAction from './pages/NewAction';
import Profile from './pages/Profile';
import NewConclusion from './pages/NewConclusion';
import Conclusion from './pages/Conclusion';
import ForgotPassword from './pages/ForgotPassword';
import Treinamentos from './pages/Treinamento/Treinamentos';
import { useEffect } from 'react';






const MainContainer = styled.div`
  display: flex;
  overflow-y: hidden;
  min-height: 100vh;
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

          {/* Rotas não privadas */}
          <Route path='/' element={ <Login/>  }></Route>
          <Route path='/newUser' element={
            <NewUser />
          } />
          <Route path='/forgotPassword' element={ <ForgotPassword/> }></Route>
          <Route path='/newPassword/:token' element={ <NewPassword/> }></Route>
          <Route path='/userlessReport' element={ <UserlessReport />}></Route>        
          {/* Rotas privadas */}
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

            <Route path='/Treinamento' element={
              <PrivateRoute>
                <Treinamentos />
              </PrivateRoute>
            } />
        </Routes>
      </Router>
      </MainContainer>
      </UserProvider>
  );
}

export default App;
