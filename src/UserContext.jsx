import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

const parseJwt = (token) => {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  }
  return "";
};

const getUserId = () => {
  const token = localStorage.getItem("token");

  const decodedToken = parseJwt(token);
  if (token) {
    console.log("token: ", decodedToken.id);
    return decodedToken.id;
  }
  return "";
};

const getUserInfo = () => {
  const token = localStorage.getItem("token");

  const decodedToken = parseJwt(token);
  if (token) {
    console.log("token: ", decodedToken.id);
    return decodedToken;
  }
  return "";
};

// criando o provider
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [agent, setAgent] = useState(true);
  const [userId, setUserId] = useState(getUserId());
  const [userInfo, setUserInfo] = useState(getUserInfo());

  console.log(getUserId());

  useEffect(() => {
    // Verifica se o usuário está logado (tem ID válido)
    if (userId) {
      setLogged(true);

      // Busca informações do usuário pela API
      const fetchUserData = async () => {
        try {
          const backendUrl = process.env.REACT_APP_BACKEND_URL;
          if (!backendUrl) {
            console.error("URL do backend não está definida");
            return;
          }

          const response = await axios.get(`${backendUrl}/usuarios/${userId}`);

          // Atualiza dados do usuário
          setUserData(response.data);

          // Verifica a role do usuário e atualiza os estados correspondentes
          if (response.data.role === "admin") {
            setAdmin(true);
            setAgent(false);
          } else if (response.data.role === "agent") {
            setAgent(true);
            setAdmin(false);
          } else {
            // Caso seja um usuário comum ou outra role
            setAdmin(false);
            setAgent(false);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };

      fetchUserData();
    } else {
      // Reset dos estados se não houver usuário logado
      setLogged(false);
      setAdmin(false);
      setAgent(false);
      setUserData(null);
    }
  }, [userId]); // Executa quando userId mudar

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        logged,
        setLogged,
        admin,
        setAdmin,
        userId,
        setUserId,
        userInfo,
        agent,
        setAgent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
