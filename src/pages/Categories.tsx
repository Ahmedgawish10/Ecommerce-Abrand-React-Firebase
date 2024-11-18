import React from "react";
import { Link } from "react-router-dom";
import O from "../assets/download (1).png"
import O1 from "../assets/red-and-white-bag (1).png"
import O3 from "../assets/bicycle-rider-and-bike (1).png"
import O4 from "../assets/yellow-crown-and-black-book (1).png"

const Highlight1 = () => {
    const categories = [
        {
            category: "Phones",
            title: "Electronics ",
            description: "Tech Innovator, Laptops Phones,Watches",
            image: O,
            link: "/categories?category=Phones"
        },
        {
            category: "Sports",
            title: "Sports ",
            description: "Active Lifestyle & Outdoor Adventures more",
            image: O3,
            link: "/categories?category=Sports"
        },
        {
            category: "Fashion",
            title: "Fashion ",
            description: "Stylish & Trendy Clothing & Accessories",
            image: O1,
            link: "/categories?category=Fashion"
        },
        {
            category: "Books",
            title: "Books ",
            description: "Explore New Worlds with Your Favorite Books",
            image: O4,
            link: "/categories?category=Books"
        }
    ];

    return (
        <section id="testimonies" className="py-12">
            <div className="container px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {categories.map((category, index) => (
                        <ul className="space-y-8" key={index}>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <div
                                        className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div>
                                    <Link to={category.link} className="cursor-pointer">
                                        <div className="relative p-10 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={category.image}
                                                    className="w-12 h-12 bg-center bg-cover border rounded-full"
                                                    alt={category.title}
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white pb-3">{category.title}</h3>
                                                    <p className="text-gray-500 text-md">{category.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlight1;
