import { Dispatch, SetStateAction, useContext } from "react";
import { DialogContext } from "../DialogProvider/DialogProvider";
import FormDialog from "../FormDialog/FormDialog";
import "./Login.scss";
import { UserInterface } from "../../App";

interface LoginProps {
  setUser: Dispatch<SetStateAction<UserInterface>>;
}

const Login = ({ setUser }: LoginProps) => {
  const { setDialogState } = useContext(DialogContext);
  return (
    <>
      <img
        src="../src/images/user-icon.png"
        alt="User Icon"
        className="icon"
        onClick={() =>
          setDialogState({
            open: true,
            content: <FormDialog setUser={setUser} />,
          })
        }
      />
    </>
  );
};

export default Login;
