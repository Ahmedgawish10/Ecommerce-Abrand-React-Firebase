import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { Product } from "../types/Shared";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import fetchProducts from "../store/products/action/FetchProducts";
import SingleWishlist from "./wishlists/SingleWishlist";
import { auth } from '../config/Firebase';
import { addToCart, removeFromCart } from '../store/carts/action/CartsActs';
import Pagination from "../components/common/paginate/Paginate";
import toast from "react-hot-toast";
import { addToOrders } from './../store/orders/UserOrdersSlice';
import { getProductImage } from "../utils/productImages";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { products, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);



  if (status === "loading") {
    return (
      <div className="products">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="rounded-lg flex justify-center" key={item}>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse">
                <div className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mt-4 px-5 pb-5">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-14"></div>
                    </div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (status === "failed") return <p>Error: {error}</p>;
  const itemsPerPage = 1;
  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };
  const handleAddToCart = (product: any) => {
    if (auth.currentUser?.uid) {
      dispatch(addToCart({ userId: auth.currentUser.uid, product }));
    } else {
      toast.error("Please log in first to add to the cart.");
    }
  }
  return (
    <div className="products" >
      {/* <Pagination pageCount={pageCount}  onPageChange={handlePageClick} currentPage={currentPage} /> */}
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:gap-8"  >
          {products.map((product: Product, index: number) => {
            const productImage = getProductImage(product, index);
            const currentProduct = { ...product, imageUrl: productImage };

            return (
              <div
                className={` rounded-lg flex justify-center`}
                key={product.id}
              >
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="relative flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <div className=" product-img cursor-pointer relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
                      <img
                        className="object-cover w-full"
                        src={productImage}
                        alt={product.name || "product image"}
                      />
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        39% OFF
                      </span>
                      <SingleWishlist productProps={currentProduct} />


                    </div>
                    <div className="mt-4 px-5 pb-5" >
                      <a href="#">
                        <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                      </a>
                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-3xl font-bold text-slate-900">{product.price}</span>
                          <span className="text-sm text-slate-900 line-through">  {Number(product.price) + 500}</span>
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
                          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                        </div>
                      </div>
                      <div
                        onClick={() => { handleAddToCart(currentProduct) }}

                        className="flex cursor-pointer items-center gap-3 justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        <ShoppingCartIcon />
                        Add to cart
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
      {/* <Wish2  /> */}
    </div>
  );
};

export default ProductList;
