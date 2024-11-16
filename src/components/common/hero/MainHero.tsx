import React from 'react'
import { useTheme } from '@mui/material/styles';

function MainHero() {
    const theme=useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <div>
            <main   className={`dark:bg-gray-800  ${isDarkMode ? "bg-[#111827]" : "bg-white"} relative overflow-hidden `}>
    <div className=" dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
        <div className="container  px-4 md:px-5 lg:px-0 mx-auto  flex flex-wrap md:flex-nowrap relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col justify-center  relative z-20 order-2 md:order-none pt-5 md:pt-0">
                <span className="w-20 h-2 bg-[#ff03cc] dark:bg-white mb-12 rounded-md">
                </span>
                <h1 className="font-bebas-neue uppercase text-4xl sm:text-8xl font-black flex flex-col leading-none dark:text-white ">
                    Be on
                    <span className="text-3xl sm:text-7xl">
                        Time
                    </span>
                </h1>
                <p className="text-sm sm:text-base pt-3 dark:text-white ">
                Stay connected and stylish with the Apple Watch. Featuring seamless connectivity, advanced health tracking, and a sleek design, it’s the perfect blend of innovation and functionality.</p>
                <div className="flex mt-8">
                    <a href="#products" className="uppercase py-2 px-2 sm:px-4 rounded-lg bg-transparent border-2 border-pink-500  dark:text-white hover:bg-pink-500 hover:text-white text-md">
                        Explore Now
                    </a>
                </div>
            </div>
            <div className="w-[100%] md:none  lg:w-3/5 relative flex justify-center  md:justify-end items-center">
                <img src="https://www.tailwind-kit.com/images/object/10.png" className="  w-[60%] sm:w-[60%]   md:w-[80%] lg:max-w-sm "/>
            </div>
        </div>
    </div>
</main>
    </div>
  )
}

export default MainHero
