import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../config/Firebase'; 
import { useLocation } from 'react-router-dom';

export default function SingleCategory() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const location= useLocation();
  const searchValue=location.search.split("=")[1].toLowerCase()

  const phonesSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const category = params.get('category');

      if (phonesSectionRef.current) {        
          phonesSectionRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
          });
      }
  }, [location]); 
     
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const productsRef = collection(db, 'products'); 

        const phonesQuery = query(productsRef, where('category', '==', searchValue));

        const querySnapshot = await getDocs(phonesQuery);
         const phonesList = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data(),
        }));
        setData(phonesList);
      } catch (error) {
        console.error('Error fetching phones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) {
    return <div id="f" className='h-[100vh]' ref={phonesSectionRef}>Loading...</div>;
  }

console.log(data);

  return (
    <div className='h-[100vh] ' >

    {data.length === 0 ? (
      <div className='text-center pt-[80px]'> category data empty.</div> 
    ) : (
      <ul>
        {data.map((phone: any) => (
          <li key={phone.id}>
            <h2>{phone.name}</h2>
            <p>{phone.description}</p>
            <p>Price: ${phone.price}</p>
            <img src={phone.imageUrl} alt={phone.name} style={{ width: '200px' }} />
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}