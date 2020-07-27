import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { uploadImage } from "../../helpers/uploadImage";

const styles = {
  img: {
    width: "200px",
    height: "200px",
  },
};
class App extends Component {
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    uploadImage(this.props.url, acceptedFiles[0]);
  };

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          //accept="image/png, image/jpg"
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {<this.props.dropZone />}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default App;
