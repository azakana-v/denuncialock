import * as Styles from './styles';
// @ts-ignore
import logo from "../../assets/Logo.svg";

function Navbar(){
    return(
        <Styles.NavContainer>
            <Styles.NavLogo src={logo} />
        </Styles.NavContainer>         
    )
}

export default Navbar;