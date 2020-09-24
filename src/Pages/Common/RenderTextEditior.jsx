import React from "react";

import ControlledEditor from "./ControlledEditor";

const EditorFieldComponent = (props) => {
  const {
    placeholder,
    input: { onChange, value },
    disabled,
    id,
  } = props;
  // console.log(props);
  return (
    <ControlledEditor
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default EditorFieldComponent;
