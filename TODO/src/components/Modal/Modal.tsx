import "./Modal.scss";
import closeButton from "../../images/close-img.png";
import { FormEvent } from "react";
import ModalProps from "../../Interfaces/ModalProps";

const Modal = ({
  isOpen,
  onClose,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  onSubmit,
}: ModalProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(firstName, lastName);
  };

  if (!isOpen) return null;

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={closeButton} onClick={onClose} className="close__img"></img>
        <form action="" id="form__modal" onSubmit={handleSubmit}>
          <div className="input_group">
            <label htmlFor="fname" className="firstName_title">
              First Name:{" "}
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input_group">
            <label htmlFor="lname" className="lastName_title">
              Last Name:{" "}
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="button__container">
            <button className="send__modal__button" type="submit">
              Надіслати
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default Modal;
