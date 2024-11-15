// import { useState, useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../config/Firebase";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   price: number;
// }

// interface HeroSectionProps {
//   productId: string; // ID of the product to fetch
// }

// const HeroSection: React.FC<HeroSectionProps> = ({ productId }) => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         // Reference to the product document
//         const productRef = doc(db, "products", productId);

//         // Fetch the product document
//         const productSnap = await getDoc(productRef);

//         if (productSnap.exists()) {
//           // Set the product data
//           setProduct({ id: productSnap.id, ...productSnap.data() } as Product);
//         } else {
//           console.error("No such product!");
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="hero-section">
//       <div className="hero-content">
//         <h1>{product.name}</h1>
//         <p>{product.description}</p>
//         <button className="cta-button">Buy Now for ${product.price}</button>
//       </div>
//       <div className="hero-image">
//         <img src={product.imageUrl} alt={product.name} />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;




import React from "react";

interface ProductCardProps {
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
}

const ProductCard = ({ image, brand, name, price, originalPrice }:any) => {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src={image}
          alt={name}
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${price}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                ${originalPrice}
              </p>
            </del>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "Brand",
      name: "Product Name",
      price: 149,
      originalPrice: 199,
    },
    {
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "Brand",
      name: "Product Name",
      price: 149,
      originalPrice: 199,
    },
    {
      image:
        "https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      brand: "Brand",
      name: "Product Name",
      price: 149,
      originalPrice: 199,
    },
  ];

  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </section>
  );
};

export default ProductGrid;

