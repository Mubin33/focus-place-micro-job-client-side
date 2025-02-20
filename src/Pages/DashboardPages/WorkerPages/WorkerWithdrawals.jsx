import React, { useState, useEffect } from "react";
import Title from "../../../Components/Title/Title";
import useUserData from "./../../../Hooks/useUserData/useUserData";
import Loading from "./../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";




const WorkerWithdrawals = () => {
  const [changeAmount, setChangeAmount] = useState("");
  const [perfectAmount, setPerfectAmount] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [userData, isPending] = useUserData(); 

  // noti 1
  const {email, name,role,amount} = userData

  const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  
    const day = String(today.getDate()).padStart(2, '0');  
    const applyDate =  `${year}-${month}-${day}`; 


    // noti 2
  const currentDateTime = new Date(); 
  //console.log("Current Date and Time:", currentDateTime); 
  const formattedDateTime = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')} ${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;
  

  useEffect(() => {
    if (userData?.amount >= 200) {
      setPerfectAmount(false);
    }
  }, [userData?.amount]);

  if (isPending || !userData) return <Loading />;

  const handleForm = async (e) => {
    e.preventDefault();



    let form = e.target;
    const coin = parseFloat(form.coin.value);
    const dollar = parseFloat(form.dollar.value);
    const method = form.method.value;
    const number = parseFloat(form.number.value);

    if (!coin || coin <= 200 || !method || !number || coin > amount) {
      Swal.fire({
        icon: "error",
        title: "Opps..!",
        text: `Minimum Withdraw 200 coin ${amount}`,
      });
      return;
    }

    // noti 3
    const massage = `${role}: '${name}' send a Withdraw request, amount ${coin}coin `
    const notificationInfo = {
      fromRole:role,
      fromEmail:email, 
      toEmail:'adminEmail',
      toRole:'admin',
      massage,
      time:formattedDateTime,
      status:'pending',
      goToPage:'/dashboard/home'
    }

    const withdrawInfo = {
      coin,
      dollar,
      method,
      number,
      workerEmail: userData.email,
      workerAmount: userData.amount,
      status: "pending",
      currentDate:applyDate,
    };

    try {
      await axiosSecure.post("/withdraw", withdrawInfo);
      // noti 4
      await axiosSecure.post(`/notification`, notificationInfo);
      Swal.fire({
        icon: "success",
        title: "Your withdraw request is pending now",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div>
      <Helmet>
      <title>Withdraw || Focus-Place</title>
      </Helmet>
      <Title title={"Withdraw"} subtitle={"Coin to dollar"} />

      <form
        onSubmit={handleForm}
        className="max-w-lg mx-auto bg-base-300 shadow-lg rounded-lg p-6 space-y-6"
      >
        <div className="flex justify-center">
        <h1 className="text-2xl font-semibold my-2">You Have: {amount} Coin = {amount/20} $</h1>
        </div>
        {/* Coin Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Set Coin:
          </label>
          <input
            type="number"
            name="coin"
            className="block w-full p-2 border text-sm font-semibold rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none text-gray-800"
            onChange={(e) => setChangeAmount(Number(e.target.value) / 20)}
            placeholder="Enter amount"
          />
        </div>

        {/* Withdraw Amount */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Withdraw ($):
          </label>
          <input
            type="number"
            name="dollar"
            className="block w-full p-2 border text-sm font-semibold rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
            value={changeAmount}
            disabled
          />
        </div>

        {/* Method Selection */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Method:</p>
          <div className="flex justify-between">
            {["Bkash", "Nogod", "Rocket"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={method.toLowerCase()}
                  name="method"
                  className="text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span className="text-sm text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Account Number:
          </label>
          <input
            type="number"
            name="number"
            className="block w-full p-2 border text-sm font-semibold rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none text-gray-800"
            placeholder="Enter your account number"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={perfectAmount}
          className={`w-full py-2 text-white font-semibold rounded-md shadow-md focus:outline-none ${
            perfectAmount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {perfectAmount?"Insufficient coin (Minimum 200Coin)": 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default WorkerWithdrawals;
