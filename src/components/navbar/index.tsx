import * as Styles from "./styles";
// @ts-ignore
import logo from "../../assets/Logo.svg";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logged, setLogged } = useUser();
  const navigate = useNavigate();
  return (
    <>
      {logged ? (
        <Styles.NavContainer>
          <Styles.NavLogo
            src={logo}
            onClick={() => {
              navigate("/home");
            }}
          />
        </Styles.NavContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
