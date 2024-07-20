import React from "react";
import PublicNavbar from "../../components/Navbars/PublicNav/PublicNavbar";
import PrivateNabar from "../../components/Navbars/ProtectNav/PrivateNavbar"

const Home = () => {
  return (
    <div>
      Home
      <PublicNavbar/>
      <PrivateNabar/>
    </div>
  );
};

export default Home;
