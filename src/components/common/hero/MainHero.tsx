import { useTheme } from "@mui/material";
import { initFlowbite } from "flowbite";
import React, { useEffect } from "react";
import Hand from "../../../assets/hand.png"
import Watch from "../../../assets/watch.png"
import Shoes from "../../../assets/shoes.png"

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
      <div className="mx-auto">
        <div
          id="default-carousel"
          className="relative rounded-lg overflow-hidden "
          data-carousel="static"
        >
          <div className="relative h-[100vh]" data-carousel-inner>
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                {item.title ? (
                  <main
                    className={`dark:bg-gray-800 ${
                      isDarkMode ? "bg-[#111827]" : "bg-white"
                    } relative overflow-hidden`}
                  >
                    <div className="dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
                      <div className="container px-4 md:px-5 lg:px-0 mx-auto flex flex-wrap md:flex-nowrap relative py-16">
                        <div className=" flex-1 sm:w-2/3 lg:w-2/5 flex flex-col justify-center relative z-20 order-2 md:order-none pt-5 md:pt-0">
                          <span className="w-20 h-2 bg-[#ff03cc] dark:bg-white mb-12 rounded-md"></span>
                          <h1 className="font-bebas-neue uppercase text-4xl sm:text-8xl font-black flex flex-col leading-none dark:text-white">
                            {item.title}
                            <span className="text-3xl sm:text-7xl">
                              {item.subtitle}
                            </span>
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
                            className={` ${item.alt=="Hand"  ?"":"000 w-[60%] sm:w-[60%] md:w-[80%] lg:max-w-sm"}  `}
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

          {/* Indicators */}
          <div
            className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2"
            data-carousel-indicators
          >
            {carouselItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition"
              ></button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
            data-carousel-prev
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
            data-carousel-next
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
