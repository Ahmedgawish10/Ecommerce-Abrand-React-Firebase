import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    console.log(error);

    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    console.log("f");
    console.log(error);

    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }

  return (
    <div className="notFound">
      <div className="bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="w-[90%] m-auto  py-16 min-h-screen flex items-center justify-center">
          <div className=" shadow overflow-hidden sm:rounded-lg pb-8 xs:w-[100%]">
            <div className="border-t border-gray-200 text-center pt-8 xs:px-2  px-12">
              <h1 className="text-9xl xs:text-7xl font-bold text-purple-400">
                {errorStatus}
              </h1>
              <h1 className="text-6xl font-medium py-8 xs:text-3xl">
                <div className="capitalize pb-2">oops!</div>
                   {errorStatus==404?"Page":""}         {errorStatusText}
              </h1>
              <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6 xs:mr-2">
                <Link to="/" replace={true}>
                  Home
                </Link>
              </button>
              <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
