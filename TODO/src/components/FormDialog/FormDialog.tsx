import { useContext, useState } from "react";
import { DialogProviderContext } from "../DialogProvider/DialogProvider";

const FormDialog = () => {
  const handleSubmitContext = useContext(DialogProviderContext);

  if (!handleSubmitContext) {
    throw new Error(
      "handleSubmitContext must be used within a DialogProviderContext"
    );
  }

  const { handleSubmit } = handleSubmitContext;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(firstName, lastName);
    setFirstName("");
    setLastName("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input_group">
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="input_group">
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDialog;
