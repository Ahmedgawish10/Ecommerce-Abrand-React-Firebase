import React, { useEffect } from 'react';
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { fetchUserWishlists } from "../store/wishLists/action/WishListsActs";
import { RootState } from '../store';
import { auth } from '../config/Firebase';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist, status, error } = useAppSelector((state: RootState) => state.wishlists);

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    console.log(userId);
    
    if (userId) {
        dispatch(fetchUserWishlists(userId)); 
      
    }
  }, [dispatch]);
  
console.log(wishlist);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>My Wishlist</h1>
      <ul>
        {wishlist.map((product:any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
