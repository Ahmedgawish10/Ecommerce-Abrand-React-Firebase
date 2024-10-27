import { auth, subscribeToAuthChanges } from "../../../config/Firebase";
import { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {logout} from "../../../config/Firebase"
import { useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import {  useNavigate } from 'react-router-dom';

// import { Typography } from '@mui/material';
function Header() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
        
 useEffect(() => {
    initFlowbite();

    const unsubscribe = auth.onAuthStateChanged((firbaseUser: any) => {
      setUser(firbaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleProfile = () => {
        setProfile(!profile);
    };
     
         
    return (
        <header className='main-header border-b-2 z-50 fixed top-[48px] w-[100%]'>
            <nav className={`${isDarkMode ? "bg-[#ec8909]" : "bg-white"} border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800`} mobile-menu-2="2" >
                <div className="flex flex-wrap justify-between items-center container mx-auto relative">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Shein </span>
                    </a>

                    <div className={`inactive-menu  md:flex justify-between items-center lg:flex lg:w-auto lg:order-1 
                ${isMenuOpen ? 'active-menu' : ''}`} id="mobile-menu-2">
                        <ul className="flex flex-col md:flex-row   font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3  lg:p-0 " aria-current="page">Home </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 md:pr-3 lg:mr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Company</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 md:pr-3 lg:mr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Categories</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 md:pr-3 lg:mr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Deals</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 md:pr-3 lg:mr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center lg:order-2">
                        {user ?
                            <>
                            <div className="cart flex gap-1 mr-2">
                                <SearchIcon className="cursor-pointer"/>
                                <FavoriteBorderIcon className="cursor-pointer"/>
                                <ShoppingCartIcon className="cursor-pointer"/>

                            </div>
                                <div className="relative cursor-pointer w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" id="avatarButton" onClick={toggleProfile}>
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                </div>
                                {profile && <><div className="z-10 absolute top-[50px] right-[20px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className="text-green-700 font-bold flex items-center gap-2">
                                   <span className=" w-3.5 h-3.5 bg-green-400 border-2 dark:border-gray-800 rounded-full"></span>
                                           <span>{auth?.currentUser?.displayName}</span>  
                                        </div>
                                        <div className="font-medium truncate">{auth?.currentUser?.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </div>
                                </div></>}
                            </>

                            :
                            (loading?"":  <><Link to="/register" className="button-64 mr-2 xs:!hidden"><span className="text ">Register </span></Link>
                                <Link to="/login" className="button-64"><span className="text">Login </span> </Link>
                            </>)
                          }



                        <button onClick={toggleMenu} data-collapse-toggle="mobile-menu-2" type="button" className=" ml-3 md:hidden   md:bg-green-200 items-center  text-sm text-gray-500  lg:hidden  focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            {isMenuOpen ? <CloseIcon className="!text-4xl" /> : <MenuIcon className="!text-4xl" />}
                        </button>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header
