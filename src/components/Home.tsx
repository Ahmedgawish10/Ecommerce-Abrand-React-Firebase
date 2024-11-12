import { useState } from "react";
import Products from "./Products"
const Home = () => {
  const  [toggleMenu,setToggleMenu]= useState(true)
  return (
    <div className="home !relative">
      <div className={`homeContainer  container mx-auto px-3 pt-10   !overflow-auto `}>
       <Products/>

      </div>
    </div>
  );
};

export default Home;
