import React from 'react';
import { Link } from 'react-router-dom';

const BuyerPurchaseCoin = () => {
    const one = 100
    const two = 200
    const three = 300
    return (
        <div>
            <Link to={`/dashboard/buyerpaymentform/${one}`}>
            100 tk
            </Link>
            <Link to={`/dashboard/buyerpaymentform/${two}`}>
            200 tk
            </Link>
            <Link to={`/dashboard/buyerpaymentform/${three}`}>
            300 tk
            </Link>
        </div>
    );
};

export default BuyerPurchaseCoin;