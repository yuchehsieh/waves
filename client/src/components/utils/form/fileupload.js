import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFiles: [],
      uploading: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }

    return null;
  }

  onDrop = async files => {
    this.setState({ uploading: true });
    const formData = new FormData();
    formData.append('file', files[0]);

    const config = {
      headers: { 'content-type': 'mulitpart/form-data' }
    };

    const response = await axios.post(
      '/api/users/uploadimage',
      formData,
      config
    );
    this.setState(
      {
        uploading: false,
        uploadedFiles: [...this.state.uploadedFiles, response.data]
      },
      () => {
        this.props.imagesHandler(this.state.uploadedFiles);
      }
    );
  };

  onRemove = async id => {
    const request = await axios.get(`/api/users/removeimage?public_id=${id}`);
    const images = this.state.uploadedFiles.filter(
      item => item.public_id !== id
    );
    this.setState({ uploadedFiles: images }, () => {
      this.props.imagesHandler(images);
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{
            background: `url(${item.url}) no-repeat`
          }}
        />
      </div>
    ));

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={e => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px'
                }}
              >
                <CircularProgress thickness={7} style={{ color: '#00bcd4' }} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default Fileupload;
