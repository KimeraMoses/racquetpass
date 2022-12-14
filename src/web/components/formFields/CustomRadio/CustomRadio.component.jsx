import { useState } from 'react';
import './CustomRadio.styles.scss';

export const CustomRadio = ({ name, options, label }) => {
  const [selected, setSelected] = useState(options[0].value);
  return (
    <div className="custom-radio__container">
      <div className="custom-radio__container-label">
        <h4 className="custom-radio__container-label-text">{label}</h4>
      </div>
      <div className="custom-radio__container-inner">
        {options.map((option) => (
          <div
            key={option.value}
            className={`custom-radio__container-inner-option ${
              selected === option.value
                ? 'custom-radio__container-inner-option-active'
                : ''
            }`}
            onClick={() => {
              if (option.value !== selected) {
                setSelected(option.value);
              } else {
                setSelected('');
              }
            }}
          >
            {option.label.map(({ title, text }) => (
              <>
                <div className="custom-radio__container-inner-option-active-title">
                  {title}
                </div>
                <div className="custom-radio__container-inner-option-txt">
                  {text}
                </div>
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
