import React, { useState } from 'react';
import Switch from 'react-switch';
import './CustomSwitch.styles.scss';

export function CustomSwitch(props) {

  return (
    <div className="custom-switch">
      {props.input ? (
        <Switch
          onChange={props.input.handleChange}
          checked={props.input.value}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="#304ffe"
          {...props.input}
        />
      ) : (
        <Switch
          onChange={props.handleChange}
          checked={props.checked}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor="#304ffe"
          {...props.input}
        />
      )}
    </div>
  );
}

export default CustomSwitch;
