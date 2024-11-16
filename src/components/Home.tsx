import { useState } from "react";
import Products from "../pages/Products"
import Test from "./Test";
import MainHero from "./common/hero/MainHero";
import { useTheme } from "@mui/material";

const Home = () => {
  const  [toggleMenu,setToggleMenu]= useState(true)
  const theme=useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return ( 
    <div className={`home !relative ${isDarkMode ? "bg-[#111827]" : "bg-white"} `} >
      <MainHero/>
       {/* <Test/> */}
      <div className={`homeContainer   container mx-auto px-3 pt-10   !overflow-auto `}>
        <div className="products">
        <h2 className="pb-6 text-2xl font-semibold" id="products">Explore Our Products</h2>
               <Products/>
        </div>

      </div>

    </div>
  );
};

export default Home;
