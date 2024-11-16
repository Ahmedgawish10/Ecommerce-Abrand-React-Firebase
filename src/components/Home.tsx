import { useState } from "react";
import Products from "./Products"
import Test from "./Test";
import Footer from "./common/footer/Footer";
import MainHero from "./common/hero/MainHero";
const Home = () => {
  const  [toggleMenu,setToggleMenu]= useState(true)
  return (
    <div className="home !relative">
      <MainHero/>
      <div className={`homeContainer  container mx-auto px-3 pt-10   !overflow-auto `}>
       
       <Products/>
       {/* <Test/> */}

      </div>
      <Footer/>
    </div>
  );
};

export default Home;
