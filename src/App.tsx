import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Report from "./pages/Report";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import NewReport from "./pages/NewReport";
import NewUser from "./pages/NewUser";
import NewPassword from "./pages/NewPassword";
import UserlessReport from "./pages/UserlessReport";
import Success from "./pages/Success/Success";

// provider
import { UserProvider, useUser } from "./UserContext";
import HomeUser from "./pages/HomeUser";
import Login from "./pages/Login/Login";
import NewAction from "./pages/NewAction";
import Profile from "./pages/Profile";
import NewConclusion from "./pages/NewConclusion";
import Conclusion from "./pages/Conclusion";
import ForgotPassword from "./pages/ForgotPassword";
import Treinamentos from "./pages/Treinamento/Treinamentos";
import RelatorioPage from "./pages/RelatorioPage";
import AdminPage from "./pages/AdminPage";
import WarningImg from "./assets/icons/warning.png";
import TypesImg from "./assets/icons/types.png";
import AdminLayout from "./pages/AdminLayout";
import BarChartComponent from "./components/BarChart";
import PizzaChart from "./components/PizzaChart";
import Membros from "./pages/Membros";
import UserlessReportPage from "./pages/UserlessReportPage";
import ConclusionVerifica from "./pages/ConclusionVerifica";

const MainContainer = styled.div`
  display: flex;
  overflow-y: hidden;
  min-height: 100vh;
`;

const NavButton = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #5b0390;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const WarningIcon = styled.img`
  width: 75%;
  height: 75%;
  min-width: 75%;
  min-height: 75%;
`;

const TypesIcon = styled.img`
  width: 75%;
  height: 75%;
  min-width: 75%;
  min-height: 75%;
`;

const RelatorioNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  margin-top: 20vh;
  margin-right: 2rem;
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
        <Router basename="/">
          <Navbar />
          <Sidebar />
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/newPassword/:token" element={<NewPassword />} />
            <Route path="/userlessReport" element={<UserlessReport />} />
            <Route path="/success" element={<Success />} />

            {/* Rotas privadas */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomeUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/report/:reportId"
              element={
                <PrivateRoute>
                  <Report />
                </PrivateRoute>
              }
            />
            <Route
              path="/report/:reportId/newAction/:agentId"
              element={
                <PrivateRoute>
                  <NewAction />
                </PrivateRoute>
              }
            />
            <Route
              path="/newReport"
              element={
                <PrivateRoute>
                  <NewReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/newAction"
              element={
                <PrivateRoute>
                  <NewAction />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/home/report/:reportId"
              element={
                <PrivateRoute>
                  <Report />
                </PrivateRoute>
              }
            />
            <Route
              path="/report/:reportId/action/:agentId"
              element={
                <PrivateRoute>
                  <Report action />
                </PrivateRoute>
              }
            />
            <Route
              path="/report/:reportId/newConclusion"
              element={
                <PrivateRoute>
                  <NewConclusion />
                </PrivateRoute>
              }
            />
            <Route
              path="/report/:reportId/conclusion/:conclusionId"
              element={
                <PrivateRoute>
                  <Conclusion />
                </PrivateRoute>
              }
            />
            <Route
              path="/conclusion/:conclusionId/verifica"
              element={<ConclusionVerifica />}
            />
            <Route
              path="/Treinamento"
              element={
                <PrivateRoute>
                  <Treinamentos />
                </PrivateRoute>
              }
            />
            <Route
              path="/Membros"
              element={
                <PrivateRoute>
                  <Membros />
                </PrivateRoute>
              }
            />
            <Route
              path="/verificar/:reportId"
              element={<UserlessReportPage />}
            />
            <Route
              path="/AdminDashboard"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<></>} />
              <Route path="Relatorio" element={<RelatorioPage />} />
              <Route path="TiposDenuncia" element={<BarChartComponent />} />
              <Route path="RiscoDenuncia" element={<PizzaChart />} />
            </Route>

            {/* 🔁 Rota de fallback: redireciona 404 para /home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Router>
      </MainContainer>
    </UserProvider>
  );
}

export default App;
