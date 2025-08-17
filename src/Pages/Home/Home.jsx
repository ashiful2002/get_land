import React from "react";
import Review from "./Sections/Review/Review";
import Advertisement from "./Sections/Advertisement/Advertisement";
import Featured from "./Sections/Features/Featured";
import WhyChooseUs from "./Sections/WhyChooseUs/WhyChooseUs";
import Achievements from "./Sections/Achievements/Achievements";
import NewsLetter from "./Sections/NewsLetter/NewsLetter";
import RecentProducts from "./Sections/RecentProducts/RecentProducts";
import OurAgents from "./Sections/OurAgents/OurAgents";
import FAQ from "./Sections/FAQ/FAQ";

const Home = () => {
  return (
    <div>
      <Featured />

      <Advertisement />
      <OurAgents />
      <Achievements />
      <RecentProducts />
      <Review />
      <WhyChooseUs />
      <NewsLetter />
    </div>
  );
};

export default Home;
