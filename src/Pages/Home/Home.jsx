import React from "react";
import Review from "./Sections/Review/Review";
import Advertisement from "./Sections/Advertisement/Advertisement";
import Featured from "./Sections/Features/Featured";

const Home = () => {
  return (
    <div>
      <Featured />
      <Advertisement />
      <Review />
    </div>
  );
};

export default Home;
