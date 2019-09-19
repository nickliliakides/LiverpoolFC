import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileUrl: '',
    errorMessage: '',
    error: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileUrl: props.defaultImg
      });
    }
    return null;
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true });
  };

  handleUploadError = () => {
    this.setState({ isUploading: false });
  };

  handleUploadSuccess = filename => {
    this.setState({
      name: filename,
      isUploading: false
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(fileUrl => {
        this.setState({ fileUrl });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    // const imageRef = firebase
    //   .storage()
    //   .ref()
    //   .child(this.props.dir);
    // const fileRef = imageRef.child(this.state.name);

    // fileRef
    //   .delete()
    //   .then(() => {
    //     this.setState({
    //       errorMessage: 'File deleted succesfully'
    //     });

    //     setTimeout(() => {
    //       this.setState({ errorMessage: '' });
    //     }, 3000);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       error: true,
    //       errorMessage: 'Error while deleting from database'
    //     });

    //     setTimeout(() => {
    //       this.setState({ errorMessage: '' });
    //     }, 3000);
    //   });

    this.setState({
      name: '',
      isUploading: false,
      fileUrl: '',
      errrorMessage: '',
      error: false
    });

    this.props.resetImage();
  };

  getErrorMessageClasses = () => {
    let classes = '';
    classes += this.state.error ? 'red' : 'green';
    return classes;
  };

  render() {
    return (
      <div>
        <div>
          {!this.state.fileUrl && (
            <div style={{ marginBottom: '10px' }}>
              <div className="label_input">{this.props.tag}</div>
              <FileUploader
                accept="image/*"
                name="image"
                storageRef={firebase.storage().ref(this.props.dir)}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
              />
            </div>
          )}
          {this.state.isUploading && (
            <div
              className="progress"
              style={{ textAlign: 'center', margin: '30px 0' }}
            >
              <CircularProgress thickness={9} style={{ color: '#e31923' }} />
            </div>
          )}
          {this.state.fileUrl && (
            <div className="image_upload_container">
              <img
                style={{
                  width: '100%'
                }}
                src={this.state.fileUrl}
                alt={this.state.name}
              />
              <div className="remove" onClick={() => this.uploadAgain()}>
                Remove
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={this.getErrorMessageClasses()}>
            {this.state.errorMessage}
          </div>
        </div>
      </div>
    );
  }
}

export default Fileuploader;
