const Image = React.createClass({

  render() {
    const prominentColor = Object.assign({}, {
      'background-color': this.props.image.prominentColor,
    });

    return (
      <div>
        <div className="color-quality image-layer">
          <img style={prominentColor}
          />
        </div>
        <div className="low-quality image-layer">
          <img src={this.props.image.low_resolution.url}
          />
        </div>
        {<div className="good-quality">
          <img
               src={this.props.image.standard_resolution.url}
          />
        </div>}
      </div>
    )
  }
});

const GalleryView = React.createClass({
  render() {
    const topSpace = {
      height: this.props.topSpace
    };

    const bottomSpace = {
      height: this.props.bottomSpace
    };


    return (
      <div id="gallery"
           className="fast">
        <div style={topSpace}></div>

        {_.map(this.props.images, image =>
          <Image image={image}
                 />
        )}

        <div style={bottomSpace}></div>

      </div>
    )
  }
});

const galleryComp = React.createClass({

  imageSize: function() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  },

  getInitialState: function () {
    return {
      imagesToLoad: this.getNeededImages(),
      topSpace: 0,
      bottomSpace: this.bottomSpaceCounter()
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
      imagesToLoad: this.getNeededImages()
    })
  },

  getNeededImages() {
    this.setState({
      topSpace: this.imagesScrolledPassed() * this.imageSize(),
      bottomSpace: this.bottomSpaceCounter()
    });

    return this.props.images.slice(this.imagesScrolledPassed(), this.imagesScrolledPassed() + 10);
  },

  bottomSpaceCounter() {
    return (this.props.images.length * this.imageSize()) - (this.imagesScrolledPassed() * this.imageSize());
  },

  imagesScrolledPassed() {
    const scrollTop = window.pageYOffset;
    return parseInt(scrollTop / (this.imageSize() * 1));
  },

  render() {
    return (
      <GalleryView images={this.state.imagesToLoad}
                   topSpace={this.state.topSpace}
                   bottomSpace={this.state.bottomSpace}
      />
    )
  }
});

