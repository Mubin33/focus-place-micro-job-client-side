import React from 'react';

const BuyerPaymentCard = ({item, refetch}) => {
    const {payAmount,currentDateTime} = item




    let getCoin = ''
    if(payAmount === 1){
      getCoin = 10
    }else if(payAmount === 10){
      getCoin = 150
    }else if(payAmount === 20){
      getCoin = 500
    }else if(payAmount === 35){
      getCoin = 1000
    }




    return (
        <tr className="border-t-[1px] md:border-none ">
      <td className="text-xs">
         {currentDateTime}
      </td>
      <td className="text-xs">
        {payAmount} $
      </td>
      <td className="text-[10px] px-2 md:px-0  md:text-xs">
        {getCoin} coin
      </td>
    
    </tr>
    );
};

export default BuyerPaymentCard;