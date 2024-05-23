import bannerImage from '../img/banner.jpg';

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} className='img-fluid' alt=""/>
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
}

export default Banner;