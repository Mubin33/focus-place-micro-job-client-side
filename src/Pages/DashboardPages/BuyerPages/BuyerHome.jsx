import React from "react";
import BuyerApplyReview from "../../../Components/BuyerComponents/BuyerApplyReview";
import BuyerHomeStates from "../../../Components/BuyerComponents/BuyerHomeStates";

const BuyerHome = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center">
          for Buyer review her all werker Apply
        </h1>
        <div>
            <BuyerHomeStates/>
        </div>
        <div>
          <BuyerApplyReview />
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
