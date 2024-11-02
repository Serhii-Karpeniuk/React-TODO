import { MouseEventHandler, Dispatch } from "react";

interface ModalProps {
  firstName: string;
  lastName: string;
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLImageElement>;
  setFirstName: Dispatch<React.SetStateAction<string>>;
  setLastName: Dispatch<React.SetStateAction<string>>;
  onSubmit: (fname: string, lname: string) => void;
}

export default ModalProps;
