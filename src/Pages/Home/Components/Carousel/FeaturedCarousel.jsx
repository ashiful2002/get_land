import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const FeaturedCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    fetch("/featured_carouse.json")
      .then((res) => res.json())
      .then((data) => setCarouselData(data));
  }, []);

  return (
    <div className="w-full  mx-auto px-4">
      <Carousel
        autoPlay
        showArrows
        showThumbs={true}
        showStatus={false}
        interval={5000}
        swipeable
        emulateTouch
        dynamicHeight={false}
      >
        {carouselData.map((item) => (
          <div
            key={item.id}
            className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-screen w-full overflow-hidden rounded"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
            {item.title && (
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm sm:text-base md:text-lg">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;
