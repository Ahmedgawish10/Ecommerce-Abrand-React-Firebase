import React, { useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../store/carts/action/CartsActs";
import { useAppDispatch } from "../../store/hooks";
import toast from "react-hot-toast";

export default function SingleCategory() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch=useAppDispatch()
  const searchCategory = location.search.split("=")[1].toLowerCase();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const getSingleCategory = async () => {
      try {
        const productsRef = collection(db, "products");
        const DocCat = query(productsRef, where("category", "==", searchCategory));
        const querySnapshot = await getDocs(DocCat);
        const docsSelected = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docsSelected);
      } catch (error) {
        console.error("Error fetching phones:", error);
      } finally {
        setLoading(false);
      }
    };
    getSingleCategory();
  }, []);

  if (loading) { 
      return <div  className="h-screen"></div>
  }
  const handleAddToCart=(product:any)=>{
    if (auth.currentUser?.uid) {          
       dispatch(addToCart({userId: auth.currentUser.uid, product}));
    } else {
      toast.error("Please log in first to add to the cart.");
            }
   }
  return (
    <div className="h-[100vh] ">
      {data.length === 0 ? (
        <div className="text-center pt-[80px] container mx-auto text-3xl  ">
          <p>No products for this category available at the moment.</p>
          <button className=" mt-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6 xs:mr-2">
            <Link to="/" replace={true}>
              Home
            </Link>
          </button>
        </div>
      ) : (
        <div className="cat container mx-auto">
          <div className="h2 text-3xl pt-12">Category: {searchCategory}</div>
          <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:gap-8">
            {data.map((product: any) => (
              <div
                className={` rounded-lg flex justify-center pt-[60px]`}
                key={product.id}
              >
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="relative flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a
                      className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                      href="#"
                    >
                      <img
                        className="object-cover w-full"
                        src={product.imageUrl}
                        alt="product image"
                      />
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        39% OFF
                      </span>
                    </a>
                    <div className="mt-4 px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl tracking-tight text-slate-900">
                          {product.name}
                        </h5>
                      </a>
                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-3xl font-bold text-slate-900">
                            {product.price}
                          </span>
                          <span className="text-sm text-slate-900 line-through">
                            {" "}
                            {Number(product.price) + 500}
                          </span>
                        </p>
                        <div className="flex items-center">
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                            5.0
                          </span>
                        </div>
                      </div>
                      <div
                      onClick={()=>handleAddToCart(product)}
                        className="flex items-center gap-3  cursor-pointer justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        <ShoppingCartIcon />
                        Add to cart
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
