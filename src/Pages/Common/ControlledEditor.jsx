import React, { Component } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

//import { unemojify } from "node-emoji";

export default class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      changeStatus: false,
      editorState:
        this.props.value.trim() && this.props.value.trim() != "<p></p>"
          ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(this.props.value)
            )
          )
          : EditorState.createEmpty(),
    };
    this.props.onChange(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }
  componentWillReceiveProps(nextProps, props) {
    console.log(nextProps);
    if (nextProps !== this.props && !this.state.changeStatus)
      this.setState({
        editorState:
          nextProps.value.trim() && nextProps.value.trim() != "<p></p>"
            ? EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(nextProps.value)
              )
            )
            : EditorState.createEmpty(),
      })
  }
  // shouldComponentUpdate(nextProps, props) {
  //   return nextProps.value !== props.value
  // }
  onEditorStateChange = (editorState) => {
    const { onChange, value } = this.props;

    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //    );

    if (value !== newValue) {
      this.setState({ changeStatus: true });
      onChange(newValue);
    }

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}
