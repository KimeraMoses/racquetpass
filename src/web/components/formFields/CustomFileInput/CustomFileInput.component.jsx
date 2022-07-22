import { useState } from "react";
import "./CustomFileInput.styles.scss";

export const FileInput = (props) => {
  const [image, setImage] = useState("");

  const handleChange = async (e) => {
    const [file] = e.target.files;

    const racquetImage = await convertbase64Logo(file);
    if (props.change) {
      props.change(props?.name, racquetImage);
    }
    setImage(URL.createObjectURL(file));
  };

  const convertbase64Logo = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="file-input">
      <div className="file-input__header">
        <div className="file-input__header-label">{props.label}</div>
      </div>
      <label
        className="file-input__label"
        htmlFor="upload-photo"
        style={{
          background: `url(${
            props.background
              ? props.background
              : image
              ? image
              : "/img/configureRacquet/camera.png"
          }) no-repeat center`,
          backgroundSize: image ? "contain" : "auto",
        }}
      ></label>
      <input
        id="upload-photo"
        className="file-input__handle"
        type="file"
        onChange={handleChange}
        accept={props.accept}
      />
    </div>
  );
};
