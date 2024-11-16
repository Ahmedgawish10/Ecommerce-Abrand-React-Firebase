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
        <div className="products">
        <h2 className="pb-6 text-2xl font-semibold" id="products">Explore Our Products</h2>
               <Products/>
        </div>
       {/* <Test/> */}

      </div>
      <Footer/>
    </div>
  );
};

export default Home;
