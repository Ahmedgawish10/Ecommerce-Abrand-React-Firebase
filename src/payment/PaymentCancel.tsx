import { Link, To, useNavigate } from "react-router-dom";
import { startTransition } from "react";

const Error = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className="notFound">
      <div className="bg-gradient-to-r from-purple-300 to-blue-200">
        <div className="w-[90%] m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="shadow overflow-hidden sm:rounded-lg pb-8 xs:w-[100%]">
            <div className="border-t border-gray-200 text-center pt-8 xs:px-2 px-12">
              <button
                onClick={() => handleNavigate("/")}
                className="bg-gradient-to-r px-5 py-2 from-purple-400  rounded-md mr-2"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate("/contact")}
                className="bg-gradient-to-r px-5 py-2 from-red-400 rounded-md"
              >
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
