const GalleryView = React.createClass({
  render() {
    const topSpace = {
      height: this.props.topSpace
    };

    const bottomSpace = {
      height: this.props.bottomSpace
    };

    const imageSize = {
      height: this.props.imageSize +'px'
    };

    return (
      <div id="gallery"
           className="fast">
        <div style={topSpace}></div>

        {_.map(this.props.images, image =>
          <img style={imageSize}
               src={image.low_resolution.url}
          />
        )}

        <div style={bottomSpace}></div>

      </div>
    )
  }
});

const galleryComp = React.createClass({

  imageSize: 320,
  goodQualityBuffer: 10,

  getInitialState: function () {
    return {
      imagesToLoad: this.getGoodQualityPhotos(),
      topSpace: 0,
      bottomSpace: this.bottomSpaceCounter(0)
    };
  },

  //todo resize event
  componentDidMount: function () {
    window.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  handleScroll() {
    this.setState({
      imagesToLoad: this.getGoodQualityPhotos()
    })
  },

  getGoodQualityPhotos() {
    this.setState({
      topSpace: this.imagesScrolledPassed() * this.imageSize,
      bottomSpace: this.bottomSpaceCounter()
    });

    return this.props.images.slice(this.imagesScrolledPassed(), this.imagesScrolledPassed() + this.goodQualityBuffer);
  },

  bottomSpaceCounter(scrolledFromTop) {
    return (this.props.images.length * this.imageSize) - scrolledFromTop;
  },

  imagesScrolledPassed() {
    const scrollTop = window.pageYOffset;
    return Math.floor(scrollTop / this.imageSize);
  },

  render() {
    return (
      <GalleryView images={this.state.imagesToLoad}
                   topSpace={this.state.topSpace}
                   bottomSpace={this.state.bottomSpace}
                   imageSize={this.imageSize}
      />
    )
  }
});

