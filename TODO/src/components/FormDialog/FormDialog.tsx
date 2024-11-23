import { useState, Dispatch, SetStateAction, useContext } from "react";
import { UserInterface } from "../../App";
import { DialogContext } from "../DialogProvider/DialogProvider";
import "./FormDialog.scss";

interface FormDialogProps {
  setUser: Dispatch<SetStateAction<UserInterface>>;
}

const FormDialog = ({ setUser }: FormDialogProps) => {
  const { setDialogState } = useContext(DialogContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (firstName: string, lastName: string) => {
    setUser({ firstName, lastName });
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(firstName, lastName);
    setFirstName("");
    setLastName("");
    setDialogState({ open: false, content: "" });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex mb-5">
          <label
            className="text-black font-mono text-base  w-105 whitespace-nowrap"
            htmlFor="fname"
          >
            First Name:
          </label>
          <input
            type="text"
            id="fname"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="h-8 rounded-md py-3 px-0 border-2 border-slate-300 w-46 ml-1"
          />
        </div>
        <div className="flex mb-5">
          <label
            htmlFor="lname"
            className="text-black font-mono text-base  w-105 whitespace-nowrap"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lname"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="h-8 rounded-md py-3 px-0 border-2 border-slate-300 w-46 ml-2.5"
          />
        </div>
        <div className="flex">
          <button
            disabled={!firstName || !lastName}
            type="submit"
            className={`mt-2 p-2 bg-blue-500 bg-tahiti-800 text-white mx-auto w-1/2 rounded-md ${
              !firstName || !lastName ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormDialog;
