import React, { useState } from 'react';
import Switch from 'react-switch';
import './CustomSwitch.styles.scss';

export function CustomSwitch(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  console.log(props.input);

  return (
    <div className="custom-switch">
      <Switch
        onChange={props.input.handleChange}
        checked={props.input.value}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#304ffe"
        {...props.input}
      />
    </div>
  );
}

export default CustomSwitch;
