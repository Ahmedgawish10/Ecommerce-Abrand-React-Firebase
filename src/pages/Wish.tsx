import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchUserWishlists, removeFromWishlist } from "../store/wishLists/action/WishListsActs";
import { addToCart } from "../store/carts/action/CartsActs";
import { auth } from '../config/Firebase';
import { getProductImage } from '../utils/productImages';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { wishlist, status } = useAppSelector((state) => state.wishlists);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const userId = auth?.currentUser?.uid;
    if (userId) {
      dispatch(fetchUserWishlists(userId));
    }
  }, [dispatch, auth?.currentUser?.uid]);

  const handleRemoveFromWishlist = (product: any) => {
    const userId = auth?.currentUser?.uid;
    if (userId) {
      dispatch(removeFromWishlist({ userId, product }));
      toast.error(`${product.name} removed from wishlist`);
    }
  };

  const handleAddToCart = (product: any, index: number) => {
    const userId = auth?.currentUser?.uid;
    if (userId) {
      const productImage = getProductImage(product, index);
      dispatch(addToCart({ userId, product: { ...product, imageUrl: productImage } }));
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error("Please log in first to add to the cart.");
    }
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-10 min-h-[70vh]">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 animate-pulse">
              <div className="h-56 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-[75vh]">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700 mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} dark:text-white`}>
            My Wishlist
          </h1>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} dark:text-gray-300 mt-1`}>
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {wishlist.length > 0 && (
          <Link
            to="/"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Continue Shopping &rarr;
          </Link>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-500 mb-4">
            <FavoriteBorderIcon sx={{ fontSize: 40 }} />
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} dark:text-white mb-2`}>
            Your wishlist is empty
          </h2>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-500"} dark:text-gray-300 max-w-md mb-6`}>
            Explore our catalog and click the heart icon on items you love to save them for later!
          </p>
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-gray-800 text-white font-medium transition duration-200"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product: any, index: number) => {
            const productImage = getProductImage(product, index);

            return (
              <div
                key={product.id || index}
                className={`w-full ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-200`}
              >
                <div>
                  <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                    <img
                      className="object-cover w-full h-full"
                      src={productImage}
                      alt={product.name || 'product image'}
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-black/80 px-2.5 py-0.5 text-xs font-medium text-white">
                      39% OFF
                    </span>
                    <button
                      onClick={() => handleRemoveFromWishlist(product)}
                      title="Remove from wishlist"
                      className={`absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full ${isDarkMode ? "bg-gray-900/90 text-red-400 hover:bg-gray-900" : "bg-white/90 text-red-500 hover:bg-red-50"} transition shadow`}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                  </div>

                  <div className="mt-4 px-4 pb-2">
                    <h5 className={`text-lg font-semibold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"} dark:text-white line-clamp-1`}>
                      {product.name}
                    </h5>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} dark:text-white`}>
                        ${product.price}
                      </span>
                      {product.price && (
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-400"} dark:text-gray-400 line-through`}>

                          ${Number(product.price) + 500}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2">
                  <button
                    onClick={() => handleAddToCart(product, index)}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:hover:bg-blue-700 transition focus:outline-none"
                  >
                    <ShoppingCartIcon fontSize="small" />
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
