import React from "react";
import BuyerApplyReview from "../../../Components/BuyerComponents/BuyerApplyReview";
import BuyerHomeStates from "../../../Components/BuyerComponents/BuyerHomeStates";

const BuyerHome = () => {
  return (
    <div>
      <div> 
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
