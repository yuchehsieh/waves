import React, { Component } from 'react';
import Lightbox from 'react-images';

class ImageLightbox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(item => images.push({ src: item }));
      return (state = {
        images
      });
    }
    return false;
  }

  closeLightbox = () => {
    this.props.onClose();
  };

  gotoPrevious = () => {
    this.setState({ currentImage: this.state.currentImage - 1 });
  };

  gotoNext = () => {
    this.setState({ currentImage: this.state.currentImage + 1 });
  };

  render() {
    return (
      <div>
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.state.images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

export default ImageLightbox;
