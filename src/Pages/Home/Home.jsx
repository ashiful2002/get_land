import React from "react";
import Review from "./Sections/Review/Review";
import Advertisement from "./Sections/Advertisement/Advertisement";
import Featured from "./Sections/Features/Featured";
import WhyChooseUs from "./Sections/WhyChooseUs/WhyChooseUs";
import Achievements from "./Sections/Achievements/Achievements";

const Home = () => {
  return (
    <div>
      <Featured />

      <Advertisement />
      {/* <Achievements /> */}

      <WhyChooseUs />
      <Review />
    </div>
  );
};

export default Home;
