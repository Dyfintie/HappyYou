import React from "react";
import Navbar from "./components/NavbarComp/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./components/HeroComp/Hero";
const Home = () => {
  return (
    <div>
      {/* we will first create the navbar at the top from scratch
        navbar will contain the folllowing ->
         Login 
         Signup 
         Profiel of the user <=> they have signed in 
         about 
         Contact 
         some other features 
       */}
      <Navbar />
      {/* After the navbar here there will be the main body the cover or the hero  */}
      <Hero />
      {/* After the hero there will be a extended hero of info section  */}

      {/* Finally the footer section  */}
      <Footer />
    </div>
  );
};

export default Home;
