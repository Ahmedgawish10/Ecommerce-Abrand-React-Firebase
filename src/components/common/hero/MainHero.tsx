import { useTheme } from "@mui/material";
import { initFlowbite } from "flowbite";
import React, { useEffect } from "react";
import Hand from "../../../assets/hand.png"
import Watch from "../../../assets/watch.png"
import Shoes from "../../../assets/shoes.png"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export default function Test() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const carouselItems = [
    {
      id: 1,
      title: "Be on Time",
      subtitle: "Time",
      description:
        "Stay connected and stylish with the Apple Watch. Featuring seamless connectivity, advanced health tracking, and a sleek design, it’s the perfect blend of innovation and functionality.",
      buttonText: "Explore Now",
      imgSrc: Watch,
      alt:"t"
    },
    {
      id: 2,
      title: "Be on Time",
      subtitle: "Time",
      description:
        "Immerse yourself in the beauty of the Quran wherever you are. With advanced audio features and a sleek design, this device lets you hear the Quran effortlessly.",
      buttonText: "Explore Now",
      imgSrc: Hand,
      alt:"Hand"
    },
    {
      id: 3,
      title: "Be on Time",
      subtitle: "Time",
      description:
        "Stay ahead in style with Nike shoes. Combining cutting-edge design, exceptional comfort, and unmatched performance.",
      buttonText: "Explore Now",
      imgSrc: Shoes,
      alt:"Shoes"
    },
 
 
  ];

  return (
    <div>
      <div className="mx-auto container lg:px-4 mb-10 md:mb-0">
        <div
          id="default-carousel"
          className="relative rounded-lg overflow-hidden "
          data-carousel="static"
        >
          <div className="relative h-[100vh] sm:h-[650px] lg:h-[500px]" data-carousel-inner>
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className=" duration-700 ease-in-out flex items-center "
                data-carousel-item
              >
                {item.title ? (
                  <main
                    className={`dark:bg-gray-800 mt-[40px] ${
                      isDarkMode ? "bg-[#111827]" : "bg-white"
                    } relative overflow-hidden`}
                  >
                    <div className="dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
                      <div className="container px-4 md:px-5 lg:px-0 mx-auto flex flex-wrap flex-col sm:flex-row md:flex-nowrap relative">
                        <div className=" flex-1 sm:w-2/3 lg:w-2/5 flex flex-col justify-center relative z-20 order-2 sm:order-none pt-5 md:pt-0">
                          <span className="w-20 h-2 bg-[#ff03cc] dark:bg-white mb-12 rounded-md"></span>
                          <h1 className="font-bebas-neue uppercase text-4xl sm:text-8xl font-black flex flex-col leading-none dark:text-white">
                            {item.title}
                          </h1>
                          <p className="text-sm sm:text-base pt-3 dark:text-white">
                            {item.description}
                          </p>
                          <div className="flex mt-8">
                            <a
                              href="#products"
                              className="uppercase py-2 px-2 sm:px-4 rounded-lg bg-transparent border-2 border-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
                            >
                              {item.buttonText}
                            </a>
                          </div>
                        </div>
                        <div className=" flex-1 w-[100%] md:none lg:w-3/5 relative flex justify-center md:justify-end items-center">
                          <img
                            src={item.imgSrc}
                            className={` ${item.alt=="Hand"  ?"":"000 w-[60%] sm:w-[60%] md:w-[80%] lg:max-w-sm"} h-[280px] md:h-auto  `}
                          />
                        </div>
                      </div>
                    </div>
                  </main>
                ) : (
                  <img
                    src={item.imgSrc}
                    alt={item.alt || ""}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            className="flex absolute top-[50vh] left-0 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
            data-carousel-prev
          >
           <NavigateNextIcon className="trnasform rotate-180"/>
          </button>
          <button
            type="button"
            className="flex absolute top-[50vh] right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
            data-carousel-next
          >
            <NavigateNextIcon/>
          </button>
        </div>
      </div>
    </div>
  );
}
