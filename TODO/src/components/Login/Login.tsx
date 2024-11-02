import LoginProps from "../../Interfaces/LoginProps";
import "./Login.scss";

const Login = ({ onLoginClick }: LoginProps) => {
  return (
    <>
      <img
        src="../src/images/user-icon.png"
        alt="User Icon"
        className="icon"
        onClick={onLoginClick}
      />
    </>
  );
};

export default Login;
