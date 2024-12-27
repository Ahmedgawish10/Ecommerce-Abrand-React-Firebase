import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAllOrders } from '../../store/orders/UserOrdersSlice'
import { auth } from '../../config/Firebase'
import { Link } from 'react-router-dom'
function UserOrders() {
  const { orders } = useAppSelector((state) => state.order)
  const dispatch = useAppDispatch()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (auth.currentUser) {
        let userId = auth?.currentUser?.uid;   
        orders.length==0&&(dispatch(getAllOrders({ userId })))
    }
  }, [dispatch, auth.currentUser])
  console.log(orders);
  
  return (
    <div className="order-section">
      <div className="myorders mt-[150px] flex justify-center"> 
        <p className=' text-2xl text-center w-[120px]  bg-blue-100 text-blue-800  font-medium me-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
        {(orders.length >= 2) ? `${orders.length} Orders` : `${orders.length} Order`}
      </p>
      </div>
      <div className="container mx-auto p-3">
        {orders?.map((order, index) => (
          <div key={index} className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
              <h1 className="text-3xl flex justify-between lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                <p> Order #{index + 1}</p>
              </h1>
              <p className="text-base font-medium leading-6 text-gray-600">
                {/* {new Date(order?.createdAt).toLocaleDateString()} at {new Date(order?.createdAt).toLocaleTimeString()} */}
              </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Order
                  </p>
                  {order?.orders?.map((item: any, itemIndex: any) => (
                    <div key={itemIndex} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          className="   xmd:w-[200px] md:block"
                          src={item.imageUrl}
                          alt="product"
                        />

                      </div>
                      <div className="border-b md:block border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item.name}
                          </h3>

                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6">
                            <span className="text-gray-800 ">price</span>
                          </p>
                          <p className="text-base xl:text-lg leading-6 text-gray-800">Quantity</p>
                          <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">Status</p>

                        </div>

                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6">
                            <span className="text-red-800 ">${item.price}</span>
                          </p>
                          <p className="text-base xl:text-lg leading-6 text-gray-800">{item.quantity}X</p>
                          <p className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Processing</p>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl font-semibold leading-5 text-gray-800 pb-4">Summary</h3>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base font-semibold leading-4 text-gray-600">${order.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length == 0 && (
          <div className='h-screen'>
            <p>You don't have any orders now. Go to shop.</p>
            <button className="mt-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6 xs:mr-2">
              <Link to="/" replace={true}>
                Home
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserOrders
