import React, { useEffect } from 'react';
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { fetchUserWishlists } from "../store/wishLists/action/WishListsActs";

import { RootState } from '../store/Store';
import { auth } from '../config/Firebase';

import { fetchUserCart } from '../store/carts/action/CartsActs';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist} = useAppSelector((state) => state.wishlists);
  const { cart,status } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const userId = auth?.currentUser?.uid;    
    if (userId) {      
        //dispatch(fetchUserWishlists(userId)); 
        dispatch(fetchUserCart(userId))
      
    }
  }, [dispatch,auth?.currentUser?.uid]);
  
console.log(cart);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1 onClick={()=>dispatch(fetchUserCart("5555555555555"))}>My Wishlist</h1>
      <ul>
        {cart.map((product:any,index) => (
          <li key={index}>{product.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
