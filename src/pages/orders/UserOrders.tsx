import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'
import { getAllOrders } from '../../store/orders/UserOrdersSlice'
import { auth } from '../../config/Firebase'
function UserOrders() {
  const {orders}=useAppSelector((state)=>state.order)
  const dispatch=useAppDispatch()
  useEffect(()=>{
    if (auth.currentUser) {
      let userId=auth?.currentUser?.uid;
      
      dispatch(getAllOrders({userId}))
    }
  },[dispatch,auth.currentUser])
  return (
    <div className="order-section">
    <div className="container mx-auto p-3">
      {orders.map((order, index) => (
        <div key={index} className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Order #{index + 1}
            </h1>
            <p className="text-base font-medium leading-6 text-gray-600">
              {new Date(order?.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                  Customer’s Cart
                </p>
                {order.orders.map((item: any, itemIndex:any) => (
                  <div key={itemIndex} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                        alt="product"
                      />
                      <img
                        className="w-full md:hidden"
                        src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                        alt="product"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                          Product #{itemIndex + 1}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Style: </span> Italic Minimal Design
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Size: </span> Small
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className="text-gray-300">Color: </span> Light Blue
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          $36.00 <span className="text-red-300 line-through">$45.00</span>
                        </p>
                        <p className="text-base xl:text-lg leading-6 text-gray-800">01</p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">$36.00</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base font-semibold leading-4 text-gray-600">${order.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default UserOrders
