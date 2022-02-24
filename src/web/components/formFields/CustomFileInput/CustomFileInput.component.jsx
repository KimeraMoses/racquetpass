import './CustomFileInput.styles.scss';

export const FileInput = (props) => {
  const {
    input: { onChange, value },
  } = props;

  const handleChange = (e) => {
    onChange(e.target.files[0]);
  };
  return (
    <div className="file-input">
      <div className="file-input__header">
        <div className="file-input__header-label">{props.label}</div>
      </div>
      <label
        className="file-input__label"
        for="upload-photo"
        style={{
          background: `url(${
            props.background
              ? props.background
              : '/img/configureRacquet/camera.png'
          }) no-repeat center`,
        }}
      ></label>
      <input
        id="upload-photo"
        className="file-input__handle"
        type="file"
        value={value}
        onChange={handleChange}
        accept={props.accept}
      />
    </div>
  );
};
