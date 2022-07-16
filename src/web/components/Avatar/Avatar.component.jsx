import { useState } from "react";
import "./Avatar.styles.scss";

const doesImageExist = (url) =>
  new Promise((resolve) => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });

export const Avatar = ({ img, height, width, name }) => {
  const [hasImage, setHasImage] = useState(false);

  doesImageExist(img).then((res) => setHasImage(res));

  const nameArray = name && name?.split(" ");
  let userName = "";
  if (name && nameArray) {
    userName =
      nameArray?.length > 1
        ? nameArray[0]?.charAt(0) + nameArray[1]?.charAt(0)
        : nameArray[0]?.charAt(0);
  }
  return (
    <div className="avatar" style={{ height, width }}>
      {!hasImage ? (
        <div className="avatar__name">
          <h1 className="avatar__name-value">{userName}</h1>
        </div>
      ) : (
        <img src={img} alt={userName} />
      )}
    </div>
  );
};
