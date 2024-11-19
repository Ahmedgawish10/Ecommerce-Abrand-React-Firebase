import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { removeFromWishlist, addToWishlist } from '../../store/wishLists/action/FetchProducts';
import { auth } from '../../config/Firebase';
import { useAppSelector } from "../../store/hooks";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import toast from 'react-hot-toast';
const WishlistItem = ({ productProps }: any) => {
    const { wishlist, status, error } = useAppSelector((state) => state.wishlist);
    const [toggleLove, setToggleLove] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const productExists = wishlist.some((productt) => productt.id === productProps.id);
        setToggleLove(productExists);
        console.log(productProps.id, wishlist);

    }, [wishlist, productProps.id]);

    const handleToggleWishlist = () => {
        const userId = auth?.currentUser?.uid;
        if (userId) {
            if (toggleLove) {
                dispatch(removeFromWishlist({ userId, product: productProps }));
                toast.error(`${productProps.name} removed from wishlist`)
            } else {
                dispatch(addToWishlist({ userId, product: productProps }));
                toast.success(`${productProps.name} added to wishlist`)

            }
            setToggleLove(!toggleLove);
        } else {
            console.error("User is not logged in");
        }
    };

    return (

        <div onClick={handleToggleWishlist} className={`love-prodcut absolute right-0 flex justify-center items-center w-[40px] h-[40px]  rounded-full  bg-[#0f172a] p-2 text-[#E74040]`}>
            {toggleLove ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>

    );
};

export default WishlistItem;
