import React from "react";
import { Link } from "react-router-dom";
import Title from "../../../Components/Title/Title";

const BuyerPurchaseCoin = () => {
  const one = 10;
  const two = 150;
  const three = 500;
  const four = 1000;
  return (
    <>
    <Title title={'Buy coin'} subtitle={'Dollar to coin'}/>
    <div className="px-5 sm:px-10 md:px-16 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  <Link to={`/dashboard/buyerpaymentform/${one}`}>
    <div className="border-2 border-black rounded-lg flex items-center justify-center h-28 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 transition-transform transform hover:scale-105 shadow-lg">
      <h1 className="text-white text-xl sm:text-2xl font-semibold">1 $ <span className="text-black text-sm">(10 coin)</span></h1>
    </div>
  </Link>
  <Link to={`/dashboard/buyerpaymentform/${two}`}>
    <div className="border-2 border-black rounded-lg flex items-center justify-center h-28 bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition-transform transform hover:scale-105 shadow-lg">
      <h1 className="text-white text-xl sm:text-2xl font-semibold">10 $ <span className="text-black text-sm">(150 coin)</span></h1>
    </div>
  </Link>
  <Link to={`/dashboard/buyerpaymentform/${three}`}>
    <div className="border-2 border-black rounded-lg flex items-center justify-center h-28 bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-400 transition-transform transform hover:scale-105 shadow-lg">
      <h1 className="text-white text-xl sm:text-2xl font-semibold">20 $ <span className="text-black text-sm">(500 coin)</span></h1>
    </div>
  </Link>
  <Link to={`/dashboard/buyerpaymentform/${four}`}>
    <div className="border-2 border-black rounded-lg flex items-center justify-center h-28 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-transform transform hover:scale-105 shadow-lg">
      <h1 className="text-white text-xl sm:text-2xl font-semibold">35 $ <span className="text-black text-sm">(1000 coin)</span></h1>
    </div>
  </Link>
</div>
    </>

  );
};

export default BuyerPurchaseCoin;
