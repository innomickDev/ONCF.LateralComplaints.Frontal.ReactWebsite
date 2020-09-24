import React, { Fragment, Component } from "react";
import Select from "react-select";
import { Input, FormFeedback, FormText, CustomInput } from "reactstrap";

export default class RenderSelectMultiInput extends Component {
  onChange(event) {
    if (this.props.input.onChange && event != null) {
      this.props.input.onChange(event.value);
    } else {
      this.props.input.onChange(null);
    }
  }
  render() {
    const {
      input,
      meta: { touched, error, warning },
      options,
      name,
      id,
      ...custom
    } = this.props;
    return (
      <Fragment>
        <Select
          {...(touched ? { valid: error } : {})}
          {...input}
          {...custom}
          id={id}
          isMulti={custom.isMulti}
          name={name}
          options={options}
          // placeholder={custom.placeholder}
          defaultValue={custom.defaultValue}
          value={this.props.input.value || ""}
          onBlur={() => this.props.input.onBlur(this.props.input.value)}
          // onChange={this.onChange.bind(this)}
        />
        {error && <FormFeedback>{error}</FormFeedback>}
        {!error && warning && <FormText>{warning}</FormText>}
      </Fragment>
    );
  }
}
