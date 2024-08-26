import * as Styles from './styles';
// @ts-ignore
import logo from "../../assets/Logo.svg";
import { useUser } from '../../UserContext';


function Navbar(){
    const { logged, setLogged } = useUser();
    return(
        <>
        {logged ?          
        <Styles.NavContainer>
            <Styles.NavLogo src={logo} />
        </Styles.NavContainer>  : ""}
        
        </>
    )
}

export default Navbar;