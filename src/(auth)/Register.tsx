import { auth ,db} from "../config/Firebase";
import {createUserWithEmailAndPassword,signOut,updateProfile} from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, query, where, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { Link, useNavigate,Navigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from "react";
import FieldInput from "./FieldInput";
import {handleGoogleSignIn} from "../config/Firebase"

export default function Auth() {
  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    uid?: string; // Include any other fields you expect
    auth?: string; // Optional if you want to add this property later
  }
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerSpiner, setRegisterSpiner] = useState(false); 
    const [loading, setLoading] = useState(true);

    const [userAuth, setUserAuth] = useState(null);
    const [userData, setUserData] = useState<any>([]);
    const [isAuth, setIsAuth] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((firbaseUser: any) => {
          setUserAuth(firbaseUser);
          setRegisterSpiner(false);
          setLoading(false)
      });
      return () => unsubscribe();
  }, [userAuth]);


  const Register = async (e:any) => {
    e.preventDefault(); 
    if (email === "" || password === "" || userName === "" || confirmPassword === "") {
        toast.error("All fields are required");
        return;
      } 
    if (password !== confirmPassword) {
        toast.error("Password and confirmPassword do not match");
        return;
      }
    try {
          setRegisterSpiner(true)
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(auth.currentUser!, {
            displayName: `${userName} `
          });
          await addDoc(collection(db, "users"), {
           uid: userCredential.user.uid,
           userName,
            email,
            password,
            confirmPassword,
            auth22:"no",
            timeStamp:serverTimestamp()
          });
           navigate('/login', { replace: true });
          console.log("User registered:", userCredential.user.email);
    } catch (err) {
      toast.error("Email is already in use."); 

    } finally {
        setRegisterSpiner(false); 
      }
  };
  return (

<> 
{ auth.currentUser && localStorage.getItem("isAuthenticated")? <Navigate replace to="/" />:
loading?"...":<section className="">
<div className="lg:grid lg:min-h-creen lg:grid-cols-12">
  <section className=" hidden relative lg:flex items-end bg-gray-900 lg:col-span-5 h-[calc(100vh-112px)] xl:col-span-6">
    <img
      alt=""
      src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      className="absolute inset-0 h-full w-full object-cover opacity-80"
    />

    <div className="hidden lg:relative lg:block lg:p-12">
      <a className="block text-white" href="#">
        <svg
          className="h-8 sm:h-10"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        Welcome to ABrand 
      </h2>

      <p className="mt-4 leading-relaxed text-white/90">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
        quibusdam aperiam voluptatum.
      </p>
    </div>
  </section>

  <main className="flex items-center justify-center px-8 py-8 md:py-0 sm:px-12 lg:col-span-7 lg:px-16 lg:py-0 xl:col-span-6"
  >
    <div className="max-w-xl lg:max-w-3xl">
      <div className="hidden relative  lg:hidden ">
        <a
          className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
          href="#"
        >
          <span className="sr-only">Home 
          </span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <h1 className="mt-2 text-2xl font-bold  sm:text-3xl md:text-4xl">
        Welcome to Shein 
        </h1>

        <p className="mt-4 leading-relaxed pb-6 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
          quibusdam aperiam voluptatum.
        </p>
      </div>

      <form action="#" className=" grid grid-cols-6 gap-6" onSubmit={Register}>

        <div className="col-span-6 sm:col-span-3 md:mt-6">
        <FieldInput label="User Name" name="FirstName" type="text" value={userName}
         onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
        </div>

        <div className="col-span-6">
         <FieldInput label="Email" name="Email" type="email" value={email} 
         onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>

        <div className="col-span-6 sm:col-span-3">
        <FieldInput label="Password" name="Password" type="password" value={password} 
         onChange={(e) => setPassword(e.target.value)   } placeholder="Enter your password" />
        </div>

        <div className="col-span-6 sm:col-span-3">
         <FieldInput label="Confirm Password" name="ConfirmPassword" type="password" value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button type="submit" disabled={registerSpiner}
            className=" xs:!w-[97%] flex shrink-0 rounded-md border w-[150px]  justify-center border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
      {registerSpiner ? <div className="register-loader"></div>  :<div className="w-[100%]">Register</div>}
    </button>
    <div className="provider flex gap-4 xs:flex-col xs:gap-0 mt-2">
    <button type="button" onClick={handleGoogleSignIn} className="mt-3  xs:flex xs:justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
    <GoogleIcon className="me-2 !text-xl"/>
Sign in with Google
</button>
    <button type="button" className="mt-3 xs:flex xs:justify-center text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
<svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
<path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
</svg>
Sign in with Facebook
</button>
    </div>
  
            <p className="mt-4 text-sm  sm:mt-0">
                      <Link to="/login" className="block text-center mt-4 text-blue-600">
                      Already have an account? Login
                      </Link>
          </p>
        </div>
      </form>
    </div>
  </main>
</div>
</section>

    

}
</>

   


  );
};

