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
      <div className="h-[70vh] flex justify-center items-center">
        <div role="status">
          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      </div>
    )
  };
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
          {products.map((product: Product) => (
            <div
              className={` rounded-lg flex justify-center`}
              key={product.id}
            >
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="relative flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <div className=" product-img cursor-pointer relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
                    <img
                      className="object-cover w-full"
                      src={product.imageUrl}
                      alt="product image"
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      39% OFF
                    </span>
                    <SingleWishlist productProps={product} />


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
                      onClick={() => { handleAddToCart(product) }}

                      className="flex cursor-pointer items-center gap-3 justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
      )}
      {/* <Wish2  /> */}
    </div>
  );
};

export default ProductList;
