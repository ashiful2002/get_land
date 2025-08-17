import React from "react";
import FAQ from "../FAQ/FAQ";
import ContactUs from "../ContactUs/ContactUs";

const NewsLetter = () => {
  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row gap-5 my-12 px-4">
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default NewsLetter;
// /NewsLetter;
