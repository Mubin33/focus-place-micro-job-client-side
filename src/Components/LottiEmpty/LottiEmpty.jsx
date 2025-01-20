import React from 'react';
import lotti from '../../../public/Animation - 1733915476092.json'
import Lottie from "lottie-react";

const LottiEmpty = ({title}) => {
    return (
        <div>
            <div className="flex justify-center items-center ">
              <div style={{ width: "400px", height: "400px" }}>
                <Lottie animationData={lotti}></Lottie>
              </div>
            </div>
              <h1 className="text-[2rem] text-center font-bold">Ohh.. here is no {title} </h1>
        </div>
    );
};

export default LottiEmpty;