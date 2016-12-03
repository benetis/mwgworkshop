const GalleryView = React.createClass({
  render() {
    return (
      <div id="gallery"
           className="fast">
        {_.map(this.props.images, image =>
          <img src={image.low_resolution.url}/>)}
      </div>
    )
  }
});

const galleryComp = React.createClass({

  getInitialState: function () {
    return {
      imagesToLoad: this.takeFiveClosest()
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
      imagesToLoad: this.takeFiveClosest()
    })
  },

  takeFiveClosest() {
    return this.props.images.slice(0, 5);
  },

  render() {
    return (
      <GalleryView images={this.state.imagesToLoad}/>
    )
  }
});

