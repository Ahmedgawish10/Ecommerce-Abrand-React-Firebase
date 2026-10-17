import React, { useEffect } from 'react';
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { fetchUserWishlists } from "../store/wishLists/action/WishListsActs";
import { auth } from '../config/Firebase';
import { getProductImage } from '../utils/productImages';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist, status } = useAppSelector((state) => state.wishlists);

  useEffect(() => {
    const userId = auth?.currentUser?.uid;    
    if (userId) {      
      dispatch(fetchUserWishlists(userId)); 
    }
  }, [dispatch, auth?.currentUser?.uid]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No products in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product: any, index: number) => (
            <div key={product.id || index} className="border rounded-lg p-4 shadow bg-white">
              <img
                src={getProductImage(product, index)}
                alt={product.name || 'product image'}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-slate-900 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
