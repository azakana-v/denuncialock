import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const UserContext = createContext();

// criando o provider
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [logged, setLogged] = useState(true);
    const [admin, setAdmin] = useState(true);
    const fakeId = '1234';

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
        <UserContext.Provider value={{ userData, setUserData, logged, setLogged, admin,  setAdmin}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);