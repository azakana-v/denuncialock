import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const UserContext = createContext();

// criando o provider
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [logged, setLogged] = useState(true);
    const [admin, setAdmin] = useState();
    const [userId, setUserId] = useState('66c4bb87a93ff03ddc53d5cd')
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
        <UserContext.Provider value={{ userData, setUserData, logged, setLogged, admin,  setAdmin, userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);