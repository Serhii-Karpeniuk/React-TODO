import { useContext } from "react";
import { DialogProviderContext } from "../DialogProvider/DialogProvider";
import "./Login.scss";

const Login = () => {
  const { setModalOpen } = useContext(DialogProviderContext);
  return (
    <>
      <img
        src="../src/images/user-icon.png"
        alt="User Icon"
        className="icon"
        onClick={() => setModalOpen(true)}
      />
    </>
  );
};

export default Login;
