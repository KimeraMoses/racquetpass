import { useState } from "react";
import "./CustomFileInput.styles.scss";

export const FileInput = (props) => {
  const [image, setImage] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const handleChange = async (e) => {
    const [file] = e.target.files;

    const racquetImage = await convertbase64Logo(file);
    setHasImage(true);
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
  const handleCancel = () => {
    setImage("");
    if (props.change) {
      props.change(props?.name, "");
    }
    setHasImage(false);
  };

  return (
    <div className="file-input">
      <div className="file-input__header">
        <div className="file-input__header-label">{props.label}</div>
      </div>
      <div className="flex">
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
        {hasImage && (
          <div
            className="bg-[#e53935] ml-1 w-[24px] h-[24px] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleCancel}
          >
            <img src="/img/button/close.png" alt="" />
          </div>
        )}
      </div>
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
