import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserLayout from '../../../hoc/userLayout';

class AddFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSuccess: false,
      formError: false,
      uploading: false,
      files: []
    };
  }

  onDrop(files) {
    this.setState({ uploading: true });
    const formData = new FormData();
    const config = {
      headers: { 'content-type': 'mulitpart/form-data' }
    };
    formData.append('file', files[0]);
  }

  render() {
    return (
      <UserLayout>
        <h1>Upload file</h1>
        <div>
          <Dropzone
            onDrop={e => this.onDrop(e)}
            multiple={false}
            className="dropzone_box"
          >
            <div className="wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </Dropzone>
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
          <div style={{ clear: 'both' }}>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div>
                <div className="error_label">Please check your data</div>
              </div>
            ) : null}
          </div>
          <div>uploads</div>
        </div>
      </UserLayout>
    );
  }
}

export default AddFile;
