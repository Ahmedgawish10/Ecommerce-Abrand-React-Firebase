// import { useState } from "react";

// const Home = () => {
//   const  [toggleMenu,setToggleMenu]= useState(true)
//   return (
//     <div className="home !relative">
//       <div className={`homeContainer   !overflow-auto `}>
     


// yyyyyyyyyyyyyyyy
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { collection, getDocs ,onSnapshot} from "firebase/firestore";
import { db, storage } from "../config/Firebase"; 
import { initFlowbite } from "flowbite";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);


  // useEffect(() => {
  //   // LISTEN (REALTIME)
  //   const getAllUsers = onSnapshot( collection(db, "products"), (snapShot) => {
  //       let usersList = [];
  //       snapShot.docs.forEach((doc) => {
  //         usersList.push({ id: doc.id, ...doc.data() });
  //       });
  //       setData(usersList);
  //       console.log(usersList);
  //       setLoading(false)
        
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   return()=>{
  //     getAllUsers()
  //   }
  // }, []);

  // if (loading) return <p>Loading products...</p>;
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite components
  }, []);
  return (
    <div>
      <h2>Products List</h2>
      {/* <ul>
        {data.map(product => (
          <li key={product.id}>
            {product && <img src={product.image} alt={product.name} style={{ width: "150px", height: "auto" }} />}
          </li>
        ))}
      </ul> */}

      








    </div>
  );
}

export default ProductsList;
