import {useEffect,useState} from 'react'
import { initFlowbite } from 'flowbite'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme   } from '@mui/material/styles';
// import { Typography } from '@mui/material';
function Header() {

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    console.log(theme);
    
    useEffect(()=>{
        initFlowbite()
    },[])
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
      setIsActive(!isActive);
    };
  return (
    <header className='border-b-2 z-50 fixed top-[48px] w-[100%]'>
    <nav className={`${isDarkMode?"bg-[#ec8909]":"bg-white"} border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800`} mobile-menu-2="2" >
        <div className="flex flex-wrap justify-between items-center container mx-auto relative">
            <a href="https://flowbite.com" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Shein </span>
            </a>

            <div  className={`inactive-menu  md:flex justify-between items-center lg:flex lg:w-auto lg:order-1 
                ${isActive ? 'active-menu' : ''}`} id="mobile-menu-2">
                <ul className="flex flex-col md:flex-row   font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3  lg:p-0 " aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Company</a>
                    </li> 
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Company</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3  border-b md:border-b-0 border-gray-100 lg:border-0  lg:p-0">Company</a>
                    </li>
                </ul>
            </div>

            <div className="flex items-center lg:order-2">
                <a href="#" className="text-gray-800 dark:text-white hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                <a href="#" className="text-gray-800 dark:text-white hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Register</a>
                <button onClick={toggleMenu} data-collapse-toggle="mobile-menu-2" type="button" className=" md:hidden   md:bg-green-200 items-center  ml-1 text-sm text-gray-500  lg:hidden  focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    {isActive?<CloseIcon/>:<MenuIcon/>}
                </button>
            </div>
            
        </div>
    </nav>
</header>
  )
}

export default Header
