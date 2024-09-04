import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const UserContext = createContext();

const parseJwt = (token) => {
    if(token){
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(atob(base64));
    }
        return ""
  };

  const getUserId = ()=>{
    const token = localStorage.getItem('token')
    
    const decodedToken = parseJwt(token);
    if (token){
        console.log("token: ", decodedToken.id);
        return decodedToken.id
    }
    return ""
}

// criando o provider
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [logged, setLogged] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [agent, setAgent] = useState(true);
    const [userId, setUserId] = useState(getUserId())
    const fakeId = '1234';

console.log(getUserId());


    // useEffect(() => {
    //     console.log('Estou funcionando até aqui!')
    //     const fetchUserData = async () => {
    //         try{
    //             const response = await axios.get(`api/user/${fakeId}`);
    //             setUserData(response.data)
    //         }catch (error){
    //             console.error('Erro ao buscar por dados do usuário:', error)
    //         }
    //     };
        
    // fetchUserData();
    // }, [])

    return(
        <UserContext.Provider value={{ userData, setUserData, logged, setLogged, admin,  setAdmin, userId, setUserId, agent, setAgent}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);