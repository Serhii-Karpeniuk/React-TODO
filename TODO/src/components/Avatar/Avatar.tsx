import { ChangeEvent, useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import { MessageContext } from "../MessageProvider/MessageProvider";
import MessageContextEnam from "../../Enums/MessageContextEnums";
import { DialogProviderContext } from "../DialogProvider/DialogProvider";
import "react-toastify/dist/ReactToastify.css";
import "./Avatar.scss";

const Avatar = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const context = useContext(DialogProviderContext);
  if (!context) {
    throw new Error(
      "DialogProviderContext must be used within a DialogProvider"
    );
  }
  const { submittedData } = context;
  const { firstName, lastName } = submittedData;
  const messageContext = useContext(MessageContext);

  if (!messageContext) {
    throw new Error("MessageContext must be used within a MessageProvider");
  }

  const { avatarMessage, setAvatarMessage, avatarMessageStyle } =
    messageContext;

  useEffect(() => {
    const avatarItem = localStorage.getItem("imageAvatar");

    if (avatarItem) {
      setImageUrl(JSON.parse(avatarItem));
    }
  }, []);

  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("imageAvatar", JSON.stringify(imageUrl));
    }
  }, [imageUrl]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const resetAvatarMessage = () => {
    setTimeout(() => setAvatarMessage(null), 5300);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileSize = file?.size;
      if (fileSize > 100000) {
        toast.error("File must be under 100KB");
        setAvatarMessage(MessageContextEnam.error);

        resetAvatarMessage();
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;

        if (typeof result === "string") {
          setImageUrl(result);
          toast.success("Avatar was added");
          setAvatarMessage(MessageContextEnam.success);

          resetAvatarMessage();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profile_container">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          className="file_input"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="container__avatar">
          <img className="avatar" src={imageUrl} alt="Your Avatar" />
          <a className="upload_button" onClick={handleUploadClick}>
            +
          </a>
        </div>
        <div className="fullName__container">
          {firstName} {lastName}
        </div>

        {avatarMessage && <div style={avatarMessageStyle}>{avatarMessage}</div>}
      </div>
    </>
  );
};

export default Avatar;
