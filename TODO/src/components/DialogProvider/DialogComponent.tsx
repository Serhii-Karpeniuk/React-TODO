import { useContext } from "react";
import closeButton from "../../images/close-img.png";
import { DialogContext } from "./DialogProvider";
import "./DialogComponent.scss";

const DialogComponent = () => {
  const { dialogState, setDialogState } = useContext(DialogContext);

  return dialogState.open ? (
    <div className="dialog__overlay">
      <div className="dialog__container">
        <img
          src={closeButton}
          className="close__img"
          onClick={() => {
            setDialogState({ open: false, content: "" });
          }}
          alt="Close"
        />

        {dialogState.content}
      </div>
    </div>
  ) : null;
};

export default DialogComponent;
