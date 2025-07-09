import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const FeaturedCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  useEffect(() => {
    fetch("/featured_carouse.json")
      .then((res) => res.json())
      .then((data) => setCarouselData(data));
  }, []);

  return (
    <Carousel autoPlay={true} showArrows={true} >
      {carouselData.map((item) => (
        <div key={item.id}>
          {console.log(item)}
          <img src={item.image} />
          <p>{item.title}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default FeaturedCarousel;
