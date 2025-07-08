import Navbar from "../../Shared/Header/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Shared/Footer/Footer";

const RootLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayouts;
