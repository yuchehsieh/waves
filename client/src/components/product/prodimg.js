import React, { Component } from 'react';

import ImageLightbox from '../utils/lightbox';

class ProdImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightbox: false,
      imagePos: 0,
      lightboxImages: []
    };
  }

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(item => lightboxImages.push(item.url));

      this.setState({ lightboxImages });
    }
  }

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  };

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLighbox(i)}
          className="thumb"
          style={{
            background: `url(${item}) no-repeat`
          }}
        />
      ) : null
    );

  handleLighbox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({ lightbox: true, imagePos: pos });
    }
  };

  handleLighboxClose = () => {
    this.setState({ lightbox: false });
  };

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLighbox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
        {this.state.lightbox ? (
          <ImageLightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.lightbox}
            pos={this.state.imagePos}
            onClose={() => this.handleLighboxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
