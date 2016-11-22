function buildGallery(images)
{
    return <div id="gallery" className="naive">
        {_.map(images, image => <img src={image.low_resolution.url}/>)}
    </div>
}